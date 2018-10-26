// pages/test/test.js
// 封装的时候麻烦
let myPro = new Promise(function (resolve, reject) {
  // 在这个函数中 执行异步操作 
  // 根据异步调用的接口 触发 resolve(成功) 或者是 reject(失败)
  var reqTask = wx.request({
    url: 'https://douban.uieee.com/v2/movie/in_theaters',
    // url: 'https://superhahahamemedaniubi.cn',
    // data: {},
    header: {
      'content-type': 'json'
    },
    method: 'GET',
    // dataType: 'json',
    // responseType: 'text',
    success: (result) => {
      resolve(result);
    },
    fail: () => {
      reject('数据请求失败')
    },
    complete: () => {}
  });
})

myPro
.then((response) => {
  console.log('成功啦');
  console.log(response);
  // 返回一个 新的 promise对象即可
  return new Promise(function (resolve, reject) {
    var reqTask = wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      // url: 'https://superhahahamemedaniubi.cn',
      // data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      // dataType: 'json',
      // responseType: 'text',
      success: (result) => {
        resolve(result);
      },
      fail: () => {
        reject('数据请求失败')
      },
      complete: () => {}
    });
  })
})
.then(response2 => {
  console.log('成功了2');
  console.log(response2);
})

Page({

  /**
   * 页面的初始数据
   */
  data: {

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