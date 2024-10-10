import React from "react";
import { useState } from "react";
import { List, TextField } from "@mui/material";
import axios from 'axios';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";




export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchStocks = async (query: string) => {
        if (!query) return;
        try {
            const apiKey = '6f031c8e1d364f42b8981f6034e4c634';
            const response = await axios.get(`https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${apiKey}`);
            setSearchResults(response.data.data || []);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchStocks(searchQuery);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSearchResults([]);
    };

    return (
        <>

            <TextField
                label="Search for stock using Ticker i.e. AAPL and press ENTER"
                variant="outlined"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                fullWidth
                style={{ marginTop: '20px' }}
            />
            <List>
                {searchResults.map((result: any) => (
                    <ListItem
                    key={result.symbol}
                    component={Link}
                    to={`/details/${result.symbol}`}
                    onClick={() => setSearchResults([])}>
                        <ListItemText primary={`${result.symbol} - ${result.name}`} secondary={result.exchange} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}