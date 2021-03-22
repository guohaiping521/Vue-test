import {hybrid} from "./hybrid"

/**
 * 数据埋点  !!!! 废弃
 * @param params
 */
export function nativeLog(params: any): any {
    return hybrid("core_nlog", params);
}