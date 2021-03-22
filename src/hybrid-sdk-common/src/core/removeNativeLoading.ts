import { hybrid } from "./hybrid"
import { canUseCommon } from "../utils/system";
import terminalCheck from "../utils/terminalCheck";

/**
 * 关闭进入页面后系统的 loading
 */
export function removeNativeLoading(){
    return hybrid("core_removeLoading");
}

// 进入页面3秒后如果系统还没有关闭loading，hybrid-sdk做陡地来关闭loading
terminalCheck.isInApp() && canUseCommon() && setTimeout(()=>{
    removeNativeLoading();
},3000);
