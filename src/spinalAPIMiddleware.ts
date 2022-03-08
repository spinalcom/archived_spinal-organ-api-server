
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

class SpinalAPIMiddleware {
  static instance: SpinalAPIMiddleware = null;
  loadedPtr: Map<number, any>;
  conn: spinal.FileSystem;


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


  setConnection(connect: spinal.FileSystem) {
    this.conn = connect;
  }

  initGraph(graph?: SpinalGraph<any>,) {
    if (!graph) this.connectAndLoadGraph();
    else {
      try {
        this.onLoadSuccess(graph);
      } catch (error) {
        this.onLoadError();
      }
    }
  }

  connectAndLoadGraph() {
    const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
    // FileSystem._disp = true

    // initialize the connection
    this.conn = spinalCore.connect(connect_opt);
    // get the Model from the spinalhub, "onLoadSuccess" and "onLoadError" are 2
    // callback function.
    spinalCore.load(this.conn, config.file.path, this.onLoadSuccess, this.onLoadError);
  }

  onLoadError(): void {
    console.error(`File does not exist in location ${config.file.path}`);
  }

  // called if connected to the server and if the spinalhub sent us the Model
  onLoadSuccess(forgeFile: SpinalGraph<any>): void {
    SpinalGraphService.setGraph(forgeFile)
      .then((id) => {
        if (typeof id !== 'undefined') {
          SpinalServiceUser.init();
          spinalGraphUtils.init(SpinalAPIMiddleware.instance.conn);
        }
      })
      .catch(e => console.error(e));
  }

  getGraph(): SpinalGraph<any> {
    return SpinalGraphService.getGraph();
  }


  async load<T extends spinal.Model>(server_id: number): Promise<T> {
    if (!server_id) {
      return Promise.reject({ code: 406, message: "Invalid serverId" });
    }

    let node = FileSystem._objects[server_id];
    if (typeof node !== "undefined") {
      const found = await this._nodeIsBelongUserContext(<SpinalNode<any>>node);
      // @ts-ignore
      if (found) return Promise.resolve(node);
      return Promise.reject({ code: 401, message: "Unauthorized" });
    }


    return new Promise((resolve, reject) => {
      this.conn.load_ptr(server_id, async (model: T) => {
        if (!model) {
          // on error
          reject({ code: 404, message: "Node is not found" });
        } else {
          const contextFound = await this._nodeIsBelongUserContext(<any>model);
          // @ts-ignore
          if (contextFound) return resolve(node);
          return reject({ code: 401, message: "Unauthorized" });
        }
      });
    });
  }

  loadPtr<T extends spinal.Model>(ptr: spinal.File<T> | spinal.Ptr<T> | spinal.Pbr<T>): Promise<T> {
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


  private async _nodeIsBelongUserContext(node: SpinalNode<any>): Promise<boolean> {
    const type = node.getType().get();
    if (EXCLUDES_TYPES.indexOf(type) !== -1) return true;

    const contexts = await this._getUserContexts();
    const found = contexts.find(context => node.belongsToContext(context))
    return found ? true : false;
  }

  private _getUserContexts(): Promise<SpinalNode<any>[]> {
    const graph = this.getGraph();
    return graph.getChildren();
  }

}

export default SpinalAPIMiddleware


