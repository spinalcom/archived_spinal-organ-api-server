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

import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from "swagger-jsdoc";
import * as express from "express";

import { swaggerOption } from "./swaggerOption";
import * as fs from "fs";

export function initSwaggerDoc(app: express.Express) {
    let swaggerDocs = swaggerJSDoc(swaggerOption);
    let swaggerUiOpts = {
        explorer: true,
        openapi: "3.0.1",
        produces: ["application/json"],
        swaggerOptions: swaggerOption,
        customCss: '.topbar-wrapper img {content: url(/logo.png);} .swagger-ui .topbar {background: #dbdbdb;}'
    };

    // TODO add swagger specs here for external documentation and for the organ to ask for it
    app.use('/swagger-spec', (req, res) => {
        res.json(swaggerDocs)
    })

    fs.writeFile('./swagger-spec.json', JSON.stringify(swaggerDocs, null, 2), (err) => {
        if (err) {
            return console.error(err);
        }
    });

    // add swagger docs to API
    app.use('/spinalcom-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOpts));

}