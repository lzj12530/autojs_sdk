// 模拟涨跌

function getRange(range = 3, weight = 5) {
    let result = Math.random() * range
    return Math.random() * 10 < weight ? result : - result
}

console.log(getRange())

// 累计交易日
let days = 30
let totalAmount = 3*10000

let result = 0

// 平均定投
let dayAmount = totalAmount / days
for(let i = 0; i< days; i++) {
    result = dayAmount + result * (100 + getRange(5,6)) / 100
    console.log(result)
}

// 