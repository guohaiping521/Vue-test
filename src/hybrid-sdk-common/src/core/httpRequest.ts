import { hybrid } from "./hybrid"
import { canUseCommon } from "../utils/system";
import { NativeProxyRequestHooker } from "../utils/tool";
import terminalCheck from "../utils/terminalCheck";
import axios, { Method, AxiosRequestConfig } from 'axios'

// TODO: 1. 增加自定义headers 2.判断环境选择走端代理还是axios，保证接口一致 3.打包时需要排除axios

interface requestParams {
    type: Method;        //必填  请求方式
    url:string;         //必填  url地址
    headers?:object;     //设置  request header
    params?:object;      //可选  无参数时候,默认{}
    [propName: string]: any;
}

function webRequest(params: requestParams): any {
    let requestData: AxiosRequestConfig = {
        method:  params.type,
        url:     params.url,
        headers: params.headers,
        data:    params.params,
        withCredentials: true
    };
    if(params.baseUrl) requestData.baseURL = params.baseUrl;
    return axios(requestData);
}

// const defaultResponse = {
//     code:200,
//     errcode: 200,
//     data: {
//         errorTips: '',
//         data: {
//             // 接口数据在这里
//         }
//     }
// };

/**
 * 通过native调用接口
 * @param params 
 */
export function core_request(params: requestParams, callback?: Function): any {
    const NPR = new NativeProxyRequestHooker();
     // 代理请求的UA参数 不完成
     if(params.headers){
        params.headers = {
            'User-Agent': window.navigator.userAgent,
            ...params.headers
        }
    }

    const isNumber = (val:any) => typeof val === 'number' && val === val;
    // 此res因为此action不可能用iframe，所以一定是res.data
    const justifyResponseStatus = (res:any) => {
        console.log(`justifyResponseStatus`)
        console.log(res)
        console.log(`justifyResponseStatus end`)
        if(res.errorTips.length > 0 || res.errCode !== undefined){
            return 600
        }else{
            return 200
        }
    }

    const promise = hybrid("core_httpRequest", params, callback);
    const actionParams = (promise as any)._action_params
    const callbackKey = (promise as any)._action_callback_key
    NPR.preProxy(actionParams, callbackKey);
    return promise.then((res)=>{
        NPR.afterProxy(params, res, justifyResponseStatus(res));
        return Promise.resolve(res);
    }, (res)=>{
        NPR.afterProxy(params, res, justifyResponseStatus(res));
        return Promise.reject(res)
    });
}

/**
 * 通过native调用接口, 适配了之前的API
 * @param params 
 */
export function request(params: any, callback?: Function): any {
    if(terminalCheck.isInApp() && canUseCommon("request")){
        return core_request(params, callback);
    }else{
        return webRequest(params).then((res: any)=>{
            const response =  {
                env: 'web',
                errorTips:'',
                ...res
            }
            callback && callback(response);
            return Promise.resolve(response);
        });
    }
}

export function pureRequest(params: any, callback?: Function): any {
    if(terminalCheck.isInApp() && canUseCommon("request")){
        return core_request(params, callback);
    }else{
        return webRequest(params).then((res: any)=>{
            callback && callback(res.data);
            return Promise.resolve(res.data);
        });
    }
}


