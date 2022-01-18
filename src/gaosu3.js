 function click_point(point, fix_coord) {
    if (!fix_coord) {
        fix_coord = [0,0]
    }
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

 function Point(coord){
    this.coord = coord
    this.centerX = function() {
        return (this.coord[0] + this.coord[2]) / 2
    },
    this.centerY  = function (){
        return (this.coord[1] + this.coord[3]) /2
    }
}
function vibrate(duration, times, delay) {
    if (delay == null) delay = 0
    if (times == null) times = 1
    for (i = 0; i < times; i++) {
        device.vibrate(duration);
        sleep(delay)
    }
}
function failToConfirm() {
    vibrate(3500, 100)
    dialogs.build({
        title: "你好",
        content: "请问你是笨蛋吗?",
        positive: "知道了"
    }).on("positive", ()=>{
        device.cancelVibration()
    }).show()
}

let num = 0
let limit = 1000
function getSleepTime() {
    let hour = new Date().getHours()
    return hour < 13 ? 30000 : 0;
}

let isFail = false
while(num < limit) {
    if (isFail) break;
    sleep(getSleepTime())
    num ++
    // textContains('去结算').findOne().click()
    if (textContains('收货赠送积分').exists()) {
        textContains('提交订单').findOne().click()
        sleep(1000)
        if (textContains('失败').exists()) {
           console.log('订单失败')
           isFail = true
           failToConfirm()
           // 风控
           sleep(50000)
        }
    } else {
        let btn = textContains('立即购买').findOne(1000)
        if (btn) {
            btn.click()
            sleep(1000)
            click_point(btn.bounds(), [0,0])

        }
        if (textContains('太快').exists) {
            sleep(4000)
        }
    }
    sleep(random(4000,10000))
    log('run ', num)
}