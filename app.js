const util = require('./utils/util.js');
App({
  onLaunch: function () {
    try {
      var oldToken = wx.getStorageSync('token')
      if (oldToken) {
        util.tokenLogin({
          token: oldToken
        }, token => {
          this.globalData.token = token
        })
      }
    } catch (e) {

    }
  },
  globalData: {
    token: null
  }
})