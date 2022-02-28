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
exports.connectionHandler = void 0;
const subscribeHandler_1 = require("./subscribeHandler");
const disconnectionHandler_1 = require("./disconnectionHandler");
function connectionHandler(io) {
    io.on("connection", (socket) => {
        const { handshake: { address, auth } } = socket;
        console.log(`${socket.id} is connected`);
        (0, subscribeHandler_1.subscribeHandler)(io, socket);
        (0, disconnectionHandler_1.disconnecthandler)(socket);
    });
}
exports.connectionHandler = connectionHandler;
//# sourceMappingURL=connectionHandler.js.map