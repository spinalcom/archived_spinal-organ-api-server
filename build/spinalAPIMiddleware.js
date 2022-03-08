"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const graphUtils_1 = require("./graphUtils");
// get the config
const { SpinalServiceUser } = require('spinal-service-user');
const config = require("../config");
const lib_1 = require("./lib");
class SpinalAPIMiddleware {
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
    setConnection(connect) {
        this.conn = connect;
    }
    initGraph(graph) {
        if (!graph)
            this.connectAndLoadGraph();
        else {
            try {
                this.onLoadSuccess(graph);
            }
            catch (error) {
                this.onLoadError();
            }
        }
    }
    connectAndLoadGraph() {
        const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
        // FileSystem._disp = true
        // initialize the connection
        this.conn = spinal_core_connectorjs_type_1.spinalCore.connect(connect_opt);
        // get the Model from the spinalhub, "onLoadSuccess" and "onLoadError" are 2
        // callback function.
        spinal_core_connectorjs_type_1.spinalCore.load(this.conn, config.file.path, this.onLoadSuccess, this.onLoadError);
    }
    onLoadError() {
        console.error(`File does not exist in location ${config.file.path}`);
    }
    // called if connected to the server and if the spinalhub sent us the Model
    onLoadSuccess(forgeFile) {
        spinal_env_viewer_graph_service_1.SpinalGraphService.setGraph(forgeFile)
            .then((id) => {
            if (typeof id !== 'undefined') {
                SpinalServiceUser.init();
                graphUtils_1.spinalGraphUtils.init(SpinalAPIMiddleware.instance.conn);
            }
        })
            .catch(e => console.error(e));
    }
    getGraph() {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getGraph();
    }
    load(server_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server_id) {
                return Promise.reject({ code: 406, message: "Invalid serverId" });
            }
            let node = spinal_core_connectorjs_type_1.FileSystem._objects[server_id];
            if (typeof node !== "undefined") {
                const found = yield this._nodeIsBelongUserContext(node);
                // @ts-ignore
                if (found)
                    return Promise.resolve(node);
                return Promise.reject({ code: 401, message: "Unauthorized" });
            }
            return new Promise((resolve, reject) => {
                this.conn.load_ptr(server_id, (model) => __awaiter(this, void 0, void 0, function* () {
                    if (!model) {
                        // on error
                        reject({ code: 404, message: "Node is not found" });
                    }
                    else {
                        const contextFound = yield this._nodeIsBelongUserContext(model);
                        // @ts-ignore
                        if (contextFound)
                            return resolve(node);
                        return reject({ code: 401, message: "Unauthorized" });
                    }
                }));
            });
        });
    }
    loadPtr(ptr) {
        if (ptr instanceof spinal_core_connectorjs_type_1.spinalCore._def['File'])
            return this.loadPtr(ptr._ptr);
        const server_id = ptr.data.value;
        if (this.loadedPtr.has(server_id)) {
            return this.loadedPtr.get(server_id);
        }
        const prom = new Promise((resolve, reject) => {
            try {
                this.conn.load_ptr(server_id, (model) => {
                    if (!model) {
                        reject(new Error(`LoadedPtr Error server_id: '${server_id}'`));
                    }
                    else {
                        resolve(model);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
        this.loadedPtr.set(server_id, prom);
        return prom;
    }
    _nodeIsBelongUserContext(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = node.getType().get();
            if (lib_1.EXCLUDES_TYPES.indexOf(type) !== -1)
                return true;
            const contexts = yield this._getUserContexts();
            const found = contexts.find(context => node.belongsToContext(context));
            return found ? true : false;
        });
    }
    _getUserContexts() {
        const graph = this.getGraph();
        return graph.getChildren();
    }
}
SpinalAPIMiddleware.instance = null;
exports.default = SpinalAPIMiddleware;
//# sourceMappingURL=spinalAPIMiddleware.js.map