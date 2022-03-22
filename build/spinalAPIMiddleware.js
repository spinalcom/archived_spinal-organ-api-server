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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinalAPIMiddlewareInstance = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinal_model_graph_1 = require("spinal-model-graph");
const graphUtils_1 = require("./graphUtils");
// get the config
const { SpinalServiceUser } = require('spinal-service-user');
const config = require("../config");
const lib_1 = require("./lib");
const spinal_core_connectorjs_type_2 = require("spinal-core-connectorjs_type");
class SpinalAPIMiddleware {
    constructor() {
        this.profilesToGraph = new Map();
        this.loadedPtr = new Map();
    }
    // singleton class 
    static getInstance() {
        if (SpinalAPIMiddleware.instance === null) {
            SpinalAPIMiddleware.instance = new SpinalAPIMiddleware();
        }
        return SpinalAPIMiddleware.instance;
    }
    initGraph(digitalTwinPath, connect) {
        digitalTwinPath = digitalTwinPath || config.file.path;
        if (connect)
            this.conn = connect;
        if (!this.conn) {
            const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
            this.conn = spinal_core_connectorjs_type_1.spinalCore.connect(connect_opt);
        }
        spinal_core_connectorjs_type_1.spinalCore.load(this.conn, digitalTwinPath, this.onLoadSuccess, this.onLoadError);
    }
    setConnection(connect) {
        this.conn = connect;
    }
    getGraph(profileId) {
        if (profileId)
            return this.profilesToGraph.get(profileId);
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getGraph();
    }
    load(server_id, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server_id) {
                return Promise.reject({ code: 406, message: "Invalid serverId" });
            }
            profileId = profileId || this.principaleGraphId;
            let node = spinal_core_connectorjs_type_1.FileSystem._objects[server_id];
            if (typeof node !== "undefined") {
                if (node instanceof spinal_core_connectorjs_type_2.File)
                    return node;
                const found = yield this._nodeIsBelongUserContext(node, profileId);
                if (found) {
                    // @ts-ignore
                    spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
                    // @ts-ignore
                    return Promise.resolve(node);
                }
                return Promise.reject({ code: 401, message: "Unauthorized" });
            }
            return this.loadwithConnect(server_id, profileId);
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
    loadwithConnect(server_id, profileId) {
        return new Promise((resolve, reject) => {
            this.conn.load_ptr(server_id, (model) => __awaiter(this, void 0, void 0, function* () {
                if (!model) {
                    // on error
                    reject({ code: 404, message: "Node is not found" });
                }
                else {
                    if (model instanceof spinal_core_connectorjs_type_2.File)
                        return resolve(model);
                    const contextFound = yield this._nodeIsBelongUserContext(model, profileId);
                    if (contextFound) {
                        // @ts-ignore
                        spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(model);
                        // @ts-ignore
                        return resolve(model);
                    }
                    return reject({ code: 401, message: "Unauthorized" });
                }
            }));
        });
    }
    getNodeWithStaticId(nodeId, contextId, profileId) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let context;
            if (!isNaN(contextId))
                context = this.load(contextId, profileId);
            else {
                const graph = this.getGraph(profileId);
                context = yield this._getContext(graph, contextId);
                if (!context)
                    throw new Error(`no context found for ${contextId}`);
                let exist = yield this._nodeIsBelongUserContext(context, profileId);
                if (!exist)
                    throw new Error(`Unauthorized`);
            }
            if (nodeId === contextId)
                return context;
            if (context instanceof spinal_model_graph_1.SpinalContext) {
                try {
                    for (var _b = __asyncValues(context.visitChildrenInContext(context)), _c; _c = yield _b.next(), !_c.done;) {
                        const node = _c.value;
                        if (node.getId().get() === nodeId) {
                            // @ts-ignore
                            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
                            return node;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    }
    addProfileToMap(profileId, graph) {
        //@ts-ignore
        spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(graph);
        this.profilesToGraph.set(profileId, graph);
    }
    setPrincipaleGraph(graph) {
        this.principaleGraphId = graph.getId().get();
        this.addProfileToMap(this.principaleGraphId, graph);
    }
    //////////////////////////////////////////////////////////////
    //                        PRIVATE                           //
    //////////////////////////////////////////////////////////////
    _nodeIsBelongUserContext(node, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = node.getType().get();
            if (lib_1.EXCLUDES_TYPES.indexOf(type) !== -1)
                return true;
            const contexts = yield this._getProfileContexts(profileId);
            const found = contexts.find(context => {
                if (node instanceof spinal_model_graph_1.SpinalContext)
                    return node.getId().get() === context.getId().get();
                return node.belongsToContext(context);
            });
            return found ? true : false;
        });
    }
    _getProfileContexts(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            profileId = profileId || this.principaleGraphId;
            const graph = this.getGraph(profileId);
            if (!graph)
                throw new Error("no graph found");
            const contexts = yield graph.getChildren(["hasContext"]);
            //addContext to SpinalNode map
            return contexts.map(context => {
                //@ts-ignore
                spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
                return context;
            });
        });
    }
    _getContext(graph, contextId) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(contextId);
            if (context)
                return context;
            const contexts = yield graph.getChildren(["hasContext"]);
            return contexts.find(context => {
                //@ts-ignore
                spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
                return context.getId().get() == contextId;
            });
            // for await (const context of graph.visitChildren([])) {
            //   if (context.getId().get() == contextId) {
            //     //@ts-ignore
            //     SpinalGraphService._addNode(context);
            //     return context;
            //   }
            // }
        });
    }
    onLoadError() {
        console.error(`File does not exist in location ${config.file.path}`);
    }
    onLoadSuccess(forgeFile) {
        // if (config.runLocalServer == "true" || config.runLocalServer === true) {
        spinal_env_viewer_graph_service_1.SpinalGraphService.setGraph(forgeFile)
            .then((id) => {
            if (typeof id !== 'undefined') {
                SpinalServiceUser.init();
                graphUtils_1.spinalGraphUtils.init(SpinalAPIMiddleware.instance.conn);
                SpinalAPIMiddleware.instance.setPrincipaleGraph(forgeFile);
            }
        })
            .catch(e => console.error(e));
        // }
    }
}
SpinalAPIMiddleware.instance = null;
exports.default = SpinalAPIMiddleware;
exports.spinalAPIMiddlewareInstance = SpinalAPIMiddleware.getInstance();
//# sourceMappingURL=spinalAPIMiddleware.js.map