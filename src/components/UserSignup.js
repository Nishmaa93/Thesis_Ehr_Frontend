import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignupPage = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // API URL for signup
    const API_URL = "http://localhost:5000/user/signup";

    // Handle Signup
    const handleSignupSubmit = async () => {
        if (phone.length === 10 && password) {
            try {
                const response = await axios.post(API_URL, { name, gender, phone, address, password });
                if (response.data.success) {
                    toast.success(response.data.message, { position: 'top-right' });
                    navigate('/userlogin');
                } else {
                    setError(response.data.message || 'Something went wrong.');
                }
            } catch (err) {
                setError('An error occurred. Please try again later.');
            }
        } else {
            setError('Please enter valid details.');
        }
    };

    // Toggle password visibility
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.8)',
                    width: { xs: '90%', sm: '400px' },
                    animation: 'fadeIn 1s ease-out',
                    '@keyframes fadeIn': {
                        '0%': { opacity: 0, transform: 'scale(0.9)' },
                        '100%': { opacity: 1, transform: 'scale(1)' },
                    },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 700,
                        textShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                        color: '#00E0FF',
                    }}
                >
                    Create an Account
                </Typography>

                <Box
                    sx={{
                        animation: 'slideIn 1s ease-out',
                        '@keyframes slideIn': {
                            '0%': { opacity: 0, transform: 'translateX(-50px)' },
                            '100%': { opacity: 1, transform: 'translateX(0)' },
                        },
                    }}
                >
                    {error && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#FF6B6B',
                                marginBottom: '15px',
                                textAlign: 'center',
                            }}
                        >
                            {error}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        placeholder="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon sx={{ color: '#00E0FF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&:hover fieldset': { borderColor: '#00E0FF' },
                                '& input': { color: '#FFFFFF' },
                            },
                        }}
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        fullWidth
                        placeholder="Gender (e.g., Male, Female)"
                        variant="outlined"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon sx={{ color: '#00E0FF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&:hover fieldset': { borderColor: '#00E0FF' },
                                '& input': { color: '#FFFFFF' },
                            },
                        }}
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        fullWidth
                        placeholder="Phone Number"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon sx={{ color: '#00E0FF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&:hover fieldset': { borderColor: '#00E0FF' },
                                '& input': { color: '#FFFFFF' },
                            },
                        }}
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        fullWidth
                        placeholder="Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon sx={{ color: '#00E0FF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&:hover fieldset': { borderColor: '#00E0FF' },
                                '& input': { color: '#FFFFFF' },
                            },
                        }}
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        fullWidth
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#00E0FF' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                        sx={{ color: '#00E0FF' }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&:hover fieldset': { borderColor: '#00E0FF' },
                                '& input': { color: '#FFFFFF' },
                            },
                        }}
                        sx={{ marginBottom: '20px' }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSignupSubmit}
                        sx={{
                            backgroundColor: '#00E0FF',
                            color: '#0F2027',
                            fontWeight: 'bold',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            boxShadow: '0px 8px 20px rgba(0, 224, 255, 0.4)',
                            '&:hover': {
                                backgroundColor: '#00A3CC',
                            },
                        }}
                    >
                        Sign Up
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: '#FFFFFF',
                        }}
                    >
                        Already have an account?{' '}
                        <Button
                            onClick={() => navigate('/userlogin')}
                            sx={{
                                color: '#00E0FF',
                                textTransform: 'none',
                                padding: 0,
                                fontWeight: 'bold',
                            }}
                        >
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserSignupPage;
