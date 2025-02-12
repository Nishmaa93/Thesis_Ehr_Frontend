import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InsightsIcon from '@mui/icons-material/Insights';
import StorageIcon from '@mui/icons-material/Storage';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, #0D1117, #161B22)', // Healthcare theme
                minHeight: '100vh',
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                padding: { xs: '20px', sm: '40px' },
                overflow: 'hidden',
            }}
        >
            {/* Hero Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    maxWidth: '900px',
                    margin: '0 auto',
                    padding: '60px 20px',
                    animation: 'fadeInDown 1.5s ease-out',
                    '@keyframes fadeInDown': {
                        '0%': { opacity: 0, transform: 'translateY(-50px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                        textShadow: '0px 4px 15px rgba(0, 224, 255, 0.3)',
                        marginBottom: '20px',
                    }}
                >
                    Empower Your Healthcare with AI-Driven EHR
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        lineHeight: 1.6,
                        color: '#C7D1D9',
                        marginBottom: '50px',
                    }}
                >
                    Experience next-level electronic health record management with our
                    modern, AI-driven platform.
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: '#00E0FF',
                        color: '#0D1117',
                        padding: '12px 40px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0px 8px 20px rgba(0, 224, 255, 0.4)',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' },
                            '100%': { transform: 'scale(1)' },
                        },
                        '&:hover': {
                            backgroundColor: '#00A3CC',
                        },
                    }}
                >
                    Proceed to Login
                </Button>
            </Box>

            {/* Features Section */}
            <Box
                sx={{
                    marginTop: '40px',
                    padding: { xs: '10px', sm: '20px', md: '40px' },
                }}
            >
                <Grid container spacing={4} justifyContent="center">
                    {[
                        {
                            icon: <HealthAndSafetyIcon sx={{ fontSize: '2.5rem', color: '#00E0FF' }} />,
                            title: 'Streamlined Patient Care',
                            description: 'Quick access to detailed patient records for better treatment.',
                        },
                        {
                            icon: <StorageIcon sx={{ fontSize: '2.5rem', color: '#00E0FF' }} />,
                            title: 'Secure Data Storage',
                            description: 'State-of-the-art encryption for patient health records.',
                        },
                        {
                            icon: <InsightsIcon sx={{ fontSize: '2.5rem', color: '#00E0FF' }} />,
                            title: 'AI-Powered Insights',
                            description: 'Unlock predictive analytics for better healthcare outcomes.',
                        },
                    ].map((feature, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                            sx={{
                                animation: `slideIn 1s ease-out ${index * 0.2}s`,
                                '@keyframes slideIn': {
                                    '0%': { opacity: 0, transform: 'translateY(50px)' },
                                    '100%': { opacity: 1, transform: 'translateY(0)' },
                                },
                            }}
                        >
                            <Card
                                sx={{
                                    background: 'linear-gradient(180deg, #161B22, #0D1117)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    minHeight: '250px',
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                                    '&:hover': {
                                        boxShadow: '0px 8px 25px rgba(0, 224, 255, 0.3)',
                                        transform: 'translateY(-5px)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    },
                                }}
                            >
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'rgba(0, 224, 255, 0.1)',
                                            margin: '0 auto 20px',
                                            width: 60,
                                            height: 60,
                                        }}
                                    >
                                        {feature.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            marginBottom: '15px',
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default LandingPage;
