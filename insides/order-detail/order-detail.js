const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    const detail = JSON.parse(options.detail);
    this.setData({
      orderInfo: detail
    })
  },

  opOrder: function () {
    const state = this.data.orderInfo.state;
    const tx = this.data.orderInfo.tx;
    if (state == 0) {
      // 取消
      util.cancelOrder({
        tx
      }, () => {
        wx.showToast({
          title: '订单取消成功',
          icon: 'success'
        });
        this.setData({
          orderInfo: Object.assign({}, this.data.orderInfo, {
            state: 2
          })
        })
      })
    }
    if (state == 3) {
      // 删除
      util.deleteOrder({
        tx
      }, () => {
        wx.showToast({
          title: '订单删除成功',
          icon: 'success'
        });
        let timer = setTimeout(() => {
          clearTimeout(timer);
          wx.navigateBack();
        }, 500)
      })
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
  onShow: function (options) {

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