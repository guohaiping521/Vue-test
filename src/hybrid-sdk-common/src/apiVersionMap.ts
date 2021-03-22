// 涉及到action的 API 要做版本区分
// goback 231是因为231之前，core_exit 在前一个页面是native和h5的混合页面的时候无效
// request 在231 时功能才稳定
export default {
    core_goBack: {
        android: 210,
        iphone: 231,
    },
    goBack: {
        android: 210,
        iphone: 231,
    },
    openBrowser: {
        android: 210,
        iphone: 210,
    },
    windowConfig: {
        android: 210,
        iphone: 210,
    },
    core_openWindow: {
        android: 210,
        iphone: 210,
    },
    openWindow: {  
        android: 210,
        iphone: 210,
    },
    core_share: {
        android: 210,
        iphone: 210,
    },
    share: {
        android: 210,
        iphone: 210,
    },
    checkLogin: {
        android: 210,
        iphone: 210,
    },
    core_login: {
        android: 210,
        iphone: 210,
    },
    login: {
        android: 210,
        iphone: 210,
    },
    nativeLog: {
        android: 210,
        iphone: 210,
    },
    fetchImg: {
        android: 210,
        iphone: 210,
    },
    dial: {
        android: 210,
        iphone: 210,
    },
    downloader: {
        android: 210,
        iphone: 210,
    },
    copyText: {
        android: 210,
        iphone: 210,
    },
    imgBrowser: {
        android: 210,
        iphone: 210,
    },
    core_audio: {
        android: 210,
        iphone: 210,
    },
    audio: {
        android: 210,
        iphone: 210,
    },
    core_showDialog: {
        android: 210,
        iphone: 210,
    },
    showDialog: {
        android: 210,
        iphone: 210,
    },
    netType: {
        android: 210,
        iphone: 210,
    },
    core_request: {
        android: 231,
        iphone: 230,
    },
    request: {
        android: 231,
        iphone: 230,
    },
    core_getCommonParameters: {
        android: 210,
        iphone: 210,
    },
    getCommonParameters: {
        android: 210,
        iphone: 210,
    },
    isAppInstalled: {
        android: 210,
        iphone: 210,
    },
    removeNativeLoading: {
        android: 210,
        iphone: 210,
    },
    pageTo: {
        android: 210,
        iphone: 230,
    },
    hybrid: {
        android: 210,
        iphone: 210,
    },
    commonPay: {
        android: 210,
        iphone: 210,
    },
    setStorage: {
        android: 234,
        iphone: 234,
    }, 
    getStorage: {
        android: 234,
        iphone: 234,
    },
    onPageEnter: {
        android: 210,
        iphone: 210,
    },
    onPageLeave: {
        android: 210,
        iphone: 210,
    },
    onPageDestroy: {
        android: 210,
        iphone: 210,
    },
    onPagePullFresh: {
        android: 210,
        iphone: 210,
    },
    onNativeCallback: {
        android: 210,
        iphone: 210,
    },
}
