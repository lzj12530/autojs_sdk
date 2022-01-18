function mainLoop() {
    console.log('enter page loop', new Date())
    let p = false
    while(!p) {
        let btn
        try {
            btn = text('预约抢购').findOne(500)
            console.log('find btn', new Date())
        } catch(e) {
            console.log('no btn',e)
            // sleep(500)
        }
        if (btn) {
            console.log('enter click loop', new Date())
            btn.click()
            // 等待排队
            let p2 = false
            while(!p2) {
                sleep(500)
                if (p2 = textContains('没有抢到').findOne(1000)) {
                    text('好的').findOne().click()
                }
                if (text('确认下单').exists()) {
                    // 提交界面
                    p2 = true
                    p = true
                    text('确认下单').findOne(1000).click()
                }
            }
        }
        console.log('wait loop')
        sleep(200)
    }    
}

function main() {
    text('立即抢购').findOne().click();
    mainLoop()
}
function timeFix() {
    // textContains('立即抢购').waitFor()
    let time = new Date().getTime()
    text('立即抢购').findOne().click();
    try{
        textContains('开始抢购').waitFor()
    } catch(e) {
        sleep(200)
        textContains('开始抢购').waitFor()
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
    console.log('start clock, get loading time')
    fix = fix || -1100
    let loadingTime = getAverageTime(6)
    console.log('got a loading time,' , loadingTime)
    let delay = new Date(getDate() + ' ' + time_str).getTime() - new Date().getTime()
    console.log(getDate() + ' ' + time_str)
    console.log('set clock delay', delay, 'ms')
    setTimeout(handler, delay - fix - loadingTime)
}
function getDate() {
    let date = new Date()
    return date.toDateString()
}

function getStandardTime(obj) {
    http.get('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp', {}, function(res, err) {
        let timestamp = res.body.json().data.t
        obj.fix = (new Date().getTime() - timestamp)
        console.log(obj.fix)
        // startClock(main, '09:54:20',-fix)
    })
}
let result = {
    fix: 0
}
getStandardTime(result)    
sleep(5000)
console.log('got the delay ', result.fix)
console.log('start in 10s')
sleep(10000)
startClock(main, '10:00:00', result.fix)
