// 计算车辆的价值
const milesPerYear = 15000 // 1万公里每年
const pricePerOil = 7 // 7块钱一升

class Car {
    setUsedyear(year) {
        this.usedYear = year
    }
    get depreciationValue() {
       return this.initialValue * this.depreciation * this.usedYear / 100
    }
    get CurrentValue() {
        return this.initialValue  - this.depreciationValue
    }
    getOilFees() {
        const oilPerYear = this.oilCast * milesPerYear / 100
        const feesPerYear = pricePerOil * oilPerYear 
        return this.usedYear * feesPerYear
    }
    getYearsCastFees() {
        return this.depreciationValue + this.getOilFees()
    }
    logDetail(ratePrice = 0) {
        console.log('----')
        console.log('车系名称是 :', this.name, '当前是第', this.usedYear, '年')
        console.log('当前价值为: ', this.CurrentValue, ' 车辆折旧费用为: ', this.depreciationValue)
        console.log('累计油费为:', this.getOilFees())
        console.log('累计花费为(折旧+油耗): ', this.getYearsCastFees())
        if (ratePrice) {
            console.log('累计利息为: ', ratePrice)
            console.log('加权花费为(折旧+油耗 - 利息): ', this.getYearsCastFees() - ratePrice)
        }
    }
}

class Gelly extends Car {
    constructor(name, initialValue, usedYear = 1) {
        super()
        this.name = name
        this.initialValue = initialValue
        this.oilCast = 10
        this.usedYear = usedYear
        this.depreciation = 10
    }

}

class Honda extends Car {
    constructor(name, initialValue, usedYear = 1) {
        super()
        this.name = name
        this.initialValue = initialValue
        this.oilCast = 5
        this.usedYear = usedYear
        this.depreciation = 7
    }
}

const bori = new Gelly('博瑞', 80000)
const yage = new Honda('雅阁', 170000)
// 利息加权
const rate = 0.05
let price = 90000
let years = [1,2,3,4,5,6,7,8,9]
let ratePrice = 0
for(year of years) {
    bori.setUsedyear(year)
    ratePrice += Math.ceil(price * rate)
    bori.logDetail(ratePrice)
    price += ratePrice
    yage.setUsedyear(year)
    yage.logDetail()
}