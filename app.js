const util = require('./utils/util.js');
App({
  onLaunch: function () {
    const init = wx.getStorageSync('init')
    if (init) {
      this.globalData.init = init
    }
    util.profile();
    // try {
    //   var oldToken = wx.getStorageSync('token')
    //   if (oldToken) {
    //     util.tokenLogin({
    //       token: oldToken
    //     }, token => {
    //       this.globalData.token = token
    //     })
    //   }
    // } catch (e) {

    // }
  },
  globalData: {
    init: false,
    user: {}
  }
})