
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
import { spinalGraphUtils } from "./socket/spinal/graphUtils";
// get the config
const { SpinalServiceUser } = require('spinal-service-user');
import * as config from '../config';

class SpinalAPIMiddleware {
  static instance: SpinalAPIMiddleware = null;
  loadedPtr: Map<number, any>;
  conn: spinal.FileSystem;

  // singleton class 
  static getInstance() {
    if (SpinalAPIMiddleware.instance === null) {
      SpinalAPIMiddleware.instance = new SpinalAPIMiddleware();
    }
    return SpinalAPIMiddleware.instance;
  }


  constructor() {
    this.loadedPtr = new Map();
  }

  initGraph(graph?: SpinalGraph<any>, connect?: spinal.FileSystem) {
    if (!connect || !graph) this.connectAndLoadGraph();
    else {
      try {
        this.conn = connect;
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
  onLoadSuccess(forgeFile): void {
    SpinalGraphService.setGraphFromForgeFile(forgeFile)
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


  load<T extends spinal.Model>(server_id: number): Promise<T> {
    if (!server_id) {
      return Promise.reject("Invalid serverId");
    }
    if (typeof FileSystem._objects[server_id] !== "undefined") {
      // @ts-ignore
      return Promise.resolve(FileSystem._objects[server_id]);
    }
    return new Promise((resolve, reject) => {
      this.conn.load_ptr(server_id,
        (model: T) => {
          if (!model) {
            // on error
            reject("loadptr failed...!");
          } else {
            // on success
            resolve(model);
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


}

export default SpinalAPIMiddleware


