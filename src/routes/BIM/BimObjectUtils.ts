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

import { SpinalContext } from "spinal-model-graph";

import SpinalAPIMiddleware from '../../spinalAPIMiddleware'
const BIM_FILE_CONTEXT_NAME = "BimFileContext";
const BIM_FILE_CONTEXT_RELATION = "hasBimFile";
const BIM_FILE_RELATION = "hasBimContext";
const BIM_CONTEXT_RELATION = "hasBimObject";

module.exports = class BimObjectUtils {
  context: Promise<SpinalContext<any>> = null
  static instance: BimObjectUtils = null
  constructor() {
  }
  static getInstance() {
    return typeof BimObjectUtils.instance !== "undefined" ? BimObjectUtils.instance : (BimObjectUtils.instance = new BimObjectUtils);
  }
  getContext() {
    if (this.context) return this.context;
    this.context = new Promise((resolve) => {
      const spinalAPIMiddleware = SpinalAPIMiddleware.getInstance();
      const graph = spinalAPIMiddleware.getGraph();
      resolve(graph.getContext(BIM_FILE_CONTEXT_NAME));
    })
    return this.context;
  }

  async getBimFile(bimFileId) {
    const context = await this.getContext();

    const bimFiles = await context.getChildren([BIM_FILE_CONTEXT_RELATION]);
    for (const bimFile of bimFiles) {
      if (bimFile._server_id === bimFileId || bimFile.getId().get() === bimFileId) {
        return bimFile;
      }
    }
    return undefined;
  }

  async getBimObjects(bimFileNode, dbIds) {
    const res = [];
    const bimContexts = await bimFileNode.getChildren([BIM_FILE_RELATION]);
    for (const bimContext of bimContexts) {
      // eslint-disable-next-line no-await-in-loop
      const bimObjects = await bimContext.getChildren([BIM_CONTEXT_RELATION]);
      bimObjects.reduce((acc, bimObject) => {
        if (dbIds.includes(bimObject.info.dbid.get())) acc.push(bimObject);
        return acc;
      }, res);
    }
    return res;
  }

  async getBimObjectsNodeInfo(bimObjects) {
    const result = [];
    for (const node of bimObjects) {
      var childrens_list = this.childrensNode(node);
      // eslint-disable-next-line no-await-in-loop
      var parents_list = await this.parentsNode(node);
      const data = {
        dynamicId: node._server_id,
        staticId: node.getId().get(),
        name: node.getName().get(),
        type: node.getType().get(),
        children_relation_list: childrens_list,
        parent_relation_list: parents_list
      };
      this.copyAttrInObj(data, node, 'externalId');
      this.copyAttrInObj(data, node, 'dbid');
      this.copyAttrInObj(data, node, 'bimFileId');
      this.copyAttrInObj(data, node, 'version');
      result.push(data);
    }

    return result;
  }

  async getBimObjectsInfo(bimFileId, dbids) {
    const bimFileNode = await this.getBimFile(bimFileId);
    if (!bimFileNode) throw "BimFileId not found";
    try {
      const bimObjects = await this.getBimObjects(bimFileNode, dbids);
      const bimObjectsInfo = await this.getBimObjectsNodeInfo(bimObjects);
      const model = {
        dynamicId: bimFileNode._server_id,
        staticId: bimFileNode.getId().get(),
        name: bimFileNode.getName().get(),
        type: bimFileNode.getType().get()
      };
      const notFound = dbids.reduce((acc, dbid) => {
        for (const bimObject of bimObjects) {
          if (typeof bimObject.info.dbid !== 'undefined' &&
            bimObject.info.dbid.get() === dbid) {
            return acc;
          }
        }
        acc.push(dbid);
        return acc;
      }, []);
      return {
        model,
        bimObjects: bimObjectsInfo,
        notFound
      };
    } catch (e) {
      console.error(e);
      throw "Internal server error";
    }
  }

  copyAttrInObj(target, node, string) {
    if (typeof node.info[string] !== "undefined") {
      Object.assign(target, { [string]: node.info[string].get() });
    }
  }

  childrensNode(node) {
    let childs = node.children;
    let res = [];
    // childrens relation course
    for (const [, relationTypeMap] of childs) {
      for (const [, relation] of relationTypeMap) {
        let child = {
          dynamicId: relation._server_id,
          staticId: relation.getId().get(),
          name: relation.getName().get(),
          children_number: relation.getNbChildren()
        };
        res.push(child);
      }
    }
    return res;
  }

  async parentsNode(node) {
    let parents = node.parents;
    let auxtab = [];
    let res = [];
    for (const [, ptrList] of parents) {
      for (let i = 0; i < ptrList.length; i++) {
        auxtab.push(ptrList[i].load());
      }
    }
    res = await Promise.all(auxtab).then((values) => {
      return values.map((node) => {
        return { dynamicId: node._server_id, staticId: node.getId().get(), name: node.getName().get(), children_number: node.getNbChildren() };
      });
    });
    return res;
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     GetBimObjectsInfo:
 *       type: object
 *       properties:
 *         bimFileId:
 *           description: serverId or staticId of the BimFile
 *           anyOf:
 *             - type: integer
 *             - type: string
 *         bimObjects:
 *           description: dbIds in the viewer
 *           type: array
 *           items:
 *             type: integer
 *       required:
 *         - bimFileId
 *         - bimObjects
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     BimObjectsInfo:
 *       type: object
 *       properties:
 *         bimFile:
 *           description: mini definition of bimFile
 *           $ref: '#/components/schemas/BimObjectsInfo/BimFile'
 *         bimObjects:
 *           description: nodes found in the graph
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BimObjectsInfo/BimObjectsItem'
 *         notFound:
 *           description: if the dbId is not found in the graph
 *           type: array
 *           items:
 *             type: integer
 *       required:
 *         - code
 *         - bimObjects
 *         - notFound
 */
// interface BimObjectsInfo {
//   model: Model;
//   bimObjects: BimObjectsItem[];
//   notFound: number[];
// }

/**
 * @swagger
 * components:
 *   schemas:
 *     BimObjectsInfo:
 *       BimFile:
 *         type: object
 *         properties:
 *           dynamicId:
 *             type: number
 *           staticId:
 *             type: number
 *           name:
 *             type: string
 *           type:
 *             type: string
 *         required:
 *           - dynamicId
 *           - staticId
 *           - name
 *           - type
 */
// interface BimFile {
//   dynamicId: number;
//   staticId: string;
//   name: string;
//   type: string;
// }

// bimoject
/**
 * @swagger
 * components:
 *   schemas:
 *     BimObjectsInfo:
 *       allOf:
 *         - $ref: '#/components/schemas/Node'
 *         - type: object
 *           properties:
 *             externalId:
 *               type: number
 *             dbid:
 *               type: number
 *             bimFileId:
 *               type: string
 *             version:
 *               type: string
 *           required:
 *             - externalId
 *             - dbid
 *             - bimFileId
 *             - version
 */
// interface BimObjectsItem {
//   dynamicId: number;
//   staticId: string;
//   name: string;
//   type: string;
//   children_relation_list: any[];
//   parent_relation_list: any[];
//   externalId: string;
//   dbid: number;
//   bimFileId: string;
//   version: number;
// }
