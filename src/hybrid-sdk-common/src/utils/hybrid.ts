/*
 * @Author: liangpengfei
 * @Date: 2019/8/10 下午3:11:17
 * @Description: 封装了通过action和native通讯的底层方法
 */
import { hybrid as iframeHybrid } from './iframeHybrid'
import { jsBridgeInfo } from "./system"
import { getMergedCallback } from "./tool"
import terminalCheck from "./terminalCheck"
// const isLocal = /(localhost|127.0.0.1)/.test(window.location.origin)

let win: any = window;
// 这里要兼处理多次引入被覆盖的问题
win.__jsBridge = win.__jsBridge || {
    callbackPool: {},
    ack_no: 1
};
win.__nativeProxyRequests__ = win.__nativeProxyRequests__ || {};
win.__jsBridge.invoke = function(_action: any, _data: any, _callback: Function) {
    
    if (_data) {
        if(Object.prototype.toString.call(_data) === '[object Function]') {
            _callback = _data;
            _data = {};
        }
    }else{
        _data = {};
    }

    var fullParam: any = {
        action: _action,
        param: _data,
    };
    let rndKey
    console.log(`======调用action params===`)
    console.log(`_action:`)
    console.log(_action)
    console.log(`_callback:`)
    console.log(_callback)
    console.log(`ack_no:`)
    console.log(win.__jsBridge.ack_no)
    console.log(`======调用action params end===`)

    if (_callback) { 

        // if(isLocal){
        //     let args: any = arguments;
        //     args = [].slice.call(args);
        //     _callback.apply(window, args);
        //     return;
        // }

        rndKey = 'cbk_' + win.__jsBridge.ack_no++;
        fullParam.callbackKey = rndKey;
        win.__jsBridge.callbackPool[rndKey] = _callback;
        
        // 存储 core_windowConfig 这个action调用时，配置分享、回退dialog的回调
        _action == "core_windowConfig" && (win.__jsBridge.callbackPool[_action] = _callback);
    }

    let message = win.__jsBridge.param(fullParam);
    if(win.ZYBJSBridge){
        win.ZYBJSBridge.postMessage(message);
    }else if(win.webkit && win.webkit.messageHandlers && win.webkit.messageHandlers.ZYBJSBridge){
        win.webkit.messageHandlers.ZYBJSBridge.postMessage(message);
    }else{
        decorateIframeCallback(_action, _data, _callback);
    }
    return rndKey
}

win.__jsBridge.callback = function(_data: any) {
    var callbackKey = _data.callbackKey;
    var func = win.__jsBridge.callbackPool[callbackKey];
    if (typeof func == 'function') {
        //传给回调参数的数据不需要callback函数
        // TODO:
        _data.__callbackKey__ = callbackKey
        delete _data.callbackKey;
        if (_data.errcode) {
            _data.code = _data.errcode;
            delete _data.errcode;
        }
        func(_data);
        // 释放,只用一次
        if(func.remove && typeof func.remove == 'function'){
            // if(!func.delete || typeof func.delete != 'function'){
            //     func.delete = function(key: string){
            //         delete win.__jsBridge.callbackPool[key];
            //     };
            // }
            
            func.remove.apply(func, [callbackKey])
        }else{
            delete win.__jsBridge.callbackPool[callbackKey];
        }

    }else{
        console.error('没有找到callbackKey');
    }
}
win.__jsBridge.param = function(_data: any) {
    let string = JSON.stringify(_data);
    let object = string ? string : '';
    return object;
}

// 对齐postMessageHybrid返回的数据结构
function decorateIframeCallback(action: string, params?: any, callback?: Function) {
    const _callback = function(res: any){
        const _res = {
            code: 200,
            data: res
        }
        callback(_res);
    }
    iframeHybrid(action, params, _callback);
}

declare global {
    function hybrid(action: string, params?: any, callback?: Function): any
}
export function hybrid (action: string, params?: any, callback?: Function) {
    let androidVC = jsBridgeInfo.jsBridge_os_version;
    if(androidVC){
        androidVC = androidVC.substr(0, 3);
    }else {
        androidVC = 10;
    }
    if(terminalCheck.isAndroid() && +androidVC < 4.2) {
        decorateIframeCallback(action, params, callback);
    }else{
        // 如果第二个参数类型是 Function
        if (params && Object.prototype.toString.call(params) === '[object Function]') {
            callback = <any>params;
            params = {}
        }
        // 如果有定义 回调函数，就挂载到全局，用于端的回调????????这个应该是多余的逻辑，待考证
        callback && (win[action] = callback);
        
        // 调用action
        return win.__jsBridge.invoke(action, params, callback);
    }
}

// 支持promise的hybrid
export function postMessagePromiseHybrid(action: string, params: any = {}, callback: Function = function(){}) {
    let callbackKey
    const promise = new Promise(function(resolve: Function, reject: Function){
        callbackKey = hybrid(action, params, getMergedCallback(resolve, reject, callback));
    });
    (promise as any)._action_name = action;
    (promise as any)._action_params = params;
    (promise as any)._action_callback = callback;
    (promise as any)._action_callback_key = callbackKey;
    return promise
}