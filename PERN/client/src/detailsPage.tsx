import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, Stack } from '@mui/material';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import * as React from 'react';



function DetailsPage() {
  //will need to do an API call with the stock symbol passed to get detailed info

  const [data, setData] = useState({ symbol: "", open: 0, high: 0, low: 0, close: 0 });
  const { stockTicker } = useParams();
  const [userDetails, setUserDetails] = useState({ userId: "" });

  const [rerender, setRerender] = useState(false);
  const toggleRender = () => {
    setRerender(!rerender)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/stockDetails/${stockTicker}`);
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
    <SearchBar toggleRender/>
      <Box sx={{ flexGrow: 1, border: 10, borderColor: "darkorange", bgcolor: "orange", textTransform: 'uppercase', alignSelf: 'center' }}>
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