import { SpinalGraph, SpinalNode } from 'spinal-model-graph';
declare class SpinalAPIMiddleware {
    static instance: SpinalAPIMiddleware;
    loadedPtr: Map<number, any>;
    conn: spinal.FileSystem;
    profilesToGraph: Map<string, SpinalGraph<any>>;
    principaleGraphId: string;
    constructor();
    static getInstance(): SpinalAPIMiddleware;
    initGraph(): void;
    setConnection(connect: spinal.FileSystem): void;
    getGraph(profileId?: string): SpinalGraph<any>;
    load<T extends spinal.Model>(server_id: number, profileId?: string): Promise<T>;
    loadPtr<T extends spinal.Model>(ptr: spinal.File<T> | spinal.Ptr<T> | spinal.Pbr<T>): Promise<T>;
    loadwithConnect<T extends spinal.Model>(server_id: number, profileId?: string): Promise<T>;
    getNodeWithStaticId(nodeId: string, contextId: string, profileId?: string): Promise<SpinalNode<any>>;
    addProfileToMap(profileId: string, graph: SpinalGraph<any>): void;
    setPrincipaleGraph(graph: SpinalGraph<any>): void;
    private _nodeIsBelongUserContext;
    private _getProfileContexts;
    private _getContext;
    private onLoadError;
    private onLoadSuccess;
}
export default SpinalAPIMiddleware;
export declare const spinalAPIMiddlewareInstance: SpinalAPIMiddleware;
