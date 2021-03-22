// 生成guid
export function guid() {
  return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function resolveCallbackFactory(callback?: Function){
  return function(res: any){
    callback && callback(res);
    return Promise.resolve(res);
  };
} 
export function rejectCallbackFactory(callback?: Function){
  return function(res: any){
    callback && callback(res);
    return Promise.reject(res);
  };
} 

export function getMergedCallback(success: Function, fail: Function, callback: any): Function {
  let _callback: any = function (res: any = {}) {
    console.log(`!!!!!!action返回数据: `, res)
    let callbackData;
    // postMessage返回的数据结构 action 存在
    if(res.code == 200 || res.errcode == 200){
      if(res.data){
        callbackData = {...res.data, __callbackKey__: res.__callbackKey__};
        if(res.data.callResult === false){
          fail(callbackData);
        }else{
          success(callbackData);
        }
      }else{
        callbackData = res;
        success(res);
      }
    // postMessage返回的数据结构 action 不存在
    }else if(res.code == 404 || res.errcode == 404){
      if(res.data){ 
        callbackData = {...res.data, __callbackKey__: res.__callbackKey__};
        fail(callbackData);
      }else{ 
        callbackData = res;
        fail(callbackData);
      }

    // iframe 返回的数据结构或异常返回
    }else{
      callbackData = res;
      success(res);
    }

    callback(callbackData);
  };
  if(callback && callback['remove']){ _callback.remove = callback.remove};
  return _callback;
}

export const deepClone = (obj:any) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
};

export function removeCallback(callbackKey: string){
  if(callbackKey){
    let win: any = window;
    delete win[callbackKey];
    if(win[callbackKey]){
      win[callbackKey]
    }else if(win.__jsBridge && win.__jsBridge.callbackPool && win.__jsBridge.callbackPool[callbackKey]){
      delete win.__jsBridge.callbackPool[callbackKey];
    }
  }
}

function now(){
  if(performance && performance.timing && performance.timing.navigationStart && performance.now) {
    return Math.floor(performance.timing.navigationStart + performance.now());
  }else{
    return new Date().getTime()
  }
}

export class NativeProxyRequestHooker {
  win: any;
  vConsoleUid: string;
  startTime: number;
  endTime: number;

  constructor(){
    this.win = window;
  }
  
  preProxy(param:any, callbackKey:string) {
    const self = this;
    this.startTime = now();
    // 向vConsole上报端代理请求数据
    if(this.win.zybNativeProxyNetwork){
      this.vConsoleUid = this.win.zybNativeProxyNetwork.getUniqueID();
      this.win.zybNativeProxyNetwork.updateRequest(this.vConsoleUid, {
          readyState: 1,
          responseType: "json",
          startTime: this.startTime,
          status: 0,
      })
    }

    if(this.win.__nativeProxyRequests__){
      const payload = {
        id: self.startTime + '',
        timeline:{
          feBeforeActionInvoke: self.startTime, 
        },
        url:(param && param.type) ? param.url : '',
        method: (param && param.type) ? param.type.toLowerCase() : '',
        status: 0,
      }
      this.win.__nativeProxyRequests__[callbackKey] = payload
      console.log(`set request ${callbackKey} in preProxy`)
      console.log(payload)
      console.log(this.win.__nativeProxyRequests__)
    }
  }

  afterProxy(proxyPrams: any, proxyResponse: any, statusCode: number) {
    this.endTime = now()
    const self = this;

    let {url, getData} = this.queryToJson(proxyPrams.url)
    // 向vConsole上报端代理请求数据
    if(this.win.zybNativeProxyNetwork){
      
      this.win.zybNativeProxyNetwork.updateRequest(this.vConsoleUid, {
          costTime: this.endTime-this.startTime,
          endTime: this.endTime,
          header: proxyPrams.headers,
          getData: getData,
          postData: proxyPrams.params,
          method: ("p:" + proxyPrams.type).toUpperCase(),
          readyState: 4,
          response: proxyResponse,
          responseType: "json",
          startTime: this.startTime,
          status: 200,
          url: url,
      });
    }

    if(this.win.__nativeProxyRequests__){
      console.log(`win.__nativeProxyRequests__ true`)
      const callbackKey = proxyResponse.__callbackKey__
      console.log(proxyResponse)
      console.log(callbackKey)
      if(callbackKey){
        const payload = {
          id: callbackKey,
          timeline:{
            feBeforeActionInvoke: self.startTime, 
            feAfterActionCallback: self.endTime,
          },
          url:url,
          method: (proxyPrams.type + '').toLowerCase(),
          status: statusCode,
          header: proxyPrams.headers,
          getData: getData,
          postData: proxyPrams.params          
        }
        this.win.__nativeProxyRequests__[callbackKey] = payload
        console.log(`set request in afterProxy, and delete preProxy's insertion`)
        console.log(payload)
        console.log(this.win.__nativeProxyRequests__)
      }
       
    }
  }

  queryToJson(url:string) {
    let query: any = url.split('?'); // a.php?b=c&d=?e => ['a.php', 'b=c&d=', '?e']
    let path = query.shift(); // => ['b=c&d=', '?e']
    let getData: any = {};
    if (query.length > 0) {
      query = query.join('?'); // => 'b=c&d=?e'
      query = query.split('&'); // => ['b=c', 'd=?e']
      for (let q of query) {
        q = q.split('=');
        getData[ q[0] ] = decodeURIComponent(q[1]);
      }
    }

    return {
      url: path,
      getData
    }
  }
}


// export
export default {
  guid,
  getMergedCallback,
  deepClone,
  removeCallback,
  resolveCallbackFactory,
  rejectCallbackFactory,
  NativeProxyRequestHooker
}
