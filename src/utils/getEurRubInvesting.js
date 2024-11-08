import axios from "axios";

export const getEurRubInvesting = async () => {
    const html = (await axios.get('https://www.investing.com/currencies/eur-rub')).data

    const match = html.match(/data-test="instrument-price-last">([^<]+)<\/div>/);

    return match[1].trim()
}