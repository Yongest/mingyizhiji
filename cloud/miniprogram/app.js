//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      openid: '',
      logged: false,
      avatarUrl: '',
      userInfo: ''

    };
    this.onGetOpenid();
  },
  onGetOpenid: function () {
    // 调用云函数
    let me = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: data => {

        me.globalData.openid = data.result.openid
        // 
        const db = wx.cloud.database()
        db.collection('users').where({
          _openid: data.result.openid,

        })
          .get({
            success: function (res) {
              // res.data 是包含以上定义的两条记录的数组

              if (!res.data.length) {
                //  存储用户登录时间到数据库，openid 会自动添加上
               
                db.collection('users').add({
                  data: {
                    "login_time": [new Date()]
                  }, success(data) {
                    console.log(data,666)
                    me.globalData.user_id = data._id
                  }
                })
              } else {
                console.log(res.data, 222)
                me.globalData.user_id = res.data[0]._id

              }

            },
            fail(e) {
              console.log(e)
            }
          })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }
})
