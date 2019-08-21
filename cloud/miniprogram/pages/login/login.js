// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      wx.showToast({
        title: '登录成功！',
        success() {

          wx.navigateBack()
        }
      })
     
    }
  },
  onGetMobile(e){
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