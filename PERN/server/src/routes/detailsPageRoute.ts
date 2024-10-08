import { Router } from 'express';
import axios from 'axios';

const router = Router();

//doing a get request for the top 'x' stocks
router.get('/stockDetails/:stockTicker', async (req, res) => {
    const { stockTicker } = req.params;
    const getStock = await axios.get(`https://api.twelvedata.com/time_series?symbol=${stockTicker}&interval=1min&apikey=${process.env.TWELVE_DATA_API_KEY}`)
    const stockData = {...getStock.data.values[0], symbol:getStock.data.meta.symbol};

    res.json([stockData]);
})

export default router;