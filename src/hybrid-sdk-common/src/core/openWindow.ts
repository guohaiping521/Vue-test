import {hybrid} from "./hybrid"
import terminalCheck from "../utils/terminalCheck";
import {jsBridgeInfo} from "../utils/system";

export interface windowAdditionalParams{
    title?: string;
    swapBack?: number;
    hideStatusBar?: number;
    hideNavBar?: number;
    screenDirection?: number;
    navBarBgColor?: string;
    staBarStyle?: number;
    showShareBtn?: number;
    allLight?: number;
    businessData?: any;
    [propName: string]: any;
}
export interface openWindowParams extends windowAdditionalParams {
    pageUrl: string;
}

// 数组元素的顺序不能改动
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
    let className = '';
    switch(plat){
      case 'zybAPP':  className = containerType[2]; break;
      case 'yikeAPP': className = containerType[4]; break;
      case 'jzAPP':   className = containerType[5]; break;
      case 'kdAPP':   className = containerType[6]; break;
      case 'kidAPP':  className = containerType[7]; break;
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
const defaultParams: openWindowParams = {
    pageUrl: "",                 // 页面地址
    title: "",                   // 页面标题
    swapBack: 0,                 // 滑动手势返回 0禁用 1允许
    hideStatusBar: 0,            // 隐藏状态栏 0显示 1不显示
    hideNavBar: 0,               // 隐藏导航栏（安卓:titleBar） 0显示 1不显示
    screenDirection: 0,          // 屏幕方向 0竖屏 1横屏 2跟随设备方向
    navBarBgColor: "",           // 导航条背景色
    staBarStyle: 0,              // 状态栏风格 0白色 1黑色
    showShareBtn: 0,             // 是否显示右上角分享按钮<样式固定>
    allLight: 0,                 // 屏幕是否常亮 1 常亮 0跟随系统
    // businessData: winClassName// 扩展参数 
};

/**
 * 在一个新的nativepage中新开一个页面
 * @param params 新window的属性
 * @param params.businessData.className_android activity的类名，例如：com.baidu.homework.activity.web.ZybWebActivity
 * @param params.businessData.className_ios 容器的类名，例如：xx.xxx.xxxx
 * @param callback 
 */
export function core_openWindow(params: openWindowParams, callback?: Function){
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
    return hybrid("core_openWindow", params, callback);
}

interface windowConfigParams {
    pageUrl?: string;             //页面地址
    title?: string;               //页面标题
    swapBack?: number;            //滑动手势返回 0禁用 1允许
    hideStatusBar?: number;       //隐藏状态栏 0显示 1不显示
    hideNavBar?: number;          //隐藏导航栏 0显示 1不显示
    screenDirection?: number;     //屏幕方向 0竖屏 1横屏 2跟随设备方向
    navBarBgColor?: string;       //导航条背景色 //android不支持
    staBarStyle?: number;         //状态栏风格 0白色 1黑色 //android不支持
    allLight?: number;            //屏幕是否常亮 0: 跟随系统设置 1: 常亮
    showShareBtn?:  number;       //是否显示右上角分享按钮 0 不显示 1 显示
    shareBtnBgImg?: string;       //分享按钮背景图
    shareData?: object;           //参数同 core_share 
    shareCallBack?: Function;     //分享回调；
    backShowDialog?: number;      //点击返回按钮是否展示弹窗 0 show 1 不show
    dialogData?: object;          //参数格式和core_showDialog一致
    dialogCallback?: Function;    //dialog回调，回调数据会指出用户点击了哪个按钮，默认左按钮留下，右按钮离开
    businessData?: any;
    [propName: string]: any;
}

const defaultWindowConfigParams: windowConfigParams = {
    pageUrl: "",                 // 页面地址
    title: "",                   // 页面标题
    swapBack: 0,                 // 滑动手势返回 0禁用 1允许
    hideStatusBar: 0,            // 隐藏状态栏 0显示 1不显示
    hideNavBar: 0,               // 隐藏导航栏（安卓:titleBar） 0显示 1不显示
    screenDirection: 0,          // 屏幕方向 0竖屏 1横屏 2跟随设备方向
    navBarBgColor: "",           // 导航条背景色
    staBarStyle: 0,              // 状态栏风格 0白色 1黑色
    allLight: 0,                 // 屏幕是否常亮 1 常亮 0跟随系统
    showShareBtn: 0,             // 是否显示右上角分享按钮<样式固定>
    shareBtnBgImg: '',           //分享按钮背景图
    shareData: {},               //参数同 core_share 
    shareCallBack: function(){}, //分享回调；
    backShowDialog: 0,           //点击返回按钮是否展示弹窗 0 show 1 不show
    dialogData: {},              //参数格式和core_showDialog一致
    dialogCallback: function(){} //dialog回调，回调数据会指出用户点击了哪个按钮，默认左按钮留下，右按钮离开
    // businessData: null        //  预留参数（上传业务层）
};


export function windowConfig(params: any){

    let callback = function(res: any){
        let shareCallBack = params.shareCallBack;
        let dialogCallback = params.dialogCallback;

        if(res.data && res.data.result+1 > 0) {
            shareCallBack && shareCallBack(res.data);
        }else if(res.data && res.data.res){
            dialogCallback && dialogCallback(res.data);
        }
    };
    return hybrid('core_windowConfig', params, callback);
}


/**
 * 在端外浏览器打开url
 * @param url 要打开的地址 
 */
export function openBrowser(params: any){
    return hybrid('core_openBrowser', params);
}

interface GoBackParams {
    backWindow: number; // 退出方式 0:(默认)按照fe的历史栈一层一层返回;  1:关闭当前native容器; 2:关闭当前和前一个容器; N: 关闭及前N-1g个页面；
}

/**
 * 页面的退出方式
 * @export
 * @param {number} backWindow 退出方式 0:(默认)按照fe的历史栈一层一层返回;  1:关闭当前native容器; 2:关闭当前和前一个容器; N: 关闭及前N-1g个页面；
 */
export function core_goBack(params: GoBackParams) {
    let _params: any = {
        backWindow: 0,
        ...params
    };

    return hybrid("core_exit", _params);

}