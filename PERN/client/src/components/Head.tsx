import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import axios from "axios";
//import MenuIcon from '@mui/icons-material/Menu';

export default function Head() {
  const [userDetails, setUserDetails] = useState({ username: "" });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.post(`/api/user/verify`, { token: jwt });
        setUserDetails(response.data);
      } catch {
        return;
      }
    };
    getUserData();
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'darkorange'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, backgroundColor: 'darkorange'}}>
            Buy Curious
          </Typography>
          {!userDetails.username && (
            <Button href="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
