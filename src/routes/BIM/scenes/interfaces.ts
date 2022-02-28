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

export interface IBimSceneListRes {
  status: string;
  body: IBody;
}

export interface IBimSceneRes {
  status: string;
  body: IScenesbody;
}
export interface IBody {
  scenes: IScenesItem[];
}
export interface IBody {
  scenes: IScenesItem[];
}
export interface IScenesItem {
  dynamicId: number;
  staticId: string;
  name: string;
  description: string;
  type: string;
  autoLoad?: boolean;
  useAllDT?: boolean;
  options?: IOptionsItem[];
}
export interface IOptionsItem {
  urn: string;
  loadOption?: ILoadOption;
  dbIds?: number[]
}
export interface ILoadOption {
  globalOffset: IGlobalOffset;
}
export interface IGlobalOffset {
  x: number;
  y: number;
  z: number;
}

export interface IScenesbody extends IScenesItem {
  scenesItems: IScenesItemsItem[];

}
export interface IScenesItemsItem {
  name: string;
  dynamicId: number;
  staticId: string;
  item?: string;
}
