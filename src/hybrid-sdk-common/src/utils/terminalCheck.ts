const ua = navigator.userAgent.toLowerCase();
const AIRCLASS = 'irclass' // 一课
const HOMEWORK = 'omework' // 作业帮
const IPHONE   = 'iphone';
const IPAD     = 'ipad';
const ANDROID  = 'android';
const WINDOWS  = 'windows';
const browser  = {
  android: ua.indexOf(ANDROID) > -1 || ua.indexOf('adr') > -1, // android终端
  iPhone: ua.indexOf(IPHONE) > -1, // 是否为iPhone或者QQHD浏览器
  iPad: ua.indexOf(IPAD) > -1 // 是否iPad
}

const terminalCheck = {
  // 产品类型
  isProduction() {
    if (ua.indexOf(AIRCLASS) > -1) {
      return AIRCLASS
    } else if (ua.indexOf(HOMEWORK) > -1) {
      return HOMEWORK
    } else {
      return 'unknow'
    }
  },
  getSystem() {
    if (browser.android) {
      return ANDROID
    } else {
      return IPHONE
    }
  },
  isInZybApp() {
    if (/homework/i.test(ua)
      && /(vcname)/i.test(ua)
      && /(token)/i.test(ua)
    ) {
      return true;
    }
    return false;
  },
  isInYikeApp() {
    if (/airclass/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInJzApp() {
    if (/parent_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInHxApp() {
    if (/flipped_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInKsApp() {
    if (/kousuan_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInKdApp() {
    if (/scancode_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInKidApp() {
    if (/kid/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInXieZiApp() {
    if (/yayaxiezi/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInSiWeiApp() {
    if (/yayasiwei/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInYuWenApp() {
    if (/yuwen/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInEXEApp() { // 学生端
    if (/a_irclass_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInCollegeApp() { // 大学搜题酱
    if (/college_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInChengrenjiaoyuApp() { // 不凡课堂
    if (/chengrenjiaoyu_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInMingShiKeApp() { // 名师课
    if (/mingshike_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInDaXueApp() { // 名师课
    if (/daxue_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInCommonApp() { // 支持通用action的app
    if (/jsBridge_vc/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInWeixin() {
    if (/MicroMessenger/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInApp() {
    if(browser.android || browser.iPhone || browser.iPad){
      var plat = this.getPlat();
      switch (plat) {
        case 'zybAPP': return true; break;
        case 'yikeAPP': return true; break;
        case 'jzAPP': return true; break;
        case 'hxAPP': return true; break;
        case 'ksAPP': return true; break;
        case 'kdAPP': return true; break;
        case 'kidAPP': return true; break;
        case 'xieziAPP': return true; break;
        case 'siweiAPP': return true; break;
        case 'yuwenAPP': return true; break;
        case 'collegeAPP': return true; break;
        case 'chengrenjiaoyuAPP': return true; break;
        case 'mingShiKeAPP': return true; break;
        case 'daxueAPP': return true; break;
        case 'commonAPP': return true; break;
        default: return false;
      }
    }
    return false
  },
  isInQQ() {
    if (/QQ/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInWeibo() {
    if (/WeiBo/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInIos() {
    if (/iPhone|iPod|ios/i.test(ua)) {
      return true;
    }
    return false;
  },
  isInXCX() {
    if (/XCX/i.test(ua)) {
      return true;
    }
    return false;
  },
  getPlat() {
    var self = this;
    var plat = 'PC';
    if (self.isInYikeApp()) {
      plat = 'yikeAPP';
    } else if (self.isInZybApp()) {
      plat = 'zybAPP';
    } else if (self.isInJzApp()) {
      plat = 'jzAPP';
    } else if (self.isInHxApp()) {
      plat = 'hxAPP';
    } else if (self.isInKsApp()) {
      plat = 'ksAPP';
    } else if (self.isInKdApp()) {
      plat = 'kdAPP';
    } else if (self.isInKidApp()) {
      plat = 'kidAPP';
    } else if (self.isInXieZiApp()) {
      plat = 'xieziAPP';
    } else if (self.isInSiWeiApp()) {
      plat = 'siweiAPP';
    } else if (self.isInYuWenApp()) {
      plat = 'yuwenAPP';
    } else if (self.isInCollegeApp()) {
      plat = 'collegeAPP';
    } else if (self.isInChengrenjiaoyuApp()) {
      plat = 'chengrenjiaoyuAPP';
    } else if (self.isInMingShiKeApp()) {
      plat = 'mingShiKeAPP';
    } else if (self.isInDaXueApp()) {
      plat = 'daxueAPP';
    } else if (self.isInCommonApp()) {
      plat = 'commonAPP';
    } else if (self.isInEXEApp()) {
      plat = 'EXE';
    } else if (self.isInWeixin()) {
      plat = 'Wechat';
    } else if (self.isInMobile()) {
      plat = 'WAP';
    } else if (self.isInXCX()) {
      plat = 'XCX';
    }

    return plat;
  },
  isAndroid: function () {
    return browser.android
  },
  isIPhone: function () {
    return browser.iPhone
  },
  isIPad: function () {
    return browser.iPad
  }
};

export {terminalCheck};
export default terminalCheck;
