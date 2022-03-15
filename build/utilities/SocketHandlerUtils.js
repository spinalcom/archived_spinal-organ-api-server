"use strict";
/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
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
exports._getRoomNameFunc = exports.getNodeFunc = exports.getNodesAndRooms = exports.structureDataFunc = void 0;
const lib_1 = require("../lib");
const lodash = require("lodash");
const spinal_model_graph_1 = require("spinal-model-graph");
const graphUtils_1 = require("../graphUtils");
function structureDataFunc(args) {
    let ids = lodash.flattenDeep(args.slice(0, args.length - 1));
    // let callback;
    // if (typeof args[args.length - 1] === "function")
    //     callback = args[args.length - 1];
    let options = args[args.length - 1];
    options = typeof options === "object" ? options : {};
    return {
        ids: ids.map(id => _formatId(id)),
        options
    };
}
exports.structureDataFunc = structureDataFunc;
function getNodesAndRooms(ids, profileId, options) {
    const promises = ids.map((el) => __awaiter(this, void 0, void 0, function* () {
        try {
            _checkIdError(el);
            //@ts-ignore
            const context = yield graphUtils_1.spinalGraphUtils.getNode(el.contextId, el.contextId, profileId);
            //@ts-ignore
            const node = yield graphUtils_1.spinalGraphUtils.getNode(el.nodeId, el.contextId, profileId);
            _checkNodesExistance([{ id: el.contextId, node: context }, { id: el.nodeId, node: node }]);
            const accessError = graphUtils_1.spinalGraphUtils.profileHasAccess(profileId, context, node);
            if (accessError instanceof Error)
                throw accessError;
            const eventNames = _getRooms(context, node, options);
            return {
                error: null, node, context, ids: { contextId: el.contextId, nodeId: el.nodeId }, status: lib_1.OK_STATUS, eventNames
            };
        }
        catch (error) {
            return { error: error.message, ids: { contextId: el.contextId, nodeId: el.nodeId }, status: lib_1.NOK_STATUS };
        }
    }));
    return Promise.all(promises);
}
exports.getNodesAndRooms = getNodesAndRooms;
function getNodeFunc(ids) {
    const obj = {};
    const promises = ids.map(({ nodeId, contextId }) => __awaiter(this, void 0, void 0, function* () {
        let context;
        //@ts-ignore
        if (contextId)
            context = yield graphUtils_1.spinalGraphUtils.getNode(contextId);
        let tempContextId = context && context instanceof spinal_model_graph_1.SpinalContext ? contextId : undefined;
        //@ts-ignore
        const node = yield graphUtils_1.spinalGraphUtils.getNode(nodeId, tempContextId);
        obj[nodeId] = {
            nodeId,
            contextId,
            node,
            contextNode: context
        };
    }));
    return Promise.all(promises).then((result) => {
        return obj;
    });
}
exports.getNodeFunc = getNodeFunc;
function _getRoomNameFunc(nodeId, contextId, obj, options) {
    var _a, _b;
    const node = (_a = obj[nodeId]) === null || _a === void 0 ? void 0 : _a.node;
    const context = (_b = obj[nodeId]) === null || _b === void 0 ? void 0 : _b.contextNode;
    let error = null;
    if (!node || !(node instanceof spinal_model_graph_1.SpinalNode)) {
        error = !node ? `${nodeId} is not found` : `${nodeId} must be a spinalNode or SpinalContext`;
        // error = new Error(message);
        return { error, nodeId, status: lib_1.NOK_STATUS };
    }
    let roomId = node.getId().get();
    let eventNames = [roomId];
    if (options.subscribeChildren && [lib_1.IScope.in_context, lib_1.IScope.tree_in_context].indexOf(options.subscribeChildScope) !== -1) {
        if (!context || !(context instanceof spinal_model_graph_1.SpinalContext)) {
            let contextError;
            if (!contextId)
                contextError = `you did not specify the context id`;
            else
                contextError = `${contextId} is not a valid context id`;
            error = `You try to subscribe somme data in context but, ${contextError}`;
            return { error, nodeId, status: lib_1.NOK_STATUS };
        }
        const namespaceId = context.getId().get();
        eventNames.push(`${namespaceId}:${roomId}`);
    }
    return { error, nodeId, status: lib_1.OK_STATUS, eventNames };
}
exports._getRoomNameFunc = _getRoomNameFunc;
///////////////////////////////////////////////////////////////////////////////////
//                                  PRIVATE                                      //
///////////////////////////////////////////////////////////////////////////////////
function _formatId(id) {
    if (typeof id === "string") {
        const ids = id.split("/");
        return {
            nodeId: ids.length <= 1 ? ids[0] : ids[1],
            contextId: ids.length <= 1 ? undefined : ids[0]
        };
    }
    if (typeof id === "number")
        return {
            nodeId: id,
            contextId: undefined
        };
    if (id.nodeId)
        return id;
}
function _checkIdError(ids) {
    if (!(ids === null || ids === void 0 ? void 0 : ids.contextId))
        throw new Error("contextId is required");
    if (!(ids === null || ids === void 0 ? void 0 : ids.nodeId))
        throw new Error("nodeId is required");
}
function _checkNodesExistance(nodes) {
    if (!Array.isArray(nodes))
        nodes = [nodes];
    for (const { id, node } of nodes) {
        if (!node)
            throw Error(`no node found for ${id}`);
    }
}
function _getRooms(context, node, options) {
    let roomId = node.getId().get();
    let eventNames = [roomId];
    if (options.subscribeChildren && [lib_1.IScope.in_context, lib_1.IScope.tree_in_context].indexOf(options.subscribeChildScope) !== -1) {
        const namespaceId = context.getId().get();
        eventNames.push(`${namespaceId}:${roomId}`);
    }
    return eventNames;
}
//# sourceMappingURL=SocketHandlerUtils.js.map