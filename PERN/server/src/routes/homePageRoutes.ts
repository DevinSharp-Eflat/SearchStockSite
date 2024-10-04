import { Router } from 'express';
import axios from 'axios';

const router = Router();

//doing a get request for the top 'x' stocks
router.get('/topStocks', async (_req, res) => {
    //console.log('Made it to topStocks');
    const getApple = await axios.get("https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=6f031c8e1d364f42b8981f6034e4c634")
    const getMicrosoft = await axios.get("https://api.twelvedata.com/time_series?symbol=MSFT&interval=1min&apikey=6f031c8e1d364f42b8981f6034e4c634")
    const getNvidia = await axios.get("https://api.twelvedata.com/time_series?symbol=NVDA&interval=1min&apikey=6f031c8e1d364f42b8981f6034e4c634")
    const appleData = getApple.data.values[0];
    const apple = {...appleData, symbol:getApple.data.meta.symbol};

    const microData = {...getMicrosoft.data.values[0], symbol:getMicrosoft.data.meta.symbol};
    const nvidiaData = {...getNvidia.data.values[0], symbol:getNvidia.data.meta.symbol};
    //const microsoft = {datetime, open, high, low}
    res.json([apple, microData, nvidiaData]);
})

export default router;