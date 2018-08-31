const util = require('../../utils/util.js');
const app = getApp();
let timer = null;

// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionid: '',
    init: app.globalData.init,
    showLogin: false,
    phone: '',
    code: '',
    name: '',
    recommend: '',
    time: 60,
    interval: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  goLogin: function () {
    this.setData({
      showLogin: true
    })
  },
  closeLogin: function () {
    this.setData({
      showLogin: false
    })
    this.stopTimer();
  },
  sendCode: function () {
    if (this.data.interval) {
      return false;
    }
    if (/^1\d{10}$/.test(this.data.phone)) {
      util.sendCode({
        mobile: this.data.phone
      }, () => {
        wx.showToast({
          title: "验证码发送成功",
          icon: "success"
        })
        this.startTimer();
      })
    } else {
      wx.showToast({
        title: "请输入正确的手机号码",
        icon: "none"
      })
    }
  },
  startTimer: function (e) {
    this.setData({
      interval: true
    })
    timer = setInterval(() => {
      if (this.data.time > 1) {
        this.setData({
          time: this.data.time - 1
        })
      } else {
        this.stopTimer();
      }
    }, 1000)
  },
  stopTimer: function () {
    clearInterval(timer);
    timer = null;
    this.setData({
      interval: false,
      time: 60
    })
  },
  bindPhoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindCodeChange: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindNameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindRecommendChange: function (e) {
    this.setData({
      recommend: e.detail.value
    })
  },
  login: function () {
    const app = getApp();
    const init = app.globalData.init;
    if (init) {
      if (this.data.phone && this.data.code) {
        util.login({
          mobile: this.data.phone,
          code: this.data.code
        }, sessionid => {
          this.setData({
            sessionid: sessionid
          })
          this.closeLogin();
        })
      } else {
        wx.showToast({
          title: "请完善信息后登录",
          icon: "none"
        })
      }
    } else {
      if (this.data.phone && this.data.code && this.data.name) {
        util.register({
          mobile: this.data.phone,
          code: this.data.code,
          realname: this.data.name,
          referrer: this.data.recommend
        }, sessionid => {
          this.setData({
            sessionid: sessionid,
            init: true
          })
          this.closeLogin();
        })
      } else {
        wx.showToast({
          title: "请完善信息后注册",
          icon: "none"
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const app = getApp();
    const sessionid = wx.getStorageSync('sessionid')
    sessionid && this.setData({
      sessionid
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})