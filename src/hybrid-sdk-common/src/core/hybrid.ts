import { postMessagePromiseHybrid } from "../utils/hybrid"
import { iframePromiseHybrid } from "../utils/iframeHybrid"

interface HybridParams {
    action: string;
    params?: {[propName:string]: any};
    callback?: Function;
}


export function hybrid(action: string, params?: any, callback?: Function): Promise<any> {
    if (params && Object.prototype.toString.call(params) === '[object Function]') {
        callback = params
        params = {}
    }
    return bridge({action, params, callback});
}

export function bridge(options: HybridParams): Promise<any>  {
    console.log(`!!!!!!你调用了:` ,options)

    const {action, params, callback} = options;

    if(action.indexOf('core_') === 0){
        return postMessagePromiseHybrid(action, params, callback);
    }else{
        return iframePromiseHybrid(action, params, callback);
    }
}