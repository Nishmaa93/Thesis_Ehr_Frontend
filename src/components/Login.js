import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [step, setStep] = useState(1); // Step 1: Username, Step 2: Password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle for show/hide password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameSubmit = () => {
        if (username === 'admin') {
            setError('');
            setStep(2);
        } else {
            setError('Invalid username. Please try again.');
        }
    };

    const handleLoginSubmit = () => {
        if (password === 'admin') {
            navigate('/dashboard');
        } else {
            setError('Invalid password. Please try again.');
        }
    };

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
                    Welcome Back
                </Typography>

                {step === 1 && (
                    <Box
                        sx={{
                            animation: 'slideIn 1s ease-out',
                            '@keyframes slideIn': {
                                '0%': { opacity: 0, transform: 'translateX(-50px)' },
                                '100%': { opacity: 1, transform: 'translateX(0)' },
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                marginBottom: '15px',
                                textAlign: 'center',
                                color: '#C7D1D9',
                            }}
                        >
                            Please enter your username to continue.
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleUsernameSubmit}
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
                            Continue
                        </Button>
                    </Box>
                )}

                {step === 2 && (
                    <Box
                        sx={{
                            animation: 'slideIn 1s ease-out',
                            '@keyframes slideIn': {
                                '0%': { opacity: 0, transform: 'translateX(50px)' },
                                '100%': { opacity: 1, transform: 'translateX(0)' },
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                marginBottom: '15px',
                                textAlign: 'center',
                                color: '#C7D1D9',
                            }}
                        >
                            Now, enter your password.
                        </Typography>
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
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleLoginSubmit}
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
                            Login
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default LoginPage;
