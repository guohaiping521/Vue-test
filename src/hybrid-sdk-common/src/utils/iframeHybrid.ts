/**
 * FE通过scheme拦截的方式向native主动发送消息
 * 例如：<iframe src="iknowhybrid://toast?data={parmas: \"test\"}&__callback__=__cb__common__32423__2"></iframe>
 * 如果native收到消息后需要将处理结果回传给FE，
 * 通过调用FE发送消息时参数中携带的回调函数，
 * 这个回调函数挂载在window上面。
 * 例如：window.__cb__common__32423__2(res);
 */

import terminalCheck from './terminalCheck'
import { guid } from "./tool"

const win: any = window;
const isLocal = /(localhost|127.0.0.1)/.test(location.origin)
let __cb__: any = null

// 创建hybrid
function createHybrid() {
    var protocol = !isLocal ? 'iknowhybrid://' : '/hybridaction/'
    var callbackCount = 0

    function createBridge() {
        var bridge = document.createElement('iframe')
        bridge.setAttribute('style', 'display:none;')
        bridge.setAttribute('height', '0px')
        bridge.setAttribute('width', '0px')
        bridge.setAttribute('frameborder', '0')
        document.documentElement.appendChild(bridge)
        return bridge
    }

    function buildUrl(action: any, params: any, callback: any) {
        var url = protocol + action + '?'
        var id = guid()
        url += 'data=' + encodeURIComponent(JSON.stringify(params || {}))
        
        if (callback) {
            var callbackName = '__cb__' + action + '__' + id + '__' + callbackCount++
            if (isLocal) {
                __cb__ = callbackName//__cb__share__guid__1
            }
            win[callbackName] = function() {
                let args: any = arguments;
                args = [].slice.call(args)
                // 防止端回调时不传参数
                if(args.length === 0) args.push('');
                // 回调名称
                args.push(callbackName)
                callback && callback.apply(window, args)
                /**
                 * Des:删除回调
                 * 1.如果没有remove方法，直接删除
                 * 2.如果有remove方法，调用remove方法删除。自定义删除时机
                 */
                if (typeof (callback.remove) == 'function') {
                    !!callbackName && callback.remove.apply(callback, [callbackName])
                } else {
                    delete win[callbackName]
                }
            }
            url += '&__callback__=' + callbackName
        }
        return url
    }

    return function (action: any, params?: any, callback?: Function) {
        // 测试使用 显示日志调用
        // addLog(`oldJsBridge, action=${action}`);
        let bridge: any = createBridge()//iframe
        if (params && Object.prototype.toString.call(params) === '[object Function]') {
            callback = params
            params = {}
        }
        ////iknowhybrid://toast?data={parmas: \"test\"}&__callback__=__cb__common__32423__2
        var url = buildUrl(action, params, callback);

        callback && isLocal && (bridge.onload = function(){
            var data = {};
            try {
                data = JSON.parse(bridge.contentDocument.body.children[0].textContent || "{}");
            } catch (e) {}  

            win[__cb__](data);  //__cb__share__guid__1 ()
            __cb__ = null;
        });

        bridge.setAttribute('src', url);
        (function (bridge) {
            // 3000ms后删除创建的iframe,//时间随机给的
            bridge.timer = setTimeout(() => {
                bridge.parentNode.removeChild(bridge)
                clearTimeout(bridge.timer)
            }, 3000)
        })(bridge);
    }
}

/**
 * 调用app的hybrid方法
 */
win.hybrid_sdk_framekey = new Date().getTime() + guid()
function _h5PluginAction (action: any, params: any, callback: any) {
  if (params && Object.prototype.toString.call(params) === '[object Function]') {
    callback = params;
    params = {};
  }
  params = params || {};
  params.hybrid_sdk_framekey = win.hybrid_sdk_framekey;
  win.parent.h5PluginAction(action, params, callback);
}
export let hybrid = terminalCheck.isInApp()
    ? createHybrid()
    : terminalCheck.isProduction() === 'unknow'
        ? function(){}
        : _h5PluginAction;

if (isLocal) {
    console.log('本地环境，createHybrid');
    hybrid = createHybrid();
}

// 支持promise的hybrid
export function iframePromiseHybrid(action: string, params: any = {}, callback: any) {
    return new Promise(function(resolve: Function, reject: Function){
        const _callback = function(res: any){
            resolve(res);
            callback && callback(res);
        }
        if(callback && callback.remove){ _callback.remove = callback.remove};
        hybrid(action, params, _callback);
    });
}
