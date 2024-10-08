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
        //use data[index] for symbol?
        console.log(data[index].symbol)
        let path = `http://localhost:3000/details`;
        //window.location.href = path;
    };

    //will need to do an API call to pull in the top5/bottom5 stocks

    const [data, setData] = useState([{symbol: "", low: 0, high: 0}]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/topStocks");
          const jsonData = await response.json();
          //console.log("fetched data or sumthin", jsonData);
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
            <Box sx ={{ width:'100%' , bgcolor: 'yellow'}}>
                {data && data.map(stock => (
                <List>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary={stock.symbol} secondary= {`open: $ ${String(stock.low)}`} />
                    </ListItemButton>
                </List>
                )
            )}
            </Box>
        </>
    );
}

export default HomePage;