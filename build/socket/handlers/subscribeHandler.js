"use strict";
/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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
exports.subscribeHandler = void 0;
const SocketHandlerUtils_1 = require("../../utilities/SocketHandlerUtils");
const graphUtils_1 = require("../../graphUtils");
const lib_1 = require("../../lib");
function subscribeHandler(io, socket) {
    socket.on(lib_1.SUBSCRIBE_EVENT, (...args) => __awaiter(this, void 0, void 0, function* () {
        console.log("received subscribe request from", socket.id);
        const { ids, options } = (0, SocketHandlerUtils_1.structureDataFunc)(args);
        const nodes = yield (0, SocketHandlerUtils_1.getNodesFunc)(ids);
        const result = ids.map(({ nodeId, contextId }) => (0, SocketHandlerUtils_1._getRoomNameFunc)(nodeId, contextId, nodes, options));
        socket.emit(lib_1.SUBSCRIBED, result.length == 1 ? result[0] : result);
        result.forEach(({ error, nodeId, status, eventNames }) => {
            if (!error && status === lib_1.OK_STATUS) {
                const { node, contextNode } = nodes[nodeId];
                eventNames.forEach(roomId => socket.join(roomId));
                graphUtils_1.spinalGraphUtils.bindNode(node, contextNode, options);
            }
        });
    }));
}
exports.subscribeHandler = subscribeHandler;
//# sourceMappingURL=subscribeHandler.js.map