import {hybrid} from "./hybrid"

interface loginParams {
    fr: String;          // 注册外部调用渠道标识
    reLogin: number;     // 0 根据本地buss判断是否调起登录界面, 1 触发重新登录事件
    businessData?: any;
}

/**
 * 登陆功能
 * @param params 
 */
export function core_login(params: any, callback?: Function): any {
    return hybrid("core_login", params, callback);
}

/**
 * 检查登陆状态
 * @param callback 
 */
export function checkLogin(callback?: Function): any {
    return hybrid("core_isLogin", callback);
}