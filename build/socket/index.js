"use strict";
/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSocketServer = void 0;
const socket_io_1 = require("socket.io");
const connectionHandler_1 = require("./handlers/connectionHandler");
const graphUtils_1 = require("../graphUtils");
const middlewares_1 = require("./middlewares");
const serverOption = { pingTimeout: 30000, maxHttpBufferSize: 1e8, transports: ["websocket"] };
function runSocketServer(app) {
    const io = new socket_io_1.Server(app, serverOption);
    (0, middlewares_1.setMiddleware)(io);
    graphUtils_1.spinalGraphUtils.setIo(io);
    (0, connectionHandler_1.connectionHandler)(io);
    console.log("socket is running...");
}
exports.runSocketServer = runSocketServer;
//# sourceMappingURL=index.js.map