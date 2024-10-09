import { Router } from 'express';
import { Stock } from '../Models/StockModel.js';
import fetch from 'node-fetch'; 

const router = Router();
router.get('/timeSeries', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: 'Stock symbol is required' });
  }

  try {
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=YOUR_API_KEY`);
    const data:any = await response.json();

    if (data && data.values) {
      await Stock.upsert({
        symbol: symbol.toString().toUpperCase(),
        name: data.meta.symbol,
        timeSeriesData: data.values,
      });

      res.json(data.values);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
