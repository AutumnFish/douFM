// pages/index/index.js
// 导入模块 common.js
let tool = require('../../utils/tool');
console.log(tool);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热映电影
    hotMovie: [],
    // 即将上映
    comingMovie: [],
    // 推荐电影
    goodMovie: []
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取网络数据 渲染到页面上
   */
  onLoad: function (options) {
    // 热映 in_theaters
    // wx.request({
    //   // url: 'https://www.autumnfish.cn/v2/movie/in_theaters',
    //   url: 'https://douban.uieee.com/v2/movie/in_theaters',
    //   header: {
    //     'content-type': 'json'
    //   },
    //   method: 'GET',
    //   success: (result) => {
    //     // console.log(result)
    //     // 处理数据 额外的增加一个 星星个数字段
    //     result.data.subjects.forEach(v => {
    //       // 为V增加一个字段 纯数字无法循环
    //       // 必须弄成数组
    //       // v.startNum = Math.floor(v.rating.stars/10);
    //       v.startArr = [];
    //       // 计算星星个数
    //       let starNum = Math.floor(v.rating.stars / 10);
    //       // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
    //       // index 从0开始  0 , 1 ,2 ,3,4
    //       // 假设星星个数为 4
    //       for (let i = 0; i < 5; i++) {
    //         v.startArr[i] = starNum > i ? 1 : 0
    //       }
    //     })
    //     this.setData({
    //       hotMovie: result.data.subjects
    //     })
    //   }
    // });

    // 获取即将上映电影 coming_soon
    // wx.request({
    //   url: 'https://douban.uieee.com/v2/movie/coming_soon',
    //   header: {
    //     'content-type': 'json'
    //   },
    //   method: 'GET',
    //   success: (result) => {
    //     // 处理数据 额外的增加一个 星星个数字段
    //     result.data.subjects.forEach(v => {
    //       // 为V增加一个字段 纯数字无法循环
    //       // 必须弄成数组
    //       // v.startNum = Math.floor(v.rating.stars/10);
    //       v.startArr = [];
    //       // 计算星星个数
    //       let starNum = Math.floor(v.rating.stars / 10);
    //       // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
    //       // index 从0开始  0 , 1 ,2 ,3,4
    //       // 假设星星个数为 4
    //       for (let i = 0; i < 5; i++) {
    //         v.startArr[i] = starNum > i ? 1 : 0
    //       }
    //     })


    //     this.setData({
    //       comingMovie: result.data.subjects
    //     })
    //   }
    // });
    // 获取即将上映电影 top250
    // wx.request({
    //   url: 'https://douban.uieee.com/v2/movie/top250',
    //   header: {
    //     'content-type': 'json'
    //   },
    //   method: 'GET',
    //   success: (result) => {
    //     // 处理数据 额外的增加一个 星星个数字段
    //     result.data.subjects.forEach(v => {
    //       // 为V增加一个字段 纯数字无法循环
    //       // 必须弄成数组
    //       // v.startNum = Math.floor(v.rating.stars/10);
    //       v.startArr = [];
    //       // 计算星星个数
    //       let starNum = Math.floor(v.rating.stars / 10);
    //       // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
    //       // index 从0开始  0 , 1 ,2 ,3,4
    //       // 假设星星个数为 4
    //       for (let i = 0; i < 5; i++) {
    //         v.startArr[i] = starNum > i ? 1 : 0
    //       }
    //     })


    //     this.setData({
    //       goodMovie: result.data.subjects
    //     })
    //   }
    // });

    // 使用 promise来替换 request
    tool.myPro({
        url: 'https://douban.uieee.com/v2/movie/in_theaters',
      })
      // 获取 1的数据
      .then(result => {
        // console.log(response);
        result.data.subjects.forEach(v => {
          // 为V增加一个字段 纯数字无法循环
          // 必须弄成数组
          // v.startNum = Math.floor(v.rating.stars/10);
          v.startArr = [];
          // 计算星星个数
          let starNum = Math.floor(v.rating.stars / 10);
          // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
          // index 从0开始  0 , 1 ,2 ,3,4
          // 假设星星个数为 4
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        })
        this.setData({
          hotMovie: result.data.subjects
        })

        // 返回一个 新的 promise对象即可
        return tool.myPro({
          url: 'https://douban.uieee.com/v2/movie/coming_soon'
        })
      })
      // 获取 2的数据
      .then(result => {
        // 处理数据 额外的增加一个 星星个数字段
        result.data.subjects.forEach(v => {
          // 为V增加一个字段 纯数字无法循环
          // 必须弄成数组
          // v.startNum = Math.floor(v.rating.stars/10);
          v.startArr = [];
          // 计算星星个数
          let starNum = Math.floor(v.rating.stars / 10);
          // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
          // index 从0开始  0 , 1 ,2 ,3,4
          // 假设星星个数为 4
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        })
        this.setData({
          comingMovie: result.data.subjects
        })
        // 返回一个 新的 promise对象
        return tool.myPro({
          url: 'https://douban.uieee.com/v2/movie/top250'
        })
      })
      // 获取 3的数据
      .then(result => {
        // 处理数据 额外的增加一个 星星个数字段
        result.data.subjects.forEach(v => {
          // 为V增加一个字段 纯数字无法循环
          // 必须弄成数组
          // v.startNum = Math.floor(v.rating.stars/10);
          v.startArr = [];
          // 计算星星个数
          let starNum = Math.floor(v.rating.stars / 10);
          // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
          // index 从0开始  0 , 1 ,2 ,3,4
          // 假设星星个数为 4
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        })


        this.setData({
          goodMovie: result.data.subjects
        })
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