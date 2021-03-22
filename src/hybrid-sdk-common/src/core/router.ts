import {core_openUrl} from "./openUrl";
import {core_openWindow} from "./openWindow";
import { jsBridgeInfo } from "../utils/system";
import { deepClone } from "../utils/tool";
import terminalCheck from "../utils/terminalCheck";
import { windowAdditionalParams, openWindowParams } from './openWindow'
import { openUrlParams } from './openUrl'
const APP_SUPPORT_ROUTE_VERSION = terminalCheck.isAndroid() ? 210 : 230; // 端代理230才接入，固230才能走路由，否则file下ajax会有问题

/**
 * 将zyb协议只根据协议本身解析成http协议的无md5路径
 */
function parseZybToHttpUseDefaultPathPrefix(to: standardParams){
  console.log(to)
  const { module, page, params, pathPrefix, origin } = to;
  const _pathPrefix = pathPrefix || '/static/hy/'
  const _origin = origin || 'https://www.zybang.com'
  let resultUrl = `${origin}${_pathPrefix}${module}/${page}.html${params}`
  return resultUrl
}

interface compatOpenWindowParams extends windowAdditionalParams{
  url: string
}

interface standardParams extends windowAdditionalParams{
  module: string,
  page: string,
  params: string
  pathPrefix?: string,
  origin?: string
}

interface notInAppJumpFunction {
  (param: standardParams | compatOpenWindowParams):void
}

const defaultNotInAppJump = (param:standardParams | compatOpenWindowParams) => {
  let url;
  if(typeof param.url === 'string'){
    url = param.url
  }else{
    const { module, page, params, pathPrefix, origin } = param;
    const _pathPrefix = pathPrefix || '/static/hy/'
    const _origin = origin || 'https://www.zybang.com'
    url = `${_origin}${_pathPrefix}${module}/${page}.html${params}`
  }
  window.location.href = url
}

/**
 * 如果有url参数，则视为兼容server下发url（zyb协议/http协议），fe直接透传的情况
 * @param params zyb协议/http协议的url
 */
function compatWithOldSdk(params:any){
  return typeof params.url === 'string'
}

/**
 * openLiveWindow \ openWindow 接受参数url
 * core_openWindow接受参数pageUrl
 */

export class RouteSwitcher {

  static pageTo(params: standardParams | compatOpenWindowParams, callback?:Function, notInAppJump:notInAppJumpFunction = defaultNotInAppJump) {

    function isZybUrl(url:string){
      return /zyb:\/\/.+\/page\/.+/.test(url)
    } 

    function invokeCoreOpenUrl(params:openUrlParams){
      console.log("invokeCoreOpenUrl");
      console.log(params);
      return core_openUrl(params, callback);
    }

    function invokeCoreOpenWindow(params:openWindowParams){
      console.log('invokeCoreOpenWindow');
      console.log(params)
      return core_openWindow(params, callback);
    }

    let normalizedParams;
    /**
     * server下发fe透传情况，param
     */
    if(compatWithOldSdk(params)){
      // http协议，调用openWindow，不需要判断端版本
      if(!isZybUrl(params.url)){
        if(!terminalCheck.isInApp()) {
          notInAppJump(params as compatOpenWindowParams)
          return
        }
        const coreOpenWindowParam = deepClone(params)
        coreOpenWindowParam.pageUrl = coreOpenWindowParam.url;
        delete coreOpenWindowParam.url
        return invokeCoreOpenWindow(coreOpenWindowParam)
      }else{
        // zyb协议，将zyb协议的url，解析成标准参数，挂载在params上，构造成标准params格式，供后续使用
        normalizedParams = deepClone(params)
        const parsedZybProtocol = /zyb:\/\/(.+)\/page\/([^?]+)(.*)/.exec(normalizedParams.url)
        normalizedParams.module = parsedZybProtocol[1]
        normalizedParams.page = parsedZybProtocol[2]
        normalizedParams.params = parsedZybProtocol[3]
        delete normalizedParams.url
        params = normalizedParams as standardParams
      }
    }

    /**
     * 标准params参数，但不在app中
     */
    if(!terminalCheck.isInApp()){
      notInAppJump(params as standardParams)
      return
    }

    const isOpenUrlAvailable = jsBridgeInfo.jsBridge_vcnum >= APP_SUPPORT_ROUTE_VERSION;

    // 根据标准params参数去调用相应API
    if (!isOpenUrlAvailable) {
      // 没有openUrl，调用openWindow
      const coreOpenWindowParam = deepClone(params)
      coreOpenWindowParam.pageUrl = parseZybToHttpUseDefaultPathPrefix(coreOpenWindowParam as standardParams);
      delete coreOpenWindowParam.module;
      delete coreOpenWindowParam.page;
      delete coreOpenWindowParam.params;
      return invokeCoreOpenWindow(coreOpenWindowParam)
    } else {
      // 有openUrl，调用openUrl
      const coreOpenUrlParam = deepClone(params)
      coreOpenUrlParam.pageKey = `zyb://${params.module}/page/${params.page}${params.params}`;
      delete coreOpenUrlParam.module;
      delete coreOpenUrlParam.page;
      delete coreOpenUrlParam.params;
      return invokeCoreOpenUrl(coreOpenUrlParam)
    }
  }
}

export const pageTo = RouteSwitcher.pageTo
