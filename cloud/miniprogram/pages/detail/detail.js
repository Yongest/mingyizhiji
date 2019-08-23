// miniprogram/pages/home/home.js
// 1. 获取数据库引用
const db = wx.cloud.database();
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    book_id: '',
    content: '',
    commentsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loadding...',
    })



   
    const me = this;
    me.setData({
      book_id: options.book_id
    })
    
//  获取书详情
    this.bookDetail(options.book_id)
    
    // 获取评论列表
    this.getCommentList()

    this.addComment()
  },
  bookDetail(book_id){
    let me =  this;
    db.collection('books').where({
      _id: book_id
    }).get({
      success: function (res) {
        me.setData({
          book: res.data[0]
        })
      },
      fail: function (err) {
        console.log(err)
      }, complete() {
        wx.hideLoading();
      }
    })
  },

  addComment() {
    if (app.globalData.user_id) {
      if (this.data.content) {
        db.collection('comments').add({
          data:{
            book_id: this.data.book_id,
            content: this.data.content,
            likes_count: 0,
            reply_count: 0,
            time: new Date(),
            top_comment: [],
            user_id: app.globalData.user_id,
            user_info: app.globalData.userInfo
          },
          success(data){
            wx.showToast({
              title: '评论成功！',
            })
          }
        });
      }

    } else {
      wx.navigateTo({
        url: 'pages/login/login',
      })
    }
  },
  getCommentList() {
    db.collection('comments').where({
      book_id:this.data.book_id
    }).limit(20)
      .get()
      
      
      .then(res=>{
        console.log(res,33333)
      })



    // db.collection('comments').where({
    //   book_id: this.data.book_id
    // }).skip(0)       
    //   .limit(10) 
    //   .get()
    //   .then(res => {
    //     console.log(res.data,444)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
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