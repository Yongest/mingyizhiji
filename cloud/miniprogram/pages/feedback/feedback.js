// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:'',
   content:'',
   img:"",
   head_img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img: app.globalData.fileID ||''
    })

    if (!app.globalData.logged){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  feedback:function(){
    let me = this;
     if(this.data.title.trim() && this.data.content.trim()){
       const db = wx.cloud.database()

       db.collection('feedback').add({
         // data 字段表示需新增的 JSON 数据
         data: {
     
           title: me.data.title,
            content:me.data.content,
            img:me.data.img,
           user_id: app.globalData.user_id,   // 用户id
           head_img: app.globalData.headimg
         },
         success: function (res) {
           // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          wx.showToast({
            title: '感谢您的宝贵建议，明一祝您身体健康，生活愉快！',
            icon:"none",
            duration:5000
          })

          me.setData({
            title:'',
            img:'',
            content:''
          })
           app.globalData.fileID = ''
         },
         fail: console.error
       })
     }else {
        wx.showToast({
          title: '标题与内容不能为空',
          icon:"none"
        })
     }
  },
  changevalue(e){
  
    let value = e.detail.value
    if(e.target.id==='title'){
      this.setData({
        title: value
      })
    }else {
      this.setData({
        content: value
      })
    }
 
   
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    let me =this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath ='upload/'+ Math.random() + (+new Date()) + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
           wx.showToast({
             title: '图片上传成功！',
             duration:3000
           })

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            me.setData({
              img: res.fileID
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
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