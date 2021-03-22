import {hybrid} from "./hybrid"

interface fetchImgParams {
    type: number;  // 拍照页面类型， 0：actionSheet， 1：调起相机， 2：打开相册
    businessData?: any;
}

/**
 * 图片浏览器
 * @param params 
 */
export function fetchImg(params: fetchImgParams, callback?: Function): any {
    return hybrid("core_fetchImg", params, callback);
}