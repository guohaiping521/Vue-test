import {hybrid} from "./hybrid"

interface downloaderParams {
    url: String;  // 资源路径
    type: number;  // 0 other， 1 图片， 2 音频， 3 视频
    base64?: String;  // type为1时，图片的base64编码
    businessData?: any;
}

/**
 * 下载资源
 * @param params 
 */
export function downloader(params: downloaderParams, callback?: Function): any {
    return hybrid("core_downloader", params, callback);
}