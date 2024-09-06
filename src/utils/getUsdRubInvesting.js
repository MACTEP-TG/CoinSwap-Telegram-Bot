import axios from "axios";

export const getUsdRubInvesting = async () => {
    const html = (await axios.get('https://www.investing.com/currencies/usd-rub')).data

    const match = html.match(/data-test="instrument-price-last">([^<]+)<\/div>/);

    return match[1].trim()
}