import {hybrid} from "./hybrid"

interface showDialogParams {
    title: String;         // 标题
    description: String;   // 内容描述
    neutralText?: String;   // 一个按钮时候的文案,如果为空,显示两个按钮
    negativeText?: String;  // 两个按钮的时候,取消的文案
    positiveText?: String;  // 两个按钮的时候,确定的文案
    cancelOutside?: number; // 点击区域外是否隐藏。1:可隐藏;非1:不可隐藏
}

/**
 * 展示提示框
 * @param params 
 */
export function core_showDialog(params: showDialogParams, callback?: Function): any {
   return hybrid("core_showDialog", params, callback);
}