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

import { Server } from 'socket.io';
import { connectionHandler } from "./handlers/connectionHandler";
import { spinalGraphUtils } from "./spinal/graphUtils";

const serverOption: any = { pingTimeout: 30000, maxHttpBufferSize: 1e8, transports: ["websocket"] };


export function runSocketServer(app: any) {

    // const httpServer = createServer(app);
    // const io = new Server(httpServer, serverOption);
    const io = new Server(app, serverOption);
    connectionHandler(io);
    spinalGraphUtils.setIo(io);

    // httpServer.listen(socketPort, () => {
    //     console.log(`socket server listen on port : ${socketPort}`);
    // });
}

