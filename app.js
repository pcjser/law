const util = require('./utils/util.js');
App({
  onLaunch: function () {
    const init = wx.getStorageSync('init')
    if (init) {
      this.globalData.init = init
    }
    util.profile();
  },
  globalData: {
    init: false,
    user: {}
  }
})

// 1.用户输入验证
// 2.登录状态判定