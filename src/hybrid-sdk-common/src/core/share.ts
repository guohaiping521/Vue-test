import {hybrid} from "./hybrid"

interface shareParams {
    style: Number;             // 分享类型：0: url、1: 图片、2: 音频，3: 文件、4: 小程序 （android 只支持 0 1 3）
    title:String;              // 标题
    content:String;            // 内容
    url:String;                // 网页url、音视频url
    imgBase64: String;         // 图片base64编码     
    imgUrl: String;            // 图片地址
    origin:String;             // 打点来源标识
    fileExtension: String;     // 被分享文件的的扩展名
    shotScreen: number;        // 0不截屏,1截屏  style为1的前提下，分享的图片是否为截屏当前webview获取的。
    channelArray: number[];    // 数组内是number类型的数字 0: QQ; 1: QQ空间; 2: 微信; 3: 朋友圈; 4: 微博
    directChannel:number;      // 类型的数字.-1:不走直发渠道, 0: QQ; 1: QQ空间; 2: 微信; 3: 朋友圈; 4: 微博 <若不为-1则直接调起三方sdk分享>
    [propName: string]: any;
    // icon:           //小图标
}

const defaultParams: shareParams = {
    style: 0, 
    title:"",
    content: "",
    contentWeibo: "",
    url: "",
    imgBase64: "",     
    imgUrl: "",
    origin: "",
    fileExtension: "",
    shotScreen: 0,
    channelArray: [0, 1, 2, 3, 4],
    directChannel: -1
}
export function core_share( params: any, callback?: Function){
    return hybrid("core_share", params, callback);

}