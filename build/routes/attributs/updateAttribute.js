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
const constants_1 = require("spinal-env-viewer-plugin-documentation-service/dist/Models/constants");
const requestUtilities_1 = require("../../utilities/requestUtilities");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/node/{idNode}/category/{idCategory}/attribut/{attributName}/update:
  *   put:
  *     security:
  *       - OauthSecurity:
  *         - read
  *     description: update attribute
  *     summary: update an attribut
  *     tags:
  *       - Node Attributs
  *     parameters:
  *      - in: path
  *        name: idNode
  *        description: use the dynamic ID
  *        required: true
  *        schema:
  *          type: integer
  *          format: int64
  *      - in: path
  *        name: idCategory
  *        description: use the dynamic ID
  *        required: true
  *        schema:
  *          type: integer
  *          format: int64
  *      - in: path
  *        name: attributName
  *        required: true
  *        schema:
  *          type: string
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - attributeLabel
  *               - attributeValue
  *               - attributeType
  *               - attributeUnit
  *             properties:
  *               attributeLabel:
  *                 type: string
  *               attributeValue:
  *                 type: string
  *     responses:
  *       200:
  *         description: update Successfully
  *         content:
  *           application/json:
  *             schema:
  *                $ref: '#/components/schemas/NodeAttribut'
  *       400:
  *         description: Bad request
      */
    app.put("/api/v1/node/:idNode/category/:idCategory/attribute/:attributName/update", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const profileId = (0, requestUtilities_1.getProfileId)(req);
        let node = yield spinalAPIMiddleware.load(parseInt(req.params.idNode, 10), profileId);
        let childrens = yield node.getChildren(constants_1.NODE_TO_CATEGORY_RELATION);
        let nodes = [];
        let category = childrens.find(el => (el.getId().get() === req.params.idCategory));
        if (typeof category != "undefined") {
            let attributes = yield category.getElement();
            for (let index = 0; index < attributes.length; index++) {
                const element = attributes[index];
                if (element.label.get() === req.params.attributName) {
                    element.label.set(req.body.attributeLabel);
                    element.value.set(req.body.attributeValue);
                    break;
                }
            }
        }
        for (const child of childrens) {
            let attributs = yield child.element.load();
            let info = {
                dynamicId: child._server_id,
                staticId: child.getId().get(),
                name: child.getName().get(),
                type: child.getType().get(),
                attributs: attributs.get()
            };
            nodes.push(info);
        }
        res.json(nodes);
    }));
};
//# sourceMappingURL=updateAttribute.js.map