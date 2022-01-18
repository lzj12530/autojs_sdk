//  随机一个 数组，并填充一个数字

let arr = new Array(100)
function getNum(input) {
    return input.filter(i => i > 5).length
}
for(let i = arr.length; i> 0; i--) {
    arr[i - 1] = Math.ceil(Math.random() * 10)
}

// 开始抽样

let arrb = arr.slice(0, 50)
console.log(arr.length, arrb.length)
console.log('原数组>5的数量是', getNum(arr))
console.log('现数组>5的数量是', getNum(arrb))