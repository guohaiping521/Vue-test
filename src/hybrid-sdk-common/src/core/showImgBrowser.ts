import {hybrid} from "./hybrid"

interface showWebPictureParams {
    imgUrl: String[];           // 图片地址列表
    index?: number;              // 默认展示图片的索引
    showDownloadBtn?: number;    // 是否显示 下载图片按钮 0 不显示
    businessData?: any;
}

/**
 * 图片浏览器
 * @param params 
 */
export function imgBrowser (params: showWebPictureParams): any {
    return hybrid("core_showImgBrowser", params);
}