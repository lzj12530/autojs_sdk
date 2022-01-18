
function clickBtn() {
    click(789,1660,860,1696)
}

function main() {
    let i = 0
    while(++i < 100) {
        clickBtn()
        sleep(200)
    }
}
function timeFix() {
    // textContains('立即抢购').waitFor()
    let time = new Date().getTime()
    clickBtn()
    try{
        textContains('开抢').waitFor()
    } catch(e) {
        sleep(200)
        textContains('开抢').waitFor()
    }
    let cost = new Date().getTime() - time
    back()
    sleep(2000)
    return cost
}

// 计算网络延时  打开页面10次，计算平均值
function getAverageTime(max) {
    max = max || 10
    let total = 0

    for(let i = 1; i< max; i++) {
        total += timeFix()
    }
    return total / max
}

// 定时器， 定时器时间 需要手动修正

function startClock(handler,time_str,fix) {
    fix = fix || -1100
    let loadingTime = getAverageTime(6)
    console.log('get loading time,' , loadingTime)
    let delay = new Date(getDate() + ' ' + time_str).getTime() - new Date().getTime()
    console.log(getDate() + ' ' + time_str)
    console.log('clock delay', delay, 'ms')
    setTimeout(handler, delay - fix - loadingTime)
}
function getDate() {
    let date = new Date()
    return date.toDateString()
}

function getStandardTime(callback) {
    http.get('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp', {}, function(res, err) {
        let timestamp = res.body.json().data.t
        let fix = (new Date().getTime() - timestamp)
        console.log(fix)
        callback(fix)
    })
}


getStandardTime(function(standardTime) {
    console.log(fix)
}) 

startClock(main, '18:00:00', 200)
// 永辉