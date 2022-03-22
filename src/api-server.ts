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


import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import * as _ from "lodash";


import * as bodyParser from "body-parser";
import SpinalAPIMiddleware from './spinalAPIMiddleware';
import { runSocketServer } from './socket';

function APIServer(): express.Express {

  const app = express();
  // enable files upload
  // runSocketServer(app);

  // app.use(fileUpload({
  //   createParentPath: true
  // }));

  // app.use(cors());
  // app.disable('x-powered-by');
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }));
  // app.use(bodyParser.json());
  // // app.use(morgan('dev'));

  // app.use('/admin', express.static('public'));

  return app;
}

export default APIServer;
