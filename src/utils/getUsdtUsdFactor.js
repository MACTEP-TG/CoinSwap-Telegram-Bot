import axios from "axios";

export const getUsdtUsdFactor = async () => {
    return (await axios.get("https://garantex.org/api/v2/depth?market=usdtusd")).data.asks[0].factor
}