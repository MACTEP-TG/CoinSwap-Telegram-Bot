import axios from "axios";
import * as cheerio from "cheerio";

const getFourSymbolsAfterUsdRub = (data) => {
    const preprocessedData = data.replace(/[\u2028\u2029\n\t]/g, '').trim()
    const str = preprocessedData.replace(/\s/g, '').slice(Math.floor(preprocessedData.length / 2))

    const index = str.indexOf("EUR/RUB")

    const substring = str.substring(index + 7)

    return substring.slice(0, 5)
}

export const getEurRubForex = async () => {
    const response = (await axios.get("https://www.profinance.ru/")).data

    const $ = cheerio.load(response)

    const data = $(`body`)

    return getFourSymbolsAfterUsdRub(data.text())
}