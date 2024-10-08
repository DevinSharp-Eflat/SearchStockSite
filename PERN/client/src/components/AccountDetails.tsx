import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function AccountDetails() {
    const [userDetails, setUserDetails] = useState({ username: "" });
    useEffect(() => {
        const getUserData = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                const response = await axios.post(`/api/user/verify`, { token: jwt });
                setUserDetails(response.data)
            } catch {
                window.location.href = "/"
            }
        }
        getUserData()
    });

    return (
        <>
            <h1>{userDetails.username}</h1>
        </>
    )
}