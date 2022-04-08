declare class SocketIoDataBase {
    private path;
    private databaseName;
    private dataBaseModel;
    constructor();
    init(): void;
    private _createOrGetDatabaseFile;
    private _waitModelReady;
}
export declare const socketIoDataBase: SocketIoDataBase;
export {};
