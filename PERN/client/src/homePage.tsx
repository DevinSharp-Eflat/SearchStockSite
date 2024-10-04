//import { useFormControl } from '@mui/material/FormControl';
import * as React from 'react';
import Box from '@mui/material/Box';
//import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
//import Divider from '@mui/material/Divider';

function HomePage() {
    //list items
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    )  => {
        setSelectedIndex(index);
    };

    //will need to do an API call to pull in the top5/bottom5 stocks

    const [data, setData] = useState([{symbol: ""}]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/topStocks");
          const jsonData = await response.json();
          console.log("fetched data or sumthin", jsonData);
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <>

            <h1>Top 5 performing stocks</h1>
            <Box sx ={{ width:'50%' , bgcolor: 'blue'}}>
                {data && data.map(stock => (
                <List>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary={stock.symbol} secondary="stockprice"/>
                    </ListItemButton>
                </List>
                )
            )}
            </Box>
        <footer>Powered by twelvedata API</footer>
        </>
    );
}

export default HomePage;