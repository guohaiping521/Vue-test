import {hybrid} from "./hybrid"
import {windowAdditionalParams} from './openWindow'
import terminalCheck from "../utils/terminalCheck";
import {jsBridgeInfo} from "../utils/system";

export interface openUrlParams extends windowAdditionalParams{
    pageKey:string
}

const containerType = ["",                                          // 0
    'WebViewController',                                            // 1、作业帮 ios
    'com.baidu.homework.activity.web.ZybWebActivity',               // 2、作业帮 Android
    'ZYBWKWebViewController',                                       // 3、一课   ios
    'com.baidu.homework.activity.live.web.LiveCacheHybridActivity', // 4、一课   Android
    'com.zybang.parent.activity.web.WebActivity',                   // 5、家长   Android
    'com.kuaiduizuoye.scan.activity.common.WebActivity',            // 6、快对   Android
    'com.zuoyebang.appfactory.activity.web.ZybWebActivity',         // 7、低幼   Android
];
function getAndrodClassName(){
  const plat = terminalCheck.getPlat();
  let className='';
  switch(plat){
    case 'zybAPP':
      className = containerType[2]; 
      break;
    case 'yikeAPP': 
      className = containerType[4]; 
      break;
    case 'jzAPP':   
      className = containerType[5]; 
      break;
    case 'kdAPP':   
      className = containerType[6]; 
      break;
    case 'kidAPP':  
      className = containerType[7]; 
      break;
    default: ;
  }
  return className;
} 
const win: any = window;
const className_ios = terminalCheck.isInYikeApp() ? 'ZYBWKWebViewController' : 'WebViewController';
const className_android = terminalCheck.isAndroid() ? getAndrodClassName() : undefined;
const defaultClassName: any = {className_ios};
if(className_android && jsBridgeInfo.jsBridge_vcnum < 230){
  defaultClassName.className_android = className_android;
}

const winClassName:any = (win.getOpenWindowName && win.getOpenWindowName()) || defaultClassName;


/**
 * 
 * @param params 打开native 或 web页面
 */
export function core_openUrl(params: any, callback?: Function){  
    if(params.businessData) {
        let classType = params.businessData.classType || {};
        if(classType.ios) {
            params.businessData.className_ios = containerType[classType.ios];
        }
        if(classType.android) {
            params.businessData.className_android = containerType[classType.android];
        }
        delete params.businessData.classType;
        params.businessData = {
            ...winClassName,
            ...params.businessData,
        }
        delete params.businessData.classType;
    }else {
        params.businessData = winClassName;
    }
    return hybrid("core_openUrl", params, callback);
}

