import { Router } from 'express';
import axios from 'axios';

const router = Router();

//doing a get request for the top 'x' stocks
router.get('/stockDetails', async (_req, res) => {

    const getStock = await axios.get(`https://api.twelvedata.com/time_series?symbol=TSLA&interval=1min&apikey=6f031c8e1d364f42b8981f6034e4c634`)
    const stockData = {...getStock.data.values[0], symbol:getStock.data.meta.symbol};

    res.json([stockData]);
})

export default router;