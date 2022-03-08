"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapMiddleware = exports.spinalAPIMiddleware = exports.runServerRest = void 0;
const routes_1 = require("./routes/routes");
const socket_1 = require("./socket");
const api_server_1 = require("./api-server");
const initSwagger_1 = require("./initSwagger");
const spinalAPIMiddleware_1 = require("./spinalAPIMiddleware");
const middlewares_1 = require("./socket/middlewares");
Object.defineProperty(exports, "wrapMiddleware", { enumerable: true, get: function () { return middlewares_1.wrapMiddleware; } });
const path = require("path");
const config = require("../config");
const spinalAPIMiddleware = spinalAPIMiddleware_1.default.getInstance();
exports.spinalAPIMiddleware = spinalAPIMiddleware;
function runServerRest(server, app) {
    return __awaiter(this, void 0, void 0, function* () {
        let host = config.api.host;
        let port = config.api.port;
        let logger = {};
        if (!app || !server)
            yield spinalAPIMiddleware.initGraph();
        let api = app || (0, api_server_1.default)();
        server = server || api.listen(port, () => console.log(`Rest api listen on port ${port}`));
        api.get('/logo.png', (req, res) => {
            const assets = path.resolve(__dirname, '../assets');
            res.sendFile(`${assets}/spinalcore.png`);
            // res.sendFile('spinalcore.png', { root: __dirname });
        });
        (0, initSwagger_1.initSwaggerDoc)(api);
        (0, routes_1.default)(logger, api, spinalAPIMiddleware);
        (0, socket_1.runSocketServer)(server);
    });
}
exports.runServerRest = runServerRest;
//# sourceMappingURL=index.js.map