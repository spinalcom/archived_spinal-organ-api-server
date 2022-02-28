import { ISubscribeOptions, INodeId, IGetNodeRes, INodeData } from "../lib";
export declare function structureDataFunc(args: any[]): {
    ids: INodeId[];
    options: ISubscribeOptions;
};
export declare function getNodesFunc(ids: INodeId[]): Promise<{
    [key: string]: INodeData;
}>;
export declare function _getRoomNameFunc(nodeId: string | number, contextId: string | number, obj: {
    [key: string]: INodeData;
}, options: ISubscribeOptions): IGetNodeRes;
