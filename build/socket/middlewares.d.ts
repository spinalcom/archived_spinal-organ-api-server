import { Server } from "socket.io";
export declare function setMiddleware(io: Server): void;
export declare const wrapMiddleware: (middleware: any) => void;
