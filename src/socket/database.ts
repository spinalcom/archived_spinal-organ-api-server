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

import * as fs from "fs";
const Q = require('q');
import { Model, File as SpinalFile, FileSystem } from "spinal-core-connectorjs_type";
import { spinalAPIMiddlewareInstance } from "../spinalAPIMiddleware";

class SocketIoDataBase {
    private path: string = "/etc/socketsDb/";
    private databaseName: string = "socket.db";
    private dataBaseModel;

    constructor() { }

    public init() {
        if (this.dataBaseModel) return;
        this._createOrGetDatabaseFile().then((model) => {
            console.log(model);
        })
    }

    private _createOrGetDatabaseFile(): Promise<spinal.Model> {
        return new Promise((resolve, reject) => {
            spinalAPIMiddlewareInstance.conn.load_or_make_dir(this.path, (directory: spinal.Directory<spinal.File<any>>) => {
                for (let index = 0; index < directory.length; index++) {
                    const element = directory[index];
                    const elementName = element.name.get();
                    if (elementName.toLowerCase() === this.databaseName.toLowerCase()) {
                        return element.load(async (database) => {
                            resolve(database);
                        });
                    }
                }

                const model = new Model();
                return this._waitModelReady().then(async () => {
                    console.log("model ready");

                    const file = new SpinalFile(this.databaseName.toLowerCase(), model, undefined);
                    directory.push(file);

                    return resolve(model);
                })
            })
        });
    }

    private _waitModelReady() {
        const deferred = Q.defer();
        const waitModelReadyLoop = (defer) => {
            if (!FileSystem._sig_server) {
                setTimeout(() => {
                    defer.resolve(waitModelReadyLoop(defer));
                }, 200);
            } else {
                defer.resolve();
            }
            return defer.promise;
        };
        return waitModelReadyLoop(deferred);
    };
}

export const socketIoDataBase = new SocketIoDataBase();