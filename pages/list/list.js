// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前显示的列表
    tag: '',
    // 起始索引
    startIndex: 0,
    // 个数
    count: 9,
    // 数据数组
    movieList: [],
    // 总条数
    total: 0,
    // 列表名
    listName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 带着数据过来了
    // console.log(options);
    this.setData({
      tag: options.tag
    })
    // 根据tag设置不同的 头部
    switch (this.data.tag) {
      case 'in_theaters':
        this.setData({
          listName: '影院热映'
        })
        break;
      case 'top250':
        this.setData({
          listName: '吐血推荐'
        })
        break;
      case 'coming_soon':
        this.setData({
          listName: '即将上映'
        })
        break;
    }
    // console.log(this.tag);
    // console.log(this.data.tag);
    // 获取当前这个分类的列表数据
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/' + this.data.tag,
      // 接口定义的时候必须要这样设置 接口是后端写的,
      data: {
        // 使用自己数据中的起始索引 跟个数
        start: this.data.startIndex,
        count: this.data.count
      },
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        // console.log(result);
        // 计算星星
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
        // 赋值
        this.setData({
          // 记录电影数据
          movieList: result.data.subjects,
          // 记录总数
          total: result.data.total
        })
      }
    });
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
    // 重新获取数据
    // 重置data中的数据 从0开始
    this.setData({
      startIndex: 0,
      movieList: []
    });

    // 调用接口获取数据
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/' + this.data.tag,
      // 接口定义的时候必须要这样设置 接口是后端写的,
      data: {
        // 使用自己数据中的起始索引 跟个数
        start: this.data.startIndex,
        count: this.data.count
      },
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        // console.log(result);
        // 计算星星
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
        // 赋值
        this.setData({
          // 记录电影数据
          movieList: result.data.subjects,
          // 记录总数
          total: result.data.total
        })
        // 关闭loading动画
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // 判断是否越界
    if(this.data.startIndex>this.data.total){
      // 后面木有了
      wx.showToast({
        title: '哥们,别点了,后面木有啦',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return;
    }

    // 开启loading动画
    wx.showLoading({
      title:'正在玩命加载中' ,
    });

    // 累加个数
    // 老索引
    let oldIndex = this.data.startIndex;
    // 新起始索引
    let newIndex = oldIndex + this.data.count;
    // 设置到 data中
    this.setData({
      startIndex: newIndex
    })
    // 获取数据
    // 调用接口获取数据
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/' + this.data.tag,
      // 接口定义的时候必须要这样设置 接口是后端写的,
      data: {
        // 使用自己数据中的起始索引 跟个数
        start: this.data.startIndex,
        count: this.data.count
      },
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        // console.log(result);
        // 计算星星
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

        // 保存老数组
        let oldArr = this.data.movieList;
        // 原数组累加 把数组 当做一项 加到了老数组中
        oldArr = oldArr.concat(result.data.subjects)
        // 赋值
        this.setData({
          // 记录电影数据 用新数据 覆盖了 movieList
          movieList: oldArr,
          // 记录总数
          total: result.data.total
        })
        // 关闭loading动画
        wx.hideLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})