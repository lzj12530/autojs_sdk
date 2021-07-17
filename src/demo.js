// import lib from '../autojs_sdk/lib'
// launchApp("什么值得买")
// sleep(1000)
// selector().id('tv_search').findOne().click()
// console.log(selector().id('com.smzdm.client.android:id/tv_search'))
// console.log(selector().textContains('滴滴出行').findOne().click())
const fixedCoord = [0, 0]
/**
 * 获取文本类型，分别有 text、desc
 * @param {string} _text 需要查询的文本
 */
 function get_text_type(_text) {
    for (i = 5; i > 0; i--) {
        if (textContains(_text).exists()) {
            return 'text'
        } else if (descContains(_text).exists()) {
            return 'desc'
        } else {
            // verbose(_text, '不存在 ' + i)
            sleep(200)
        }
    }
    return null
}
/**
 * 获取文本坐标，文本点击时自动调用
 * @param {*} _text 待查询的文本
 * @param {*} tip_type 未找到时，是否需要提示，传入 no_tip 则不提示
 */
 function get_coord_by_text(_text, tip_type) {
    text_type = get_text_type(_text)
    btn = null
    if (text_type == null) {
        if (tip_type != 'no_tip') confirm_continue(get_coord_by_text, _text)
        return null
    } else if (text_type == 'text') {
        btn = textContains(_text).findOne()
        if (btn.bounds().centerX() == undefined) btn = textStartsWith(_text).findOne()
        if (btn.bounds().centerX() == undefined) btn = textEndsWith(_text).findOne()
    } else if (text_type == 'desc') {
        btn = descContains(_text).findOne()
        if (btn.bounds().centerX() == undefined) btn = descStartsWith(_text).findOne()
        if (btn.bounds().centerX() == undefined) btn = descEndsWith(_text).findOne()
    } else {
        if (tip_type != 'no_tip') error('Unknown type', text_type)
        return null
    }
    point = btn.bounds()
    if (point.centerX()) {
        return {
            x: point.centerX(),
            y: point.centerY()
        }
    } else {
        sleep(800)
        return get_coord_by_text(_text, tip_type)
    }
}
function click_text(_text, fix_coord) {
    btn = textContains(_text).findOne()
    let point = btn.bounds();
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

function click_id(_id, fix_coord) {
    btn = id(_id).findOne()
    let point = btn.bounds();
    console.log(point)
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

function click_point(point, fix_coord, delay) {
    if (!fix_coord) {
        fix_coord = [0,0]
    }
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(delay || 800)
}
// console.log(get_coord_by_text('茅台'))
// click_text('茅台', [0,0])
// click_id('tv_search', [0,0])
// sleep(100)
// setText('iPhone12')
// KeyCode(66)
// click_item('茅台')
function Point(coord){
    this.coord = coord
    this.centerX = function() {
        return (this.coord[0] + this.coord[2]) / 2
    },
    this.centerY  = function (){
        return (this.coord[1] + this.coord[3]) /2
    }
}





// 河马
function startHema() {
    let entry_point = new Point([33,789,525,1515])
    let buy_point = new Point([0,1411,1080,1513])
    let input_point = new Point([154,519,893,591])
    let agree_point = new Point([,2000,1080,2204])
    click_point(entry_point, [0,0])
    click_point(buy_point)
    sleep(600)
    setText(0,'刘拯均')
    setText(1,'500224199002265872')
    sleep(400)
    click_point(input_point)
    click_point(input_point, [0,500])
    sleep(800)
    click_point(agree_point)
    sleep(800)
    setText(0,18680755430)
}

// let time_str = '2021/06/22 14:00:00'
// let delay = new Date(time_str).getTime() - new Date().getTime()
// // startHema()

// 盒马测试
function startHemaTest() {
    let time = new Date().getTime()
    let entry_point = new Point([33,795,525,1521])
    let buy_point = new Point([0,1411,1080,1513])
    let input_point = new Point([154,519,893,591])
    let agree_point = new Point([200,1900,1080,2204])
    let check_point = new Point([35,1001,88,1058])
    let p3 = p4 = false
    click_point(entry_point)
    while(!p3) {
        try{
            click_point(buy_point)
            if (textContains('姓名').exists()) {
                p3 = setText(0, '刘拯均')
                console.log('p3 OK')
                setText(1,'500224199002265872')
                // sleep(400)
                click_point(input_point,undefined, 200)
                click_point(input_point, [0,500], 200)
            } else {
                console.log('p3 loop')
            }
        } catch(e) {
            console.log(e)
        }
    }
    while(!p4) {
        click_point(agree_point)
        if (text('联系手机').exists()) {
            p4 = setText(0,18680755430)
            if (p4) {
                console.log('p4 OK')
                click_point(className('CheckBox').findOne(500).bounds(), undefined, 100)
            }
        }
    } 
    // 选择预约时间
    let p5 = false
    text('确认预约').findOne().click()
    // sleep(800)
    while(!p5) {
        if (textContains('21:30').exists()) {
            // toastLog('出现日期')
            textContains('21:30').findOne().click()
            sleep(200)
            text('确认').findOne().click()
            p5 = true
            break
        }
    }
    console.log(new Date().getTime() - time)
}

// startHemaTest()
// 苏宁测试

function startSuningTest() {
    console.log(textContains('您已预约').findOne())
    click_text('您已预约',fixedCoord)
}

// startSuningTest()

// 多点测试

function startDuodianTest() {
    let entry_point = new Point([808,919,1025,991])
    let buy_point = new Point([107,2033,973,2179])
    let start = new Date().getTime()
    click_point(entry_point)
    // let p = textContains('每天10').findOne()
    let p = false
    // console.log(p)
    while(!p) {
        // click_point(buy_point)
        let btn
        if (btn = text('预约抢购').findOne(500)) {
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
    }

    // while(!p2) {
    //     click_point(buy_point)
    //     p = textContains('好的')
    // }


}
// 盒马
function hemaClock(fix) {
    fix = fix || 0
    let time_str = '15:00:00'
    let delay = new Date(time_str).getTime() - new Date().getTime()
    console.log('hema delay', delay / 1000)

    setTimeout(startHemaTest, delay - fix)
}
// startDuodianTest()

// function jiuxian() {
//     let entry_point = new Point([530,2090,1052,2175])
// }

// while(true) {
//     if (!text('立即预约').exists) {
//         text('立即抢购').findOne().click()
//         break
//     }
// }

// console.log(text('立即预约').findOne(1000).click())

// startDuodianTest()
// text('预约抢购').findOne().click()
// text('立即预约').findOne().click()

// 盒马clock
// hemaClock(0)
// startHemaTest()

function startClock(handler,time_str,fix) {
    fix = fix || -1100
    let delay = new Date(getDate() + ' ' + time_str).getTime() - new Date().getTime()
    console.log(getDate() + ' ' + time_str)
    console.log('clock delay', delay, 'ms')
    setTimeout(handler, delay - fix)
}
function getDate() {
    let date = new Date()
    return date.toDateString()
}
// startClock(startDuodianTest, '10:00:00', 1)

// startClock(startHemaTest, '15:00:00', 100)


//  永辉 

function startClock(handler,time_str,fix) {
    fix = fix || -1100
    let loadingTime = 1200
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

let entry_point = new Point([789,609,860,645])

// click_point(entry_point)

startClock(() => click_point(entry_point), '10:00:00')