/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
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


import { Server } from "socket.io";

const middlewareWraped = [];

export function setMiddleware(io: Server) {
    middlewareWraped.forEach(wrap => io.use(wrap));
}


function response(next: Function) {
    let code;
    let responses = {
        status: (status) => {
            code = parseInt(status)
            return responses;
        },
        json: (res) => {
            let message = res.message || "";
            responses.send(message);
            return responses;
        },
        send: (message) => {
            if (code && code >= 200 && code <= 299) return next();
            const error: any = new Error(message);
            error.code = code;
            return next(error);
        }
    }

    return responses;
}


const wrap = (middleware) => {
    return (socket, next) => {
        const { handshake: { auth } } = socket;
        const token = auth.token;

        let error;
        if (!token) {
            error = new Error("You must specify your token");
            error.code = 401;
            return next(error);
        }

        socket.request.headers.authorization = token;
        return middleware(socket.request, response(next), next);
    }
}
export const wrapMiddleware = (middleware) => {
    middlewareWraped.push(wrap(middleware));
}
