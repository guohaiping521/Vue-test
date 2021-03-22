import {hybrid} from "./hybrid"

/**
 * 获取网络状态
 * @param params 
 */
export function netType(callback?: Function): any {
    return hybrid("core_netStatus", callback);
}