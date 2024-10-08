import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function DetailsPage() {
    //will need to do an API call with the stock symbol passed to get detailed info

    const [data, setData] = useState({symbol: "", open: 0, high: 0, low: 0, close: 0});
    const { stockTicker } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3001/stockDetails/${stockTicker}`);
            const jsonData = await response.json();
            console.log("fetched data or sumthin", jsonData);
            setData(jsonData[0]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <>
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Item>{data.symbol}: Stock Symbol</Item>
        </Grid>
        <Grid container spacing={4} size={{ xs: 12, md: 7, lg: 8 }}>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="Open"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Open: {String(data.open)}
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="low"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Low: {String(data.low)}
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="high"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                High: {String(data.high)}
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box
                id="close"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Close: {String(data.close)}
              </Box>
              <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
          size={12}
        >
        </Grid>
      </Grid>
    </Box>
        </>
    );
}

export default DetailsPage;