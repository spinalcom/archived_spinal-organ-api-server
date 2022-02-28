import { SpinalContext, SpinalNode } from "spinal-model-graph";
export interface INodeId {
    nodeId: string | number;
    contextId?: string | number;
}
export interface INodeData {
    nodeId: string | number;
    contextId?: string | number;
    node?: SpinalNode<any>;
    contextNode?: SpinalContext<any>;
}
