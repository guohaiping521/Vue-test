import {hybrid} from "./hybrid"

interface isAppInstalledParams {
    url: String;  // 平台协议
}

/**
 * 监测应用是否安装
 * @param params 
 */
export function isAppInstalled(params: isAppInstalledParams, callback?: Function): any {
    return hybrid("core_isAppInstalled", params, callback);
}