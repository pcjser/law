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
  console.log(params);
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
// const register = (params, cb) => {
//   wx.request({
//     url: `${BASEURL}/auth/register`
//   })
// }

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
        console.log(res.header["Set-Cookie"])
        // cb(ses)
      } else {
        wx.showToast({
          title: "登录失败，请稍后再试",
          icon: "none"
        })
      }
      // console.log(res)

      // wx.setStorageSync("sessionid", res.header["Set-Cookie"])
      // const token = res.data || 'testToken';
      // wx.showToast({
      //   title: "登录成功",
      //   icon: "success"
      // })
      // try {
      //   wx.setStorageSync('token', token)
      // } catch (e) {}
      // cb(token)
    }
  })
}

// token登录
const tokenLogin = (params, cb) => {
  wx.request({
    url: 'https://47.105.60.162:8083/bes/login/mini/token',
    data: params,
    method: 'POST',
    success: res => {
      const token = res.data || 'testToken';
      try {
        wx.setStorageSync('token', token)
      } catch (e) { }
      cb(token)
    }
  })
}

// 用户订单列表
const rendList = (params, cb) => {
  cb([1, 2, 3])
}

// 订单详情
const orderDetail = (params, cb) => {
  cb({})
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  postForm: postForm,
  sendCode: sendCode,
  login: login,
  tokenLogin: tokenLogin,
  rendList: rendList,
  orderDetail: orderDetail
}