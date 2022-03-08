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

import { URL_TYPE, NOTE_TYPE, CATEGORY_TYPE, ATTRIBUTE_TYPE } from 'spinal-env-viewer-plugin-documentation-service/dist/Models/constants';

export const OK_STATUS: string = "success";
export const NOK_STATUS: string = "error";
export const SUBSCRIBE_EVENT: string = "subscribe";
export const SUBSCRIBED: string = "subscibed";
export const PUBLISH_EVENT: string = "publish";
export const ERROR_EVENT: string = "exception";

export enum EVENT_NAMES {
    updated = "updated",
    addChild = "addChild",
    childRemoved = "childRemoved",
    childrenRemoved = "childrenRemoved",
    addChildInContext = "addChildInContext"
}

export const EXCLUDES_TYPES = [URL_TYPE, NOTE_TYPE, CATEGORY_TYPE, ATTRIBUTE_TYPE]