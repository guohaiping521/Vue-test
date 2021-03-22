import apiVersionMap from "../apiVersionMap"
import terminalCheck from "./terminalCheck"


export const jsBridgeInfo: any = (function() {
  let uaObj: any = {};
  let uaArr = window.navigator.userAgent.split(' ');
  uaArr = uaArr.filter((item)=>{
    return item.indexOf('jsBridge_isNewJsBridge/') >= 0 || item.indexOf('jsBridge_vc/') >= 0 || item.indexOf('jsBridge_os_version/') >= 0;
  });

  uaArr.forEach((item)=>{
    const arr = item.split('/');
    uaObj[arr[0]]=arr[1];
  });

  // 把jsBridge版本号格式化为数字，方便使用
  if(uaObj.jsBridge_vc){
    let vc = uaObj.jsBridge_vc;
    vc = +(vc.split('.').join(''));
    uaObj.jsBridge_vcnum = vc;
  }
  // 当前native页面是否可以使用通用action的开关
  if(uaObj.jsBridge_isNewJsBridge === '1') {
    uaObj.isNewJsBridge = true;
  }
  return uaObj;
})();

export function canUseCommon(API?: any ): boolean{
  const win: any                = window;
  const plat: any               = terminalCheck.getSystem();
  const isNewJsBridge: number   = +jsBridgeInfo.jsBridge_isNewJsBridge;
  const jsBridgeVcNum: number   = jsBridgeInfo.jsBridge_vcnum;
  const hasZYBJSBridge: boolean = !!(win.ZYBJSBridge) || !!(win.webkit && win.webkit.messageHandlers && win.webkit.messageHandlers.ZYBJSBridge);
  
  let canUseCommon: boolean = isNewJsBridge === 1 && jsBridgeVcNum >= 210 && hasZYBJSBridge;

  if(terminalCheck.isAndroid()){
    let androidVC = jsBridgeInfo.jsBridge_os_version;
    if(androidVC){
        androidVC = +androidVC.substr(0, 3);
    }else {
        androidVC = 10;
    }
    if(androidVC < 4.2) {
      canUseCommon = false
    }
  }

  if(canUseCommon && API && typeof(API) === 'string'){
    let map: any = apiVersionMap;
    if(map[API] && map[API][plat] <= jsBridgeVcNum){
      canUseCommon = true;
    }else {
      canUseCommon = false;
    }
  }
  return canUseCommon;

};