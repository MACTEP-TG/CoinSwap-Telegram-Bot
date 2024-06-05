import axios from "axios";

export const getUsdToRubCB = async () => {
    const response = (await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")).data
    return response.Valute.USD.Value
}