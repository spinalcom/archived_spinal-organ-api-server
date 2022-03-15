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

import { Server, Socket } from "socket.io";
import { structureDataFunc, _getRoomNameFunc, getNodesAndRooms } from "../../utilities/SocketHandlerUtils";
import { SUBSCRIBE_EVENT, SUBSCRIBED, OK_STATUS } from '../../lib';
import { spinalAPIMiddlewareInstance } from "../../spinalAPIMiddleware";
import { spinalGraphUtils } from "../../graphUtils";
const { runLocalServer } = require("../../../config");


export function subscribeHandler(io: Server, socket: Socket) {

    socket.on(SUBSCRIBE_EVENT, async (...args) => {
        let profileId = socket.handshake.auth.token?.profileId

        if (!profileId && (runLocalServer == "true" || runLocalServer === true)) profileId = spinalAPIMiddlewareInstance.principaleGraphId;

        const { ids, options } = structureDataFunc(args);

        const responseData = await getNodesAndRooms(ids, profileId, options);
        const responseFormatted = responseData.map(({ error, ids, status, eventNames }) => ({ error, ids, status, eventNames }))

        socket.emit(SUBSCRIBED, responseFormatted.length == 1 ? responseFormatted[0] : responseFormatted);

        responseData.forEach(({ error, node, context, status, eventNames }) => {
            if (!error && status === OK_STATUS) {
                eventNames.forEach(roomId => socket.join(roomId));

                spinalGraphUtils.bindNode(node, context, options)
            }
        });



        // const nodes = await getNodesFunc(ids);

        // const result = ids.map(({ nodeId, contextId }) => _getRoomNameFunc(nodeId, contextId, nodes, options))
        // socket.emit(SUBSCRIBED, result.length == 1 ? result[0] : result);

        // result.forEach(({ error, nodeId, status, eventNames }) => {
        //     if (!error && status === OK_STATUS) {
        //         const { node, contextNode } = nodes[nodeId];
        //         eventNames.forEach(roomId => socket.join(roomId));

        //         spinalGraphUtils.bindNode(node, contextNode, options)
        //     }
        // });
    })
}



