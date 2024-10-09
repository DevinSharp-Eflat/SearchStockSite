import React, { useState } from 'react';

const StockSearch = () => {
  const [query, setQuery] = useState('');
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [error, setError] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!query) {
      setError('Please enter a stock symbol');
      return;
    }

    try {
      const response = await fetch(`/stocks/timeSeries?symbol=${query.toUpperCase()}`);
      const data = await response.json();

      if (response.ok) {
        setTimeSeriesData(data);
        setStockSymbol(query.toUpperCase());
      } else {
        setError(data.message);
        setTimeSeriesData([]);
      }
    } catch (err) {
      setError('Failed to fetch stock data');
    }
  };
  const handleSaveStock = async () => {
    try {
      const response = await fetch('/account/saveStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockSymbol,
          userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to save stock');
    }
  };

  return (
    <div className="stock-search">
      <h2>Stock Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {timeSeriesData.length > 0 && (
        <div className="time-series-data">
          <h3>Stock Data for {query.toUpperCase()}</h3>
          <ul>
            {timeSeriesData.map((dataPoint, index) => (
              <li key={index}>
                Date: {dataPoint.datetime}, Open: {dataPoint.open}, Close: {dataPoint.close}, High: {dataPoint.high}, Low: {dataPoint.low}
              </li>
            ))}
          </ul>
          <button onClick={handleSaveStock}>Save Stock</button>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
