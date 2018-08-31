const util = require('../../utils/util');
const app = getApp();
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'company',
    dataList: null,
    user: app.globalData.user
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单'
    })
  },
  changeType: function (e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      type: type
    })
    this.rendList();
  },
  rendList: function (e) {
    const type = this.data.type;
    util.rendList({
      type
    }, list => {
      this.setData({
        dataList: list
      })
    })
  },
  login: function (e) {
    wx.switchTab({
      url: '/pages/personal/personal'
    })
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
    this.setData({
      user: app.globalData.user
    })
    this.rendList();
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