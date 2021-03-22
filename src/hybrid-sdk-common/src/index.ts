export {
  core_goBack,
  goBack,
  openBrowser,
  windowConfig,
  core_openUrl,
  openUrl,
  core_openWindow,
  openWindow,
  core_share,
  share,
  checkLogin,
  core_login,
  login,
  nativeLog,
  fetchImg,
  dial,
  downloader,
  copyText,
  imgBrowser,
  core_audio,
  audio,
  core_showDialog,
  showDialog,
  netType,
  core_request,
  request,
  pureRequest,
  core_getCommonParameters,
  getCommonParameters,
  isAppInstalled,
  removeNativeLoading,
  pageTo,
  hybrid,
  bridge,
  commonPay,
  setStorage,
  getStorage,
  showDebuger,
} from './core/index';

export {
  NativeCallBackData, // interface
  ActionType, // enum
  onPageEnter,
  onPageLeave,
  onPageDestroy,
  onPagePullFresh,
  onNativeCallback, // 自定义全局回调
} from './hook/index';

export { transformCacheUrl } from './utils/preload';
export { jsBridgeInfo, canUseCommon } from './utils/system';
export { listen, trigger, remove } from './utils/event';
export { terminalCheck } from './utils/terminalCheck';
export { removeCallback } from './utils/tool';

export { hybrid as postMessageHybrid } from './utils/hybrid';
export { hybrid as iframeHybrid } from './utils/iframeHybrid';
