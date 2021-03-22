import {
    listen,
    trigger,
    remove
} from "../utils/event"
import {hybrid} from "../utils/hybrid"

const win: any = window;
const DEFAULT_CALLBACK = function() {};
// win.extroActionTypePool = win.extroActionTypePool ? win.extroActionTypePool : [];

export interface NativeCallBackData {
    action_type: ActionType;
    data: Object;
}

export enum ActionType {
    PageEnter          = "onPageActive",           // 页面所在的webviw 进出前台或被创建
    PageLeave          = "onPagePause",            // 页面所在的webview 进入后台
    PageDestroy        = "onPageDestroy",          // 页面所在的webview 销毁
    AppEnterBackground = "onEnterBackground",      // App进入后台
    AppEnterForeground = "onEnterForeground",      // App回到前台
    PagePullFresh      = "pullRefresh",            // 下拉刷新回调
}


export function onPageEnter (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.PageEnter, callback);
    return {
        remove: function () {
          remove(ActionType.PageEnter, callback)
        }
    }
}
export function onPageLeave (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.PageLeave, callback);
    return {
        remove: function () {
          remove(ActionType.PageLeave, callback)
        }
    }
}
export function onPageDestroy (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.PageDestroy ,callback);
    return {
        remove: function () {
          remove(ActionType.PageDestroy, callback)
        }
    }
}
export function onEnterBackground (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.AppEnterBackground ,callback);
    return {
        remove: function () {
          remove(ActionType.AppEnterBackground, callback)
        }
    }
}
export function onEnterForeground (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.AppEnterForeground ,callback);
    return {
        remove: function () {
          remove(ActionType.AppEnterForeground, callback)
        }
    }
}
export function onPagePullFresh (callback: Function = DEFAULT_CALLBACK){
    listen(ActionType.PagePullFresh ,callback);
    return {
        remove: function () {
          remove(ActionType.PagePullFresh, callback)
        },
        pullRefreshFinish: function(){
            hybrid('pullRefreshFinish');
        }
    }
}

// 扩展自定义全局监听
export function onNativeCallback(actionType: string, callback: Function = DEFAULT_CALLBACK){
    listen(actionType, callback);
    // win.extroActionTypePool.push(actionType);
    return {
        remove: function () {
          remove(actionType, callback)
        }
    }
}


// 全局回调相关，端主动调用FE都是通过 NATIVE_CALLBACK.
const cacheCallback = win.NATIVE_CALLBACK;
const NATIVE_CALLBACK = function(res: NativeCallBackData){
    let result = trigger(res.action_type, res.data);
    // 如果当前的池子没有触发，看下有别的池子没有，有的话，调用别的池子看看
    if(result === false && cacheCallback && cacheCallback.writable !== false){
        cacheCallback(res);
    }
}
// 跟旧版本的NATIVE_CALLBACK做下区分
NATIVE_CALLBACK.writable = false;
try {
    Object.defineProperty(win, 'NATIVE_CALLBACK', {
        value: NATIVE_CALLBACK,
        writable: false
    });
} catch (error) {
    
}
// win.NATIVE_CALLBACK = function(res: NativeCallBackData){
//     console.log(`native触发了全局事件：, ${res.action_type}`)
//     trigger(res.action_type, res.data);
//     // 扩展事件
//     var len = win.extroActionTypePool.length;
//     if(len !== 0){
//         for (let t=0; t<len; t++){
//             if(res.action_type === win.extroActionTypePool[t]) {
//                 trigger(res.action_type, res.data);
//                 return;
//             }
//         }
//     }

//     // 通用事件
//     switch (res.action_type) {
//         case ActionType.PageEnter:
//             trigger(ActionType.PageEnter, res.data);
//             break; 
    
//         case ActionType.PageLeave:
//             trigger(ActionType.PageLeave, res.data);
//             break;
    
//         case ActionType.PageDestroy:
//             trigger(ActionType.PageDestroy, res.data);
//             break;

//         case ActionType.AppEnterBackground:
//             trigger(ActionType.AppEnterBackground, res.data);
//             break;

//         case ActionType.AppEnterForeground:
//             trigger(ActionType.AppEnterForeground, res.data);
//             break;
    
//         case ActionType.PagePullFresh:
//             trigger(ActionType.PagePullFresh, res.data);
//             break;

//         default: console.warn(`没有监听全局事件：, ${res.action_type}`);
//     }
// }