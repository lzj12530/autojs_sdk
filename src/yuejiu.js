function click_text(_text, fix_coord) {
    fix_coord = fix_coord || [0,0]
    btn = textContains(_text).findOne()
    let point = btn.bounds();
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
/**
 * 拖动滑块
 * 
 */
 function dragSlider(blockX,blockY) {
    for (var i = 0; i < 0; i++) { sleep(1000); log(i); }
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
    }
    var x = discernSlidingblock(img, device.width) + 150
    console.info("识别结果滑块X坐标：" + x);
 
    if (x > -1) {
        console.log(x)
        randomSwipe(blockX,blockY,830,blockY,100)
        // randomSwipe(拖动滑块x, 拖动滑块y, x, 拖动滑块y)
        return true;
    } else {
        return false;
        console.log("识别有误，请确认是否在滑块界面");
    }
}
/**
 * 计算滑块位置
 * @param {图片} img 
 * @param {分辨率} ratio 
 */
function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else {
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
 
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + y) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + y- i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}
/**
 * 真人模拟滑动函数 （滑块滑动）
 * @param {起点x} sx 
 * @param {起点y} sy 
 * @param {终点x} ex 
 * @param {终点y} ey 
 */
 function randomSwipe(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 1000
    var timeMax = 3000
    //设置控制点极限距离
    var leaveHeightLength = 500
 
    //根据偏差距离，应用不同的随机方式
    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)
 
        var lx = (sx - ex) / 3
        if (lx < 0) { lx = -lx }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)
 
        var ly = (sy - ey) / 3
        if (ly < 0) { ly = -ly }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sy + ly + ly / 2 + random(0, y3)
    }   
 
    //获取运行轨迹，及参数
    var time = [0, random(timeMin, timeMax)]
    var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)
 
    
    log("随机控制点A坐标：" + x2 + "," + y2)
    log("随机控制点B坐标：" + x3 + "," + y3)
    log("随机滑动时长：" + time[1])
 
    //滑动
    gestures(time.concat(track))
}
/**
 * 计算滑动轨迹
 */
 function bezierCreate(x1, y1, x2, y2, x3, y3, x4, y4) {
    //构建参数
    var h = 100;
    var cp = [{ x: x1, y: y1 + h }, { x: x2, y: y2 + h }, { x: x3, y: y3 + h }, { x: x4, y: y4 + h }];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
 
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
 
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
 
        var t = dt * i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }
 
    //轨迹转路数组
    var array = [];
    for (var i = 0; i < curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
 
    return array
}
// // console.log(dragSlider())
function login() {
    let flag = setText('18680755430')
    console.log(flag)
    console.log(textContains('缺口').exists())
    // sleep(200)
    click_text('获取验证码')
    textContains('拖动下方滑块').waitFor()
    let block = new Point([137,1364,327,1465])
    if (!requestScreenCapture()) {
        toastLog("请求截图权限 失败");
    } else {
        toastLog("请求截图权限 成功");
    }
    do{
        dragSlider(block.centerX(),block.centerY())
    }while(textContains('缺口').exists())

    while(true) {
        if (textContains('5分钟').exists()) {
            let reg = /\d{2+}/g
            let msg = (textContains('5分钟').findOne(1000).text())
            let result = msg.match(/\d{2,}/g)
            console.log(result, msg)
            let code = result[0]
            setText(1,code)
            click('登录')
            break
        }
    }
}

// while(true) {
//     if (textContains('5分钟').exists()) {
//         let reg = /\d{2+}/g
//         let msg = (textContains('5分钟').findOne(1000).text())
//         let result = msg.match(/\d{2,}/g)
//         console.log(result, msg)
//         let code = result[0]
//         log('验证码为', code)
//         setText(1,code)
//         click('登录')
//         break
//     }
//     log('没有短信')
// }
// 短信监听
// console.log(textContains('5分钟').findOne(1000))
// events.observeNotification()
// events.onNotification(function(notification){
//     log(notification.getText());
// });
// console.log(events)
function callMe(name,delay) {
    let num = delay || 10
    console.log('\n查找拨号标记,2s后开始拨号')
    sleep(2000)
    click_text(name)
    console.log('开始拨号，',name,' ',num,'s后超时')
    while(num --) {
        if (textContains('正在拨号').findOne(1000)) {
            console.log('还在拨号，1s后重新检查')
            sleep(1000)
        } else {
            console.log('!!!!!!拨号可能成功, 退出循环!!!!!!!!!!!!!')
            return true
        }
    }
    console.log('超时未接通，2s后挂断电话')
    sleep(2000)
    desc('挂断电话').findOne().click()
    console.log('结束拨号: ', name, '\n')
    return false

}
let collections = ['糖酒','糖酒']
let num = 1;
while(true) {
    let name = collections.shift()
    console.log('第',num,'次运行\n')
    let flag = callMe(name)
    if (flag === true) {
        break;
    }
    collections.push(name)
    num++
}