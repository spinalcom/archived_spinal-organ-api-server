
/*
 * Copyright 2020 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import { spinalCore, FileSystem } from 'spinal-core-connectorjs_type';
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-model-graph';
import { spinalGraphUtils } from "./graphUtils";
// get the config
const { SpinalServiceUser } = require('spinal-service-user');
import * as config from '../config';
import { EXCLUDES_TYPES } from './lib';
import { File as SpinalFile } from "spinal-core-connectorjs_type";

class SpinalAPIMiddleware {
  static instance: SpinalAPIMiddleware = null;
  loadedPtr: Map<number, any>;
  conn: spinal.FileSystem;
  profilesToGraph: Map<string, SpinalGraph<any>> = new Map();
  principaleGraphId: string;


  constructor() {
    this.loadedPtr = new Map();
  }

  // singleton class 
  static getInstance() {
    if (SpinalAPIMiddleware.instance === null) {
      SpinalAPIMiddleware.instance = new SpinalAPIMiddleware();
    }
    return SpinalAPIMiddleware.instance;
  }

  public initGraph(digitalTwinPath?: string, connect?: spinal.FileSystem) {
    digitalTwinPath = digitalTwinPath || config.file.path;
    if (connect) this.conn = connect;
    if (!this.conn) {
      const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
      this.conn = spinalCore.connect(connect_opt);
    }

    spinalCore.load(this.conn, digitalTwinPath, this.onLoadSuccess, this.onLoadError);
  }


  public setConnection(connect: spinal.FileSystem) {
    this.conn = connect;
  }

  public getGraph(profileId?: string): SpinalGraph<any> {
    if (profileId) return this.profilesToGraph.get(profileId);
    return SpinalGraphService.getGraph();
  }

  public async load<T extends spinal.Model>(server_id: number, profileId?: string): Promise<T> {
    if (!server_id) {
      return Promise.reject({ code: 406, message: "Invalid serverId" });
    }



    profileId = profileId || this.principaleGraphId;

    let node = FileSystem._objects[server_id];
    if (typeof node !== "undefined") {
      if (node instanceof SpinalFile) return <any>node;
      const found = await this._nodeIsBelongUserContext(<SpinalNode<any>>node, profileId);

      if (found) {
        // @ts-ignore
        SpinalGraphService._addNode(node);
        // @ts-ignore
        return Promise.resolve(node);
      }
      return Promise.reject({ code: 401, message: "Unauthorized" });
    }

    return this.loadwithConnect(server_id, profileId);

  }

  public loadPtr<T extends spinal.Model>(ptr: spinal.File<T> | spinal.Ptr<T> | spinal.Pbr<T>): Promise<T> {
    if (ptr instanceof spinalCore._def['File']) return this.loadPtr(ptr._ptr);
    const server_id = ptr.data.value;

    if (this.loadedPtr.has(server_id)) {
      return this.loadedPtr.get(server_id);
    }

    const prom: Promise<T> = new Promise((resolve, reject) => {
      try {
        this.conn.load_ptr(
          server_id,
          (model: T) => {
            if (!model) { reject(new Error(`LoadedPtr Error server_id: '${server_id}'`)); }
            else { resolve(model); }
          });

      } catch (e) {
        reject(e);
      }
    });
    this.loadedPtr.set(server_id, prom);
    return prom;
  }

  public loadwithConnect<T extends spinal.Model>(server_id: number, profileId?: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.conn.load_ptr(server_id, async (model: T) => {
        if (!model) {
          // on error
          reject({ code: 404, message: "Node is not found" });
        } else {
          if (model instanceof SpinalFile) return resolve(model);

          const contextFound = await this._nodeIsBelongUserContext(<any>model, profileId);
          if (contextFound) {
            // @ts-ignore
            SpinalGraphService._addNode(model);
            // @ts-ignore
            return resolve(model);
          }
          return reject({ code: 401, message: "Unauthorized" });
        }
      });
    });
  }


  public async getNodeWithStaticId(nodeId: string, contextId: string, profileId?: string): Promise<SpinalNode<any>> {

    let context;
    if (!isNaN(<any>contextId)) context = this.load(<any>contextId, profileId);
    else {
      const graph = this.getGraph(profileId);
      context = await this._getContext(graph, contextId);

      if (!context) throw new Error(`no context found for ${contextId}`);
      let exist = await this._nodeIsBelongUserContext(context, profileId);
      if (!exist) throw new Error(`Unauthorized`);
    }

    if (nodeId === contextId) return context;

    if (context instanceof SpinalContext) {
      for await (const node of context.visitChildrenInContext(context)) {
        if (node.getId().get() === nodeId) {
          // @ts-ignore
          SpinalGraphService._addNode(node);
          return node;
        }
      }
    }
  }


  public addProfileToMap(profileId: string, graph: SpinalGraph<any>): void {
    //@ts-ignore
    SpinalGraphService._addNode(graph);
    this.profilesToGraph.set(profileId, graph);
  }

  public setPrincipaleGraph(graph: SpinalGraph<any>) {
    this.principaleGraphId = graph.getId().get();
    this.addProfileToMap(this.principaleGraphId, graph);
  }


  //////////////////////////////////////////////////////////////
  //                        PRIVATE                           //
  //////////////////////////////////////////////////////////////


  private async _nodeIsBelongUserContext(node: SpinalNode<any>, profileId: string): Promise<boolean> {
    const type = node.getType().get();
    if (EXCLUDES_TYPES.indexOf(type) !== -1) return true;

    const contexts = await this._getProfileContexts(profileId);

    const found = contexts.find(context => {
      if (node instanceof SpinalContext) return node.getId().get() === context.getId().get();
      return node.belongsToContext(context)
    })
    return found ? true : false;
  }

  private async _getProfileContexts(profileId?: string): Promise<SpinalNode<any>[]> {
    profileId = profileId || this.principaleGraphId;

    const graph = this.getGraph(profileId);
    if (!graph) throw new Error("no graph found");

    const contexts = await graph.getChildren(["hasContext"]);
    //addContext to SpinalNode map
    return contexts.map(context => {
      //@ts-ignore
      SpinalGraphService._addNode(context);
      return context;
    });

  }

  private async _getContext(graph: SpinalGraph<any>, contextId: string) {
    const context = SpinalGraphService.getRealNode(contextId);
    if (context) return context;
    const contexts = await graph.getChildren(["hasContext"]);

    return contexts.find(context => {
      //@ts-ignore
      SpinalGraphService._addNode(context);
      return context.getId().get() == contextId;
    })

    // for await (const context of graph.visitChildren([])) {
    //   if (context.getId().get() == contextId) {
    //     //@ts-ignore
    //     SpinalGraphService._addNode(context);
    //     return context;
    //   }
    // }
  }

  private onLoadError(): void {
    console.error(`File does not exist in location ${config.file.path}`);
  }

  private onLoadSuccess(forgeFile: SpinalGraph<any>): void {
    // if (config.runLocalServer == "true" || config.runLocalServer === true) {
    SpinalGraphService.setGraph(forgeFile)
      .then((id) => {
        if (typeof id !== 'undefined') {
          SpinalServiceUser.init();
          spinalGraphUtils.init(SpinalAPIMiddleware.instance.conn);
          SpinalAPIMiddleware.instance.setPrincipaleGraph(forgeFile);
        }
      })
      .catch(e => console.error(e));
    // }

  }





  // connectAndLoadGraph() {
  //   const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
  //   // FileSystem._disp = true

  //   // initialize the connection
  //   this.conn = spinalCore.connect(connect_opt);
  //   // get the Model from the spinalhub, "onLoadSuccess" and "onLoadError" are 2
  //   // callback function.
  //   spinalCore.load(this.conn, config.file.path, this.onLoadSuccess, this.onLoadError);
  // }

}

export default SpinalAPIMiddleware


export const spinalAPIMiddlewareInstance = SpinalAPIMiddleware.getInstance();