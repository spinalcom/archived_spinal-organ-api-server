
/*
 * Copyright 2020 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */



import * as express from 'express';
import { Server as HttpServer } from 'http';
import routes from "./routes/routes";
import { runSocketServer } from './socket'
import APIServer from "./api-server";
import { initSwaggerDoc } from "./initSwagger";
import SpinalAPIMiddleware from "./spinalAPIMiddleware";
import { wrapMiddleware } from "./socket/middlewares";

import * as path from "path";
import * as config from "../config";


const spinalAPIMiddleware = SpinalAPIMiddleware.getInstance();


async function runServerRest(server?: HttpServer, app?: express.Express) {
  let host = config.api.host
  let port = config.api.port
  let logger = {};

  if (!app || !server) await spinalAPIMiddleware.initGraph();

  let api = app || APIServer();
  server = server || api.listen(port, () => console.log(`Rest api listen on port ${port}`));


  api.get('/logo.png', (req, res) => {
    const assets = path.resolve(__dirname, '../assets');
    res.sendFile(`${assets}/spinalcore.png`)
    // res.sendFile('spinalcore.png', { root: __dirname });
  });

  initSwaggerDoc(api);
  routes(logger, api, spinalAPIMiddleware);
  runSocketServer(server);

}

//export default runServerRest;

export { runServerRest, spinalAPIMiddleware, wrapMiddleware }
