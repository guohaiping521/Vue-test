import {hybrid} from "./hybrid"

interface commonPayParams {
    channel: number ;  // 渠道分类 http://wiki.afpai.com/pages/viewpage.action?pageId=19902070
    info: object; // 协议内容，调用第三方支付需要的信息，比如，商户号，通知地址，APPID
    source?: number; // 支付来源，比如，订单列表，需要和端协商来定义
}
interface commonPayResponse {
    status: number;
    errstr: string;
}

/**
 * 通用支付  这里的逻辑需要跟丽丽确认
 * @param params 
 */
export function commonPay(params: commonPayParams, callback?: Function): Promise<any> {
    return hybrid("core_FIRE", params, callback);
}