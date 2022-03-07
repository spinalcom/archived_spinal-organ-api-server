import { SpinalGraph } from 'spinal-model-graph';
declare class SpinalAPIMiddleware {
    static instance: SpinalAPIMiddleware;
    loadedPtr: Map<number, any>;
    conn: spinal.FileSystem;
    constructor();
    static getInstance(): SpinalAPIMiddleware;
    setConnection(connect: spinal.FileSystem): void;
    initGraph(graph?: SpinalGraph<any>): void;
    connectAndLoadGraph(): void;
    onLoadError(): void;
    onLoadSuccess(forgeFile: SpinalGraph<any>): void;
    getGraph(): SpinalGraph<any>;
    load<T extends spinal.Model>(server_id: number): Promise<T>;
    loadPtr<T extends spinal.Model>(ptr: spinal.File<T> | spinal.Ptr<T> | spinal.Pbr<T>): Promise<T>;
    private _nodeIsBelongUserContext;
    private _getUserContexts;
}
export default SpinalAPIMiddleware;
