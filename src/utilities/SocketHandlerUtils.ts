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

import { ISubscribeOptions, INodeId, OK_STATUS, NOK_STATUS, IGetNodeRes, IScope, INodeData } from "../lib";
import * as lodash from "lodash";
import { SpinalContext, SpinalNode } from "spinal-model-graph";
import { spinalGraphUtils } from "../graphUtils";


export function structureDataFunc(args: any[]): { ids: INodeId[], options: ISubscribeOptions } {

    let ids = lodash.flattenDeep(args.slice(0, args.length - 1));
    // let callback;

    // if (typeof args[args.length - 1] === "function")
    //     callback = args[args.length - 1];

    let options = args[args.length - 1];

    options = typeof options === "object" ? options : {};

    return {
        ids: ids.map(id => _formatId(id)),
        options
    }
}

export function getNodesFunc(ids: INodeId[]): Promise<{ [key: string]: INodeData }> {
    const obj = {};

    const promises = ids.map(async ({ nodeId, contextId }) => {
        let context;
        if (contextId) context = await spinalGraphUtils.getNode(contextId);
        let tempContextId = context && context instanceof SpinalContext ? contextId : undefined;
        const node = await spinalGraphUtils.getNode(nodeId, tempContextId);

        obj[nodeId] = {
            nodeId,
            contextId,
            node,
            contextNode: context
        }
    });

    return Promise.all(promises).then((result) => {
        return obj;
    })
}


export function _getRoomNameFunc(nodeId: string | number, contextId: string | number, obj: { [key: string]: INodeData }, options: ISubscribeOptions): IGetNodeRes {
    const node = obj[nodeId]?.node;
    const context = obj[nodeId]?.contextNode;

    let error = null;

    if (!node || !(node instanceof SpinalNode)) {
        error = !node ? `${nodeId} is not found` : `${nodeId} must be a spinalNode, SpinalContext`;
        // error = new Error(message);
        return { error, nodeId, status: NOK_STATUS };
    }

    let roomId = node.getId().get();
    let eventNames = [roomId];

    if (options.subscribeChildren && [IScope.in_context, IScope.tree_in_context].indexOf(options.subscribeChildScope) !== -1) {
        if (!context || !(context instanceof SpinalContext)) {
            let contextError;
            if (!contextId) contextError = `you did not specify the context id`;
            else contextError = `${contextId} is not a valid context id`;

            error = `You try to subscribe somme data in context but, ${contextError}`;

            return { error, nodeId, status: NOK_STATUS };
        }
        const namespaceId = context.getId().get();
        eventNames.push(`${namespaceId}:${roomId}`)
    }


    return { error, nodeId, status: OK_STATUS, eventNames };
}


function _formatId(id: string | number | INodeId): INodeId {

    if (typeof id === "string") {
        const ids = id.split("/");

        return {
            nodeId: ids.length <= 1 ? ids[0] : ids[1],
            contextId: ids.length <= 1 ? undefined : ids[0]
        }
    }

    if (typeof id === "number") return {
        nodeId: id,
        contextId: undefined
    }

    if (id.nodeId) return id;
}