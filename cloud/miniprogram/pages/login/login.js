// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '授权登录后，才能反馈！',
      icon:'none',
      duration: 4000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onGetUserInfo: function (e) {


    if (!app.globalData.logged && e.detail.userInfo) {
      app.globalData.logged = true;
      app.globalData.headimg = e.detail.userInfo.avatarUrl;
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        headimg: e.detail.userInfo.avatarUrl
      })
      // console.log(e)
      const db = wx.cloud.database();
      if (app.globalData.user_id) {
        db.collection('users').doc(app.globalData.user_id)
          .update({
            data: {
              user_info: e.detail.userInfo
            },
            success: function (data) {

            }
          })
      }

      wx.showToast({
        title: '登录成功！',
        success() {

          setTimeout(function(){
            wx.navigateBack()
          },3000)
        }
      })

    }
  },
  onGetMobile(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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