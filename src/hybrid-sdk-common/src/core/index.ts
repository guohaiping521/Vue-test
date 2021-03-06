export {
    core_openWindow, 
    core_openWindow as openWindow, 
    windowConfig, 
    openBrowser, 
    core_goBack, 
    core_goBack as goBack
} from "./openWindow"
export {core_share as share, core_share} from "./share"
export {core_login, core_login as login, checkLogin} from "./login"
export {nativeLog} from "./log"
export {fetchImg} from "./fetchImg"
export {dial} from "./dial"
export {downloader} from "./downloader"
export {copyText} from "./copyToClipboard"
export {imgBrowser} from "./showImgBrowser"
export {core_audio, core_audio as audio} from "./audioDisplay"
export {core_showDialog, core_showDialog as showDialog} from "./showDialog"
export {netType} from "./netStatus"
export {core_request, request, pureRequest} from "./httpRequest"
export {core_getCommonParameters, core_getCommonParameters as getCommonParameters} from "./commonData"
export {isAppInstalled} from "./isAppInstalled"
export {removeNativeLoading} from "./removeNativeLoading"
export {commonPay} from "./payToy"
export {hybrid, bridge} from './hybrid'
export {pageTo} from './router'
export {core_openUrl, core_openUrl as openUrl} from './openUrl'
export {setStorage, getStorage} from './storage'
export {showDebuger} from './debug'

