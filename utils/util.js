const BASEURL = 'https://api.lawbing.com.cn'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 提交申请表单
const postForm = (params, cb) => {
  const sessionid = wx.getStorageSync("sessionid");
  let header = {};
  if (sessionid) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': sessionid
    };
  } else {
    wx.showToast({
      title: '请先去个人中心登录',
      icon: 'none'
    })
    return false;
  }
  wx.request({
    url: `${BASEURL}/order/create`,
    data: params,
    header,
    method: 'POST',
    success: res => {
      const { data: { success } } = res;
      if (success) {
        cb()
      } else {
        wx.showToast({
          title: "信息提交失败，请稍后再试",
          icon: "none"
        })
      }
    }
  })
}

// 发送验证码
const sendCode = (params, cb) => {
  wx.request({
    url: `${BASEURL}/auth/sms/send`,
    data: params,
    method: 'POST',
    success: res => {
      const { data: { success } } = res;
      if (success) {
        cb()
      } else {
        wx.showToast({
          title: "验证码发送失败，请稍后再试",
          icon: "none"
        })
      }
    }
  })
}

// 用户注册
const register = (params, cb) => {
  wx.request({
    url: `${BASEURL}/auth/register`,
    data: params,
    method: 'POST',
    success: res => {
      const { data: { success, payload } } = res;
      if (success) {
        wx.showToast({
          title: "注册成功",
          icon: "success"
        })
        // console.log(res.header["Set-Cookie"])
        wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        wx.setStorageSync("init", true)
        const app = getApp();
        app.globalData.init = true;
        app.globalData.user = {
          mobile: payload.mobile,
          realname: payload.realname,
          referrer: payload.referrer
        }
        cb(res.header["Set-Cookie"])
      } else {
        wx.showToast({
          title: "注册失败，请稍后再试",
          icon: "none"
        })
      }
    }
  })
}

// 用户登录
const login = (params, cb) => {
  wx.request({
    url: `${BASEURL}/auth/login`,
    data: params,
    method: 'POST',
    success: res => {
      const { data: { success, payload } } = res;
      if (success) {
        wx.showToast({
          title: "登录成功",
          icon: "success"
        })
        // console.log(res.header["Set-Cookie"])
        const app = getApp();
        app.globalData.user = {
          mobile: payload.mobile,
          realname: payload.realname,
          referrer: payload.referrer
        }
        wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        cb(res.header["Set-Cookie"])
      } else {
        wx.showToast({
          title: "登录失败，请稍后再试",
          icon: "none"
        })
      }
    }
  })
}

// 获取用户信息

const profile = () => {
  const sessionid = wx.getStorageSync("sessionid");
  let header = {};
  if (sessionid) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': sessionid
    };
  }
  wx.request({
    url: `${BASEURL}/user/profile`,
    method: 'POST',
    header,
    success: res => {
      const { data: { success, payload } } = res;
      if (success) {
        const app = getApp();
        app.globalData.user = {
          mobile: payload.mobile,
          realname: payload.realname,
          referrer: payload.referrer
        }
      } else {
        wx.removeStorageSync('sessionid')
      }
    }
  })
}

// 用户订单列表
const rendList = (params, cb) => {
  const sessionid = wx.getStorageSync("sessionid");
  let header = {};
  if (sessionid) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': sessionid
    };
  }
  wx.request({
    url: `${BASEURL}/order/query`,
    method: 'POST',
    header,
    data: params,
    success: res => {
      const { data: { success, payload } } = res;
      if (success) {
        const list = payload.map(data => {
          const newData = Object.assign({}, data, {
            appointment: data.appointment.split("T")[0]
          })
          return Object.assign({}, newData, {
            detail: JSON.stringify(newData)
          })
        })
        cb(list)
      }
    }
  })
}

// 取消订单
const cancelOrder = (params, cb) => {
  const sessionid = wx.getStorageSync("sessionid");
  let header = {};
  if (sessionid) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': sessionid
    };
  }
  wx.request({
    url: `${BASEURL}/order/cancel`,
    method: 'POST',
    header,
    data: params,
    success: res => {
      const { data: { success } } = res;
      if (success) {
        cb()
      }
    }
  })
}

// 删除订单
const deleteOrder = (params, cb) => {
  const sessionid = wx.getStorageSync("sessionid");
  let header = {};
  if (sessionid) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': sessionid
    };
  }
  wx.request({
    url: `${BASEURL}/order/delete`,
    method: 'POST',
    header,
    data: params,
    success: res => {
      const { data: { success } } = res;
      if (success) {
        cb()
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  postForm: postForm,
  sendCode: sendCode,
  login: login,
  register: register,
  profile: profile,
  rendList: rendList,
  cancelOrder: cancelOrder,
  deleteOrder: deleteOrder
}