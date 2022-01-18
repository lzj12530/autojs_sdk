const sdk = require('../../autojs_sdk/lib')

let btn = text('获取验证码').findOne(1000)
let num = 1
while (btn) {
    let n = num % 3
    sdk.click_item('获取验证码', [0,0])
    sleep(1000 + 15000 * n)
    num++
}