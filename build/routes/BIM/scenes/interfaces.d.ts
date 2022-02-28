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
    dbIds?: number[];
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
