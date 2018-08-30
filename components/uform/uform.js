// components/uform/uform.js
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showId: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: util.formatDate(new Date),
    user: null,
    phone: null,
    address: null,
    idcard: null,
    agree: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange: function (e) {
      this.setData({
        agree: e.detail.value[0] ? true : false
      })
    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindUserChange: function (e) {
      this.setData({
        user: e.detail.value
      })
    },
    bindIdCardChange: function (e) {
      this.setData({
        idcard: e.detail.value
      })
    },
    bindPhoneChange: function (e) {
      this.setData({
        phone: e.detail.value
      })
    },
    bindAddressChange: function (e) {
      this.setData({
        address: e.detail.value
      })
    },
    goHome: function () {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    },
    createOrder: function () {
      if (this.data.date && this.data.user && this.data.phone && this.data.address && ((this.data.showId && this.data.idcard) || (!this.data.showId && !this.data.idcard))) {
        util.postForm({
          date: this.data.date,
          user: this.data.user,
          phone: this.data.phone,
          address: this.data.address,
          idcard: this.data.idcard
        }, () => {
          wx.showToast({
            title: "申请提交成功",
            iocn: "success"
          })
        })
      } else {
        wx.showToast({
          title: '请完善信息后提交',
          icon: 'none'
        })
      }
    }
  }
})
