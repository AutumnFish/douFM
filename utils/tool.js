/**
 * 自己封装模块
 * common.js的语法
 * 
 */

// 功能逻辑 封装 promise对象
// 传递具体的参数
// 参数是一个对象 属性名跟下面的属性名一致即可
function myPro(options) {
    return new Promise(function (resolve, reject) {
        // 异步操作
        wx.request({
            url: options.url || '',
            data: options.data || {},
            header: options.header || {
                'content-type': 'json'
            }, // 设置为json的目的是为了获取豆瓣数据
            method: options.method || 'GET',
            dataType: options.dataType || 'json',
            responseType: options.responseType || 'text',
            success: (result) => {
                // 成功回调
                resolve(result)
            },
            fail: () => {
                // 失败回调
                reject('数据获取失败');
            },
            complete: () => {}
        });
    })
}

// 暴露出去
module.exports = {
    // es6的快速赋值 等同于 myPro:myPro
    myPro,
    baseUrl:'https://douban.uieee.com/v2'
}