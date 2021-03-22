import {hybrid} from "./hybrid"

export interface Storage {
    saveType: String;          //必填  1 =>  代表内存存储; 2 =>  代表持久存储
    saveKey:  String;          //必填  key
}

export interface SaveStorage extends Storage{
    saveData: String;          //必填  value  
}

/**
 * 添加本地存储数据
 * @param params 
 */
export function setStorage(params: SaveStorage, callback?: Function): Promise<any> {
    return hybrid("core_storage", params, callback); 
}
/**
 * 获取本地存储数据
 * @param params 
 */
export function getStorage(params: Storage, callback?: Function): Promise<any> {
    return hybrid("core_getStorage", params, callback);
    
}