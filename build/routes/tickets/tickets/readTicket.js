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
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinal_env_viewer_plugin_documentation_service_1 = require("spinal-env-viewer-plugin-documentation-service");
const spinal_service_ticket_1 = require("spinal-service-ticket");
const Constants_1 = require("spinal-service-ticket/dist/Constants");
const requestUtilities_1 = require("../../../utilities/requestUtilities");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
     * @swagger
     * /api/v1/ticket/{ticketId}/read_details:
     *   get:
     *     security:
     *       - OauthSecurity:
     *         - readOnly
     *     description: Return ticket
     *     summary: Get ticket
     *     tags:
     *       - Workflow & ticket
     *     parameters:
     *      - in: path
     *        name: ticketId
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
     *                $ref: '#/components/schemas/TicketDetails'
     *       400:
     *         description: Bad request
     */
    app.get('/api/v1/ticket/:ticketId/read_details', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        try {
            const profileId = (0, requestUtilities_1.getProfileId)(req);
            var _ticket = yield spinalAPIMiddleware.load(parseInt(req.params.ticketId, 10), profileId);
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(_ticket);
            //Step
            var _step = yield _ticket
                .getParents('SpinalSystemServiceTicketHasTicket')
                .then((steps) => {
                for (const step of steps) {
                    if (step.getType().get() === 'SpinalSystemServiceTicketTypeStep') {
                        return step;
                    }
                }
            });
            var _process = yield _step
                .getParents('SpinalSystemServiceTicketHasStep')
                .then((processes) => {
                for (const process of processes) {
                    if (process.getType().get() === 'SpinalServiceTicketProcess') {
                        return process;
                    }
                }
            });
            //Context
            var contextRealNode = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(_ticket.getContextIds()[0]);
            // Notes
            var notes = yield spinal_env_viewer_plugin_documentation_service_1.serviceDocumentation.getNotes(_ticket);
            var _notes = [];
            for (const note of notes) {
                let infoNote = {
                    userName: note.element.username === undefined
                        ? ''
                        : note.element.username.get(),
                    date: note.element.date.get(),
                    type: note.element.type.get(),
                    message: note.element.message.get(),
                };
                _notes.push(infoNote);
            }
            // Files
            var _files = [];
            var fileNode = (yield _ticket.getChildren('hasFiles'))[0];
            if (fileNode) {
                var filesfromElement = yield fileNode.element.load();
                for (let index = 0; index < filesfromElement.length; index++) {
                    let infoFiles = {
                        dynamicId: filesfromElement[index]._server_id,
                        Name: filesfromElement[index].name.get(),
                    };
                    _files.push(infoFiles);
                }
            }
            // Logs
            function formatEvent(log) {
                return __awaiter(this, void 0, void 0, function* () {
                    var texte = '';
                    if (log.event == Constants_1.LOGS_EVENTS.creation) {
                        texte = 'created';
                    }
                    else if (log.event == Constants_1.LOGS_EVENTS.archived) {
                        texte = 'archived';
                    }
                    else if (log.event == Constants_1.LOGS_EVENTS.unarchive) {
                        texte = 'unarchived';
                    }
                    else {
                        const promises = log.steps.map((el) => spinal_env_viewer_graph_service_1.SpinalGraphService.getNodeAsync(el));
                        texte = yield Promise.all(promises).then((result) => {
                            //@ts-ignore
                            const step1 = result[0].name.get();
                            //@ts-ignore
                            const step2 = result[1].name.get();
                            const pre = log.event == Constants_1.LOGS_EVENTS.moveToNext ? true : false;
                            return pre
                                ? `Passed from ${step1} to ${step2}`
                                : `Backward from ${step1} to ${step2}`;
                        });
                    }
                    return texte;
                });
            }
            var logs = yield spinal_service_ticket_1.serviceTicketPersonalized.getLogs(_ticket.getId().get());
            var _logs = [];
            for (const log of logs) {
                let infoLogs = {
                    userName: log.user.name,
                    date: log.creationDate,
                    event: yield formatEvent(log),
                    ticketStaticId: log.ticketId,
                };
                _logs.push(infoLogs);
            }
            var elementSelected;
            try {
                if (_ticket.info.elementSelected !== undefined)
                    elementSelected = yield spinalAPIMiddleware.loadPtr(_ticket.info.elementSelected);
                else
                    elementSelected = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode((_a = _ticket.info.nodeId) === null || _a === void 0 ? void 0 : _a.get());
            }
            catch (error) {
                console.error(error);
            }
            var info = {
                dynamicId: _ticket._server_id,
                staticId: _ticket.getId().get(),
                name: _ticket.getName().get(),
                type: _ticket.getType().get(),
                priority: (_b = _ticket.info.priority) === null || _b === void 0 ? void 0 : _b.get(),
                creationDate: (_c = _ticket.info.creationDate) === null || _c === void 0 ? void 0 : _c.get(),
                description: _ticket.info.description == undefined
                    ? ''
                    : (_d = _ticket.info.description) === null || _d === void 0 ? void 0 : _d.get(),
                declarer_id: _ticket.info.declarer_id == undefined
                    ? ''
                    : (_e = _ticket.info.declarer_id) === null || _e === void 0 ? void 0 : _e.get(),
                elementSelected: elementSelected == undefined
                    ? 0
                    : {
                        dynamicId: elementSelected._server_id,
                        staticId: elementSelected.getId().get(),
                        name: elementSelected.getName().get(),
                        type: elementSelected.getType().get(),
                    },
                userName: _ticket.info.user == undefined ? '' : ((_f = _ticket.info.user.name) === null || _f === void 0 ? void 0 : _f.get()) || ((_g = _ticket.info.username) === null || _g === void 0 ? void 0 : _g.get()) || "",
                gmaoId: _ticket.info.gmaoId == undefined ? '' : (_h = _ticket.info.gmaoId) === null || _h === void 0 ? void 0 : _h.get(),
                gmaoDateCreation: _ticket.info.gmaoDateCreation == undefined
                    ? ''
                    : (_j = _ticket.info.gmaoDateCreation) === null || _j === void 0 ? void 0 : _j.get(),
                process: {
                    dynamicId: _process._server_id,
                    staticId: _process.getId().get(),
                    name: _process.getName().get(),
                    type: _process.getType().get(),
                },
                step: {
                    dynamicId: _step._server_id,
                    staticId: _step.getId().get(),
                    name: _step.getName().get(),
                    type: _step.getType().get(),
                    color: _step.info.color.get(),
                    order: _step.info.order.get(),
                },
                workflowId: contextRealNode._server_id,
                workflowName: contextRealNode.getName().get(),
                annotation_list: _notes,
                file_list: _files,
                log_list: _logs,
            };
        }
        catch (error) {
            console.log(error);
            if (error.code && error.message)
                return res.status(error.code).send(error.message);
            res.status(400).send('ko');
        }
        res.json(info);
    }));
};
//# sourceMappingURL=readTicket.js.map