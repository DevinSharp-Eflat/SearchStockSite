import { useFormControl } from '@mui/material/FormControl';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import Divider from '@mui/material/Divider';

function homePage() {
    //list items
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    )  => {
        setSelectedIndex(index);
    };

    //will need to do an API call to pull in the top5/bottom5 stocks
    return (
        <>
        <head>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <Button variant="outlined">Outlined</Button>
        </head>
        <body>
            <h1>Top 5 performing stocks</h1>
            <Box sx ={{ width:'50%' , bgcolor: 'blue'}}>
                <List component="nav" aria-label="topFiveStocks">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary="Stock1" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary="Stock2" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary="Stock3" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary="Stock4" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            
                        </ListItemIcon>
                        <ListItemText primary="Stock5" />
                    </ListItemButton>
                </List>
            </Box>
        </body>
        <footer>Powered by twelvedata API</footer>
        </>
    );
}

homePage();