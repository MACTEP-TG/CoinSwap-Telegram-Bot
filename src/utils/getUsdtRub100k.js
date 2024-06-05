import axios from "axios";

export const getUsdtRub100k = async () => {
    const response = await axios.get("https://garantex.org/api/v2/depth?market=usdtrub")

    const sales = response.data.asks

    let averagePrice = 0

    for(let i = 0, j = 0; j < 100000; ++i) {
        const currentSale = sales[i]

        let volume = 0
        if(Number(currentSale.volume) + j > 100000) {
            volume = 100000 - j
        } else {
            volume = Number(currentSale.volume)
        }

        averagePrice = ((j * averagePrice) + (volume * Number(currentSale.price))) / (j + volume)

        j += Number(currentSale.volume)
    }

    return averagePrice
}