// // let lib = require('../autojs_sdk')
// let fix = [0,0]
// let isApp = launchApp('什么值得买')
// if (isApp) {
//     // lib.click_item('我的', fix)
//     // lib.click_item('签到领奖', fix)
//     text('我的').waitFor()
//     text('我的').click()
//     text('签到领奖').click()
//     id('iv_close').click()
// }

/**
 * 震动控制
 * @param {*} duration 震动时长
 * @param {*} times 震动次数
 * @param {*} delay 两次间的延迟
 */
 function vibrate(duration, times, delay) {
    if (delay == null) delay = 0
    if (times == null) times = 1
    for (i = 0; i < times; i++) {
        device.vibrate(duration);
        sleep(delay)
    }
}
vibrate(3500, 100)
dialogs.build({
    title: "你好",
    content: "请问你是笨蛋吗?",
    positive: "知道了"
}).on("positive", ()=>{
    device.cancelVibration()
}).show()