/**
 * 获取文本类型，分别有 text、desc
 * @param {string} _text 需要查询的文本
 */
export function get_text_type(_text) {
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
 export function get_coord_by_text(_text, tip_type) {
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
export function click_text(_text, fix_coord) {
    btn = textContains(_text).findOne()
    let point = btn.bounds();
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

export function click_id(_id, fix_coord) {
    btn = id(_id).findOne()
    let point = btn.bounds();
    console.log(point)
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

export function click_point(point, fix_coord) {
    if (!fix_coord) {
        fix_coord = [0,0]
    }
    click(point.centerX() + fix_coord[0], point.centerY() + 10 + fix_coord[1]);
    sleep(800)
}

export function Point(coord){
    this.coord = coord
    this.centerX = function() {
        return (this.coord[0] + this.coord[2]) / 2
    },
    this.centerY  = function (){
        return (this.coord[1] + this.coord[3]) /2
    }
}

