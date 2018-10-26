// pages/detail/detail.js
// 导入工具函数
let tool = require('../../utils/tool');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影id
    id: '',
    // 电影数据
    movieInfo: {},
    // 简短的影评
    cutSummary: ''
  },
  // 显示更多
  more() {
    // 修改显示的文本即可
    // 微信小程序 早期 this.xxx = xx
    // 后期 this.data.xx = xxx
    // 现在 只能 this.setData
    // this.data.cutSummary = this.data.summary;
    this.setData({
      cutSummary: this.data.movieInfo.summary
    })
  },
  // 缩短内容
  cut() {
    // 缩短即可
    this.setData({
      cutSummary: this.data.movieInfo.summary.substr(0, 65) + '...'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收数据
    // console.log(options);
    this.setData({
      id: options.id
    })
    // 调用接口 获取数据
    tool.myPro({
      url: tool.baseUrl + `/movie/subject/${this.data.id}`
    }).then(result => {
      // 计算星星
      // 根据当前电影的评分计算星星
      let starNum = result.data.rating.average / 2;

      // 获取整数位
      let intNum = Math.floor(starNum);
      console.log(intNum);
      // 获取小数位
      let floatNum = starNum - intNum;
      console.log(floatNum);

      // 根据startNum计算出星星数组
      // 8.1 / 2 = 4.05 ->4.5
      // 5.6 / 2 = 2.8 -> 3
      // 6.8 / 2 = 3.4 ->3.5

      // 设置一个数组 长度为 5
      // 4.05 -> 4
      // 星星约定 实星 1 空星 2 半星 3
      let starArr = [];
      for (let i = 0; i < 5; i++) {
        // 整数位都是满的星星
        if (i < intNum) {
          starArr[i] = 1;
        } else if (i == intNum) {
          // console.log('小数位比较');
          // 比.5小
          if (floatNum < .5) {
            // 一半
            starArr[i] = 3
          } else {
            starArr[i] = 1;
          }
          // 比 .5 大
        } else {
          // 一定是空星
          starArr[i] = 2;
        }
      }
      // console.log(starArr);
      result.data.starArr = starArr;
      // 截取文本 准备一个简短的 剧情简介
      // result.data.cutSummary = result.data.summary.substr(0, 65) + '...';
      this.setData({
        movieInfo: result.data,
        // 简短的影评 直接新增一个字段即可
        cutSummary: result.data.summary.substr(0, 65) + '...'
      })
    })
    // 渲染页面
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