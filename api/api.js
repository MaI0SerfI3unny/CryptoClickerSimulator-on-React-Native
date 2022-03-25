import axios from 'axios'

const currentUrl = "https://min-api.cryptocompare.com/"
const apiKey = "79e8161927be54d9926016c5bcf426cd06157f359152c623a0a6306c66d20156"

export const getCurrency = (container) => {
    axios.get(`${currentUrl}data/price?fsym=USDT&tsyms=BTC,ETH,XRP,TRX,LTC,XLM&api_key=${apiKey}`)
    .then((res) => {
        container(res.data)
    })
}