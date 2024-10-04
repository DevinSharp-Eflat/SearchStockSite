import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function detailsPage() {
    //will need to do an API call with the stock symbol passed to get detailed info

    return(
        <>
        <head>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <Button variant="outlined">Outlined</Button>
        </head>
        <body>
            <h1>Stock Name Goes Here</h1>
        </body>
        </>
    )
}

detailsPage()