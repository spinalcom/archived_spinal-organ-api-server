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

import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { Room } from '../interfacesGeoContext'
import { serviceTicketPersonalized } from 'spinal-service-ticket'
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/equipement/{id}/ticket_list:
 *   get:
 *     security: 
 *       - OauthSecurity: 
 *         - readOnly
 *     description: Returns list of tickets of equipement
 *     summary: Get list of tickets of equipement
 *     tags:
 *       - Geographic Context
 *     parameters:
 *      - in: path
 *        name: id
 *        description: use the dynamic ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Bad request
*/
  app.get("/api/v1/equipement/:id/ticket_list", async (req, res, next) => {
    let nodes = []
    try {
      var equipement = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(equipement)

      if (equipement.getType().get() === "BIMObject") {
        var ticketList = await serviceTicketPersonalized.getTicketsFromNode(equipement.getId().get());

        for (let index = 0; index < ticketList.length; index++) {
          var realNodeTicket = SpinalGraphService.getRealNode(ticketList[index].id)
          var info = {
            dynamicId: realNodeTicket._server_id,
            staticId: realNodeTicket.getId().get(),
            name: ticketList[index].name,
            type: ticketList[index].type,
          }
          nodes.push(info);
        }
      } else {
        res.status(400).send("node is not of type BIMObject");
      }


    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(nodes);
  })
}
