// let lib = require('../autojs_sdk')
let fix = [0,0]
let isApp = launchApp('什么值得买')
if (isApp) {
    // lib.click_item('我的', fix)
    // lib.click_item('签到领奖', fix)
    text('我的').waitFor()
    text('我的').click()
    text('签到领奖').click()
    id('iv_close').click()
}