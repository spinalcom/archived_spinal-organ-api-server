import { SpinalNode } from 'spinal-model-graph';
import { IScenesItemsItem } from './interfaces';
declare function getScenes(): Promise<SpinalNode<any>[]>;
declare function sceneGetItems(sceneNode: SpinalNode<any>): Promise<IScenesItemsItem[]>;
declare function getFolderPath(itemPath: string): string;
declare function isNodeId(node: SpinalNode<any>, id: string | number): boolean;
export { getScenes, sceneGetItems, getFolderPath, isNodeId };
/**
 * @swagger
 * components:
 *   schemas:
 *     SceneInfo:
 *       type: "object"
 *       properties:
 *         status:
 *           type: "string"
 *         body:
 *           type: "object"
 *           properties:
 *             dynamicId:
 *               type: "integer"
 *             staticId:
 *               type: "string"
 *             name:
 *               type: "string"
 *             description:
 *               type: "string"
 *             type:
 *               type: "string"
 *             autoLoad:
 *               type: "boolean"
 *             scenesItems:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   name:
 *                     type: "string"
 *                   dynamicId:
 *                     type: "integer"
 *                   staticId:
 *                     type: "string"
 *                   item:
 *                     type: "string"
 *             useAllDT:
 *               type: "boolean"
 *             options:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   urn:
 *                     type: "string"
 *                   loadOption:
 *                     type: "object"
 *                     properties:
 *                       globalOffset:
 *                         type: "object"
 *                         properties:
 *                           x:
 *                             type: "number"
 *                           y:
 *                             type: "number"
 *                           z:
 *                             type: "number"
 */
