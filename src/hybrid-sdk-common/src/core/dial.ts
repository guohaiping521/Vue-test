import {hybrid} from "./hybrid"

interface dialParams {
    phone: String;  // 电话号码
    businessData?: any;
}

/**
 * 吊起手机拨号界面
 * @param params 
 */
export function dial(params: dialParams): any {
    return hybrid("core_dial", params);
}