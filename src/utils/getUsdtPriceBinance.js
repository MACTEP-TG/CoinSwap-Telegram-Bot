import axios from "axios";


export const getUsdtPriceBinance = async (id) => {

    const response = (await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${id}USDT`)).data

    return response.price
}