/// <reference types="node" />
import * as express from 'express';
import { Server as HttpServer } from 'http';
import SpinalAPIMiddleware from "./spinalAPIMiddleware";
declare function runServerRest(server?: HttpServer, app?: express.Express, spinalAPIMiddleware?: SpinalAPIMiddleware): Promise<void>;
export { runServerRest, SpinalAPIMiddleware };
