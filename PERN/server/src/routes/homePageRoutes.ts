import { Router } from 'express';
import axios from 'axios';

const router = Router();

//doing a get request for the top 'x' stocks
router.get('/topStocks', async (_req, res) => {
    //console.log('Made it to topStocks');
    const getTesla = await axios.get(`https://api.twelvedata.com/time_series?symbol=TSLA&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    const getNIO = await axios.get(`https://api.twelvedata.com/time_series?symbol=NIO&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    // const getNvidia = await axios.get(`https://api.twelvedata.com/time_series?symbol=NVDA&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    // const getInner = await axios.get(`https://api.twelvedata.com/time_series?symbol=INND&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    // const getSWEC = await axios.get(`https://api.twelvedata.com/time_series?symbol=SWN&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    const teslaData = getTesla.data.values[0];
    const tesla = {...teslaData, symbol:getTesla.data.meta.symbol};
    const nioData = {...getNIO.data.values[0], symbol:getNIO.data.meta.symbol};
    //const nvidiaData = {...getNvidia.data.values[0], symbol:getNvidia.data.meta.symbol};
    //const InnerData = {...getInner.data.values[0], symbol:getInner.data.meta.symbol};
    //const SwecData = {...getSWEC.data.values[0], symbol:getSWEC.data.meta.symbol};
    //const microsoft = {datetime, open, high, low}
    res.json([tesla, nioData]);
})

export default router;