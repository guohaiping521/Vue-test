import {hybrid} from "./hybrid"

interface copyToClipboardParams {
    content: String;  // 要复制到剪贴板的内容
    hint: String; // 复制成功的提示文案
    businessData?: any;
}

/**
 * 复制文案到剪贴板
 * @param params 
 */
export function copyText(params: copyToClipboardParams): Promise<any> {
    return hybrid("core_copyToClipboard", params);
}