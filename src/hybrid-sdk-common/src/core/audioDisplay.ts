import {hybrid} from "./hybrid"

interface playAudioParams {
    playStatus: number;   // -1:停止（如果url为空，则停止所有的音频 否则停止当前的url） 0: 暂停（如果url为空，则暂停所有的音频 否则暂停当前的url） 1: 播放 
    url: String;          // 音频地址
    loop: number;         // 0: 单次播放 1: 循环播放
    interrupt: number;    // 0: 不打断正在播放的音频  1: 关闭所有正在播放的音乐 
    businessData?: any;
    [propName: string]: any;
}

const defaultParams: playAudioParams = {
    playStatus: 1,   
    url: '',
    loop: 0,
    interrupt: 1  
};

/**
 * 播放音频
 * @param params 
 */
export function core_audio(params: any): void {
    let _callback: any;
    let { data, success, error, complete, notFound, interrupt } = params;

    let _params: playAudioParams = {
        ...defaultParams,
        ...data
    };

    if(_params.srcName){
        _params.url = _params.srcName;
        delete _params.srcName;
    }

    _callback = function (res: any) {
        switch(+res.code){
            case 200: success && success(res); break;

            case 202: complete && complete(res); break;
            
            case 403: interrupt && interrupt(res); break;

            case 500: error && error(res); break;
            default: error(res);
        };

        res.code == 404 && notFound && notFound(res);
    };
    _callback.remove=function(){};
    hybrid('core_audioDisplay', _params, _callback)
}