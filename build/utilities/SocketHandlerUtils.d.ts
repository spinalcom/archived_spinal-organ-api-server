import { ISubscribeOptions, INodeId, IGetNodeRes, INodeData } from "../lib";
import { SpinalNode } from "spinal-model-graph";
export declare function structureDataFunc(args: any[]): {
    ids: INodeId[];
    options: ISubscribeOptions;
};
export declare function getNodesAndRooms(ids: INodeId[], profileId: string, options: ISubscribeOptions): Promise<({
    error: any;
    node: SpinalNode<any>;
    context: SpinalNode<any>;
    ids: {
        contextId: string | number;
        nodeId: string | number;
    };
    status: string;
    eventNames: string[];
} | {
    error: any;
    ids: {
        contextId: string | number;
        nodeId: string | number;
    };
    status: string;
    node?: undefined;
    context?: undefined;
    eventNames?: undefined;
})[]>;
export declare function getNodeFunc(ids: INodeId[]): Promise<{
    [key: string]: INodeData;
}>;
export declare function _getRoomNameFunc(nodeId: string | number, contextId: string | number, obj: {
    [key: string]: INodeData;
}, options: ISubscribeOptions): IGetNodeRes;
