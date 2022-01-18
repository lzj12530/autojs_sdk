
device.keepScreenOn(7200* 1000)
runtime.requestPermissions(["device"]);
let defaultTimeout = 60 * 1000
// 关键字 抢购结束
// while(true) {
//     textContains('茅台酒').waitFor()
//     let item = textContains('茅台酒').findOne()
//     console.log(item)
//     device.vibrate(defaultTimeout)
//     sleep(defaultTimeout)
// }
let times = 0
let timesBound = 60
function getSleepTime() {
    if (times < timesBound) {
        times++
    } else {
        times = 1
    }
    console.log('times bound ', times)
    return times * 1000
}
// 真快乐 检查
let end = false
while(!end) {
    try {
        let item = textContains('抢购结束').findOne(1000)
        if (!item) {
            let btn = textContains('飞天53').findOne()
            if (btn) {
                btn.click()
                sleep(getSleepTime())
                back()
            }
        } else {
            console.log(item)
            end = true
            device.vibrate(defaultTimeout)
            sleep(defaultTimeout)
        }
    } catch (error) {
        
    }
}