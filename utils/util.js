const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 回调地狱
 * 回调函数一直嵌套
 * 一件事必须等到上一件事干完才可以干
 * 动画1播放完毕播放动画2,2完了,播放3
 * ajax中也有
 * ajax数据新增成功之后,重新获取本页数据
 * 
 */
// $('xx').animate({
//   width: 100
// }, function () {
//   $('xx').animate({
//     height: 100
//   }, function () {
//     $('xx').animate({
//       width: 100
//     }, function () {
//       $('xx').animate({
//         width: 100
//       }, function () {})

//     })

//   })
// })

// $.ajax({
//   url: "xxx",
//   success: function () {
//     $.ajax({
//       success: function () {
//         $.ajax({
//           success: function () {
//             $.ajax({
//               success: function () {
//                 $.ajax({
//                   success: function () {
//                     $.ajax({
//                       success: function () {}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   }
// })


// 回调地狱解决方案
/**
 * 目前比较主流的是 promise
 * 很多常规的框架已经帮我们整合好了
 * 异步操作使用 .then() 来回调 
 * 如果需要自己封装 需要实际使用Promise对象来包装 异步的操作
 * 可以吧 原本的回调地狱->变为 链式调用
 * $(xxxx)
 * .then()
 * .then()
 * .then()
 * 
 * 还有一个对Promise的语法糖
 * Async Await(对Promise的简写)
 *  */

/**
 * Promise基本使用
 * 我们需要使用实例化出来的Promise对象去包装一个异步操作
 * 参数是一个函数,必须有2个形参
 * 形参也是函数
 * 实例化出来的Promise对象 要执行内部的代码 需要调用他的 .then()
 */
let myPro = new Promise(function (resolve, reject) {
  // 在这个函数中 执行异步操作 
  // 根据异步调用的接口 触发 resolve(成功) 或者是 reject(失败)
  var reqTask = wx.request({
    url: 'https://douban.uieee.com/v2/movie/in_theaters',
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
myPro.then((response) => {
  console.log(response);
})


module.exports = {
  formatTime: formatTime
}