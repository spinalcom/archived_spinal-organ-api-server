import { SpinalGraph } from 'spinal-model-graph';
import { SpinalNode, SpinalContext } from 'spinal-env-viewer-graph-service';
import { Server } from "socket.io";
import { ISubscribeOptions } from './lib';
declare class SpinalGraphUtils {
    spinalConnection: any;
    private nodeBinded;
    private io;
    constructor();
    init(conn: any): Promise<any>;
    setIo(io: Server): void;
    getProfileGraph(profileId: string): SpinalGraph<any>;
    getNode(nodeId: string, contextId?: string, profileId?: string): Promise<SpinalNode<any>>;
    getNodeWithStaticId(nodeId: string, contextId?: string, profileId?: string): Promise<SpinalNode<any>>;
    bindNode(node: SpinalNode<any>, context: SpinalContext<any>, options: ISubscribeOptions, eventName?: string): Promise<void>;
    bindContextTree(startNode: SpinalNode<any>, context: SpinalContext<any>): void;
    bindChildNotInContext(node: SpinalNode<any>): Promise<void>;
    profileHasAccess(profileId: string, context: SpinalContext<any>, node?: SpinalNode<any>): boolean | Error;
    private _bindAllChild;
    private _bindChildInContext;
    private _getRelationNameNotInContext;
    private _getRelationNames;
    private _bindInfoAndElement;
    private _addNodeToBindedNode;
    private _formatNode;
    private _sendSocketEvent;
    private _listenAddChildEvent;
    private _listenAddChildInContextEvent;
    private _listenRemoveChildEvent;
    private _listenAddChildrenEvent;
    private _activeEventSender;
    private _findNode;
    private _callbackListen;
}
export declare const spinalGraphUtils: SpinalGraphUtils;
export {};
