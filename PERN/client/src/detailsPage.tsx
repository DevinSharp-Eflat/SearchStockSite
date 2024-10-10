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
import { Button, Divider, Stack } from '@mui/material';
import axios from 'axios';
import { alignProperty } from '@mui/material/styles/cssUtils';


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

  const [data, setData] = useState({ symbol: "", open: 0, high: 0, low: 0, close: 0 });
  const { stockTicker } = useParams();
  const [userDetails, setUserDetails] = useState({ userId: "" });

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
    const getUserData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.post(`/api/user/verify`, { token: jwt });
        console.log(response.data);
        setUserDetails(response.data)
      } catch {
        return
      }
    }

    fetchData();
    getUserData()
  }, []);

  async function favoriteClick(_event: any) {
    await axios.post(`/api/user/${userDetails.userId}/favorite-stock`, { stockSymbol: data.symbol });
  }

  return (
    <>
      <Box sx={{ width: "80%", height: "60%", border: 10, bgcolor: "lightgrey", textTransform: 'uppercase', alignSelf: 'center' }}>
        <Stack direction="row" spacing={20} sx={{alignItems: 'center'}}>
          <h1>{data.symbol}</h1>
          {userDetails.userId && <Button variant="outlined" onClick={(event) => favoriteClick(event)}>Favorite</Button>}
        </Stack>
        <Divider />
          <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ jusitfyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{ fontSize: '40px', textTransform: 'uppercase' }}>
              Open: {String(data.open)}
            </Box>
            <Box sx={{ fontSize: '40px', textTransform: 'uppercase' }}>
              Low: {String(data.low)}
            </Box>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ jusitfyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{ fontSize: '40px', textTransform: 'uppercase' }}>
              High: {String(data.high)}
            </Box>
            <Box sx={{ fontSize: '40px', textTransform: 'uppercase' }}>
              Close: {String(data.close)}
            </Box>
          </Stack>
      </Box>
    </>
  );
}

export default DetailsPage;