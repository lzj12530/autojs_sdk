import { Point, click_point } from './lib'

function start() {
    let entry_point = new Point([33,789,525,1515])
    let buy_point = new Point([0,1411,1080,1513])
    let input_point = new Point([154,519,893,591])
    let agree_point = new Point([0,2000,1080,2204])
    click_point(entry_point, [0,0])
    // sleep(600)
    click_point(buy_point)
    sleep(600)
    setText(0,'刘拯均')
    setText(1,'500224199002265872')
    sleep(400)
    click_point(input_point)
    click_point(input_point, [0,500])
    // KeyCode(66)
    sleep(800)
    // click_text('同意授权')
    click_point(agree_point)
    sleep(800)
    setText(0,18680755430)
}

let time_str = '2021/06/22 14:00:00'
let delay = new Date(time_str).getTime() - new Date().getTime()
start()