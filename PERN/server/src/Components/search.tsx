// Active Working File

import { query } from 'express';
import React, {useState} from 'React';

function StockSearch() {
    const [query, setQuery] = useState('');
const [results, setResults] = useState(null);
const [error, setError] = useState(null);

const handleSearch = async () => {
    try {
        const apiKey = "INSERT API KEY HERE";
        const apiUrl = "INSERT API URL HERE";
    
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.bestMatches) {
            const stock = data.bestMatches[0];
            setStockData([
                symbol: stock[]
            ])
        }
    }
}
}
