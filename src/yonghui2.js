let btnText = '领取'

console.log('开始等待标志: ', btnText)
textContains(btnText).waitFor()
console.log('等待结束: ')
let btn = textContains(btnText).findOne(1000)
console.log('按钮结果: ', !!btn)
if (btn) btn.click()

// 定时切换标签