import React, { useEffect, useState } from 'react';

const MyAccount = ({ userId }) => {
  const [savedStocks, setSavedStocks] = useState([]);

  useEffect(() => {
    const fetchSavedStocks = async () => {
      try {
        const response = await fetch(`/account/savedStocks?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setSavedStocks(data);
        }
      } catch (error) {
        console.error('Failed to fetch saved stocks:', error);
      }
    };

    fetchSavedStocks();
  }, [userId]);

  return (
    <div>
      <h2>My Stocks</h2>
      {savedStocks.length > 0 ? (
        <ul>
          {savedStocks.map((stock) => (
            <li key={stock.symbol}>
              {stock.symbol} - {stock.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved stocks</p>
      )}
    </div>
  );
};

export default MyAccount;
