import {hybrid} from "./hybrid"

/**
 * 吊起调试页面
 */
export function showDebuger(): any {
    return hybrid("core_showDebuger");
}