/// <reference types="node" />
import * as express from 'express';
import { Server as HttpServer } from 'http';
import SpinalAPIMiddleware from "./spinalAPIMiddleware";
declare const spinalAPIMiddleware: SpinalAPIMiddleware;
declare function runServerRest(server?: HttpServer, app?: express.Express): Promise<void>;
export { runServerRest, spinalAPIMiddleware };
