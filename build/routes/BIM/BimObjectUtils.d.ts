export {};
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
