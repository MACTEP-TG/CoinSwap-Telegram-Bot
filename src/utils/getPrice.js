import {Direction} from "../models/direction.js";
import {getUsdtRub100k} from "./getUsdtRub100k.js";
import {roundNumber} from "./roundNumber.js";
import {getEurRubForex} from "./getEurRubForex.js";
import {getUsdRubForex} from "./getUsdRubForex.js";
import {getUsdtPriceBinance} from "./getUsdtPriceBinance.js";
import cron from "node-cron";
import {getUsdToRubCB} from "./getUsdToRubCB.js";
import {roundTo500} from "./round500.js";
import {formatBigNumber} from "./formatBigNumber.js";
import {getUsdtUsdFactor} from "./getUsdtUsdFactor.js";
import {getUsdRubInvesting} from "./getUsdRubInvesting.js";

export class GetPrice {

    constructor() {

        cron.schedule('* * * * *', async () => {
            console.log("update")
            await this.update()
        })

        setInterval(async () => {
            console.log("update garantex ")
            await this.updateGarantex()
        }, 20000)
    }

    async updateGarantex() {
        this.usdtToRub = await getUsdtRub100k()
    }

    async update() {
        this.usdtToRub = await getUsdtRub100k()
        this.eurToRub = await getEurRubForex()
        this.usdToRub = await getUsdRubForex()
        this.btcUsdt = await getUsdtPriceBinance("BTC")
        this.ethUsdt = await getUsdtPriceBinance("ETH")
        this.usdToRubCB = await getUsdToRubCB()
        this.usdUsdtFactor = (Number(await getUsdtUsdFactor()) * 100).toFixed(1)
        this.investing = await getUsdRubInvesting()

    }

    async usdUsdtFactorBuy() {
        const num = (Number(this.usdUsdtFactor) + Number((await Direction.findOne({name: "USDUSDT"})).marginPercentBuy))
        return Math.round(num * 10) / 10
    }

    async usdUsdtFactorSell() {
        const num = (Number(this.usdUsdtFactor) - Number((await Direction.findOne({name: "USDUSDT"})).marginPercentSell))
        return Math.round(num * 10) / 10
    }

    async buy(name) {
        const perc = Number((await Direction.findOne({name})).marginPercentBuy)
        const price = Number(this.usdtToRub)

        return roundNumber(price * (1 + (perc / 100)))
    }

    async secondBuy(name) {
        const perc = Number((await Direction.findOne({name})).marginSecondPercentBuy)
        const price = Number(this.usdtToRub)

        return roundNumber(price * (1 + (perc / 100)))
    }


    async eurBuy(name) {
        const perc = Number((await Direction.findOne({name})).marginPercentBuy)
        const price = Number(this.eurToRub)

        return roundNumber(price * (1 + (perc / 100)))
    }


    async sell(name) {
        const perc = Number((await Direction.findOne({name})).marginPercentSell)
        const price = Number(this.usdtToRub)

        return roundNumber(price * (1 - (perc / 100)))
    }

    async divide(name) {
        const divisor = Number((await Direction.findOne({name})).divisor)

        return roundNumber(this.usdtToRub / divisor)
    }

    async multiply(name) {
        const divisor = Number((await Direction.findOne({name})).divisor)

        return roundNumber(divisor / this.usdtToRub)
    }

    async cryptoRub(id) {
        if(id === "BTC") return formatBigNumber(roundTo500(this.usdToRub * (this.btcUsdt)))
        if(id === "ETH") return formatBigNumber(roundTo500(this.usdToRub * (this.ethUsdt)))
    }

    async cryptoUsdt(id) {
        if(id === "BTC") return formatBigNumber((Number(this.btcUsdt)).toFixed())
        if(id === "ETH") return formatBigNumber((Number(this.ethUsdt)).toFixed())
    }

    async buyNoRound(name) {
        const perc = Number((await Direction.findOne({name})).marginPercentBuy)
        const price = Number(this.usdtToRub)

        return (price * (1 + (perc / 100))).toFixed(2)
    }

    async sellWithFee(name, fee) {
        const perc = Number((await Direction.findOne({name})).marginPercentSell)
        const price = Number(this.usdtToRub)

        return ((price - Number(fee)) * (1 - (perc / 100))).toFixed(2)
    }
}

