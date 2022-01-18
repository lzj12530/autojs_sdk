let btnText = '领取'

// 
function getDate() {
    let date = new Date()
    return date.toDateString()
}
// 定时
function startClock(handler,time_str,fix) {
    
    fix = fix || -1100
    let loadingTime = 0
    console.log('get loading time,' , loadingTime)
    let delay = new Date(getDate() + ' ' + time_str).getTime() - new Date().getTime()
    console.log(getDate() + ' ' + time_str)
    console.log('clock delay', delay, 'ms')
    setTimeout(handler, delay - fix - loadingTime)
}

// 领取按钮
function waitAndClick(btnText) {
    console.log('开始等待标志: ', btnText)
    textContains(btnText).waitFor()
    console.log('等待结束: ')
    let btn = textContains(btnText).findOne(1000)
    console.log('按钮结果: ', !!btn)
    if (btn) btn.click()
}

// 定时
function main() {
    // 切换标签
    let tabBtn = textContains('即将开抢').findOne(100)
    console.log(tabBtn)
    if (tabBtn) tabBtn.click()
    // 监听领取
    waitAndClick(btnText)
}

startClock(main, '15:00:00', 100)