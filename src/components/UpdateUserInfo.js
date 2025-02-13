import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateUserInfo = ({ userInfo, setUserInfo }) => {
    const [updatedInfo, setUpdatedInfo] = useState({ ...userInfo });
    // permanent
    const idVal = userInfo.id;

    const handleUpdate = async () => {
        // console.log('updatedInfo', updatedInfo);
        let message = 'An error occurred during the update.';
        try {
            const response = await axios.put('http://localhost:5000/user/update', updatedInfo);
            // console.log(response);
            message = response.data.message;
            console.log('message', message);

            if (response.data.success) {
                setUserInfo(updatedInfo);
                console.log('message to be toast', message);
                toast.success(message, {
                    position: "top-right"
                });
            } else {
                toast.error(message, {
                    position: "top-right"
                });
            }
        } catch (error) {
            toast.error(message, {
                position: "top-right"
            });
        }
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <Typography variant="h6" sx={{ color: '#000000', marginBottom: '20px' }}>Update Information</Typography>
            <TextField
                label="Name"
                value={updatedInfo.name}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: '15px' }}
            />
            <TextField
                label="Phone"
                value={updatedInfo.phone}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, phone: e.target.value })}
                fullWidth
                sx={{ marginBottom: '15px' }}
            />
            <TextField
                label="Address"
                value={updatedInfo.address}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, address: e.target.value })}
                fullWidth
                sx={{ marginBottom: '15px' }}
            />
            <TextField
                label="Gender"
                value={updatedInfo.gender}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, gender: e.target.value })}
                fullWidth
                sx={{ marginBottom: '15px' }}
            />

            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Info
            </Button>
        </Box>
    );
};

export default UpdateUserInfo;
