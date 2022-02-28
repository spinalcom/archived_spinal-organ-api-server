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

const BimObjectUtils = require("./BimObjectUtils");

module.exports = function (logger, app) {
  /**
 * @swagger
 * /api/v1/BIM/getBimObjectsInfo:
 *   post:
 *     security:
 *       - OauthSecurity:
 *         - readOnly
 *     description: Retrun the list of getBimObjectsInfo
 *     summary: Get getBimObjectsInfo
 *     tags:
 *       - BIM
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bimFileId:
 *                 description: serverId or staticId of the BimFile
 *                 oneOf:
 *                   - type: string
 *                   - type: integer
 *               bimObjects:
 *                 description: dbIds in the viewer
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - bimFileId
 *               - bimObjects
 *     responses:
 *       200:
 *         description: Array of getBimObjectsInfo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/BimObjectsInfo'
 *
  */
  app.post("/api/v1/BIM/getBimObjectsInfo", async (req, res) => {
    try {
      const bimObjectUtils = BimObjectUtils.getInstance();
      // data : { bimFileId: string, dbids: number[] }[]
      const data = req.body;
      if (!Array.isArray(data)) return res.status(400).send('Bad request body');

      const result = [];
      for (const d of data) {
        // eslint-disable-next-line no-await-in-loop
        result.push(await bimObjectUtils.getBimObjectsInfo(d.bimFileId, d.dbids));
      }
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  });
};



