import { SpinalNode } from "spinal-model-graph";
export interface IGetNodeRes {
    node?: SpinalNode<any>;
    status: string;
    eventNames?: string[];
    nodeId: string | number;
    error: Error;
}
