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
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
    * @swagger
    * /api/v1/node/{idNode}/category/{idCategory}/attribute/{attributName}/delete:
    *   delete:
    *     security:
    *       - OauthSecurity:
    *         - read
    *     description: Delete an attribute
    *     summary: delete an attribut
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
    *     responses:
    *       200:
    *         description: Delete Successfully
    *       400:
    *         description: Bad request
    */
    //   app.delete("/api/v1/node/:idNode/category/:idCategory/attribute/:attributName/delete", async (req, res, next) => {
    //     try {
    //       let node: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.idNode, 10));
    //       let category = await spinalAPIMiddleware.load(parseInt(req.params.idCategory));
    //       let attributeLabel = req.params.attributName
    //       let childrens = await node.getChildren(NODE_TO_CATEGORY_RELATION)
    //       for (let index = 0; index < childrens.length; index++) {
    //         if (childrens[index]._server_id === category._server_id) {
    //           await serviceDocumentation.removeAttributesByLabel(category, attributeLabel);
    //         } else {
    //           return res.status(400).send("ko");
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       return res.status(400).send("ko");
    //     }
    //     res.json();
    //   })
};
//# sourceMappingURL=deleteAttribute.js.map