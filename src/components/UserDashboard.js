import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HealthHistory from './HealthHistory'; // Component to show user's health history
import UpdateUserInfo from './UpdateUserInfo'; // Component to update user information

const UserDashboard = () => {
    const [view, setView] = useState('healthHistory');
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(location.state?.userInfo || null);
    const idVal = userInfo.id;




    useEffect(() => {
        if (!userInfo || !userInfo.id) {
            // Fetch user info from the API if it's not in state
            const fetchUserInfo = async () => {
                // console.log('Fetching user by id from API: ', userInfo.id);
                try {
                    // const response = await axios.get('http://localhost:5000/user/profile/', { id: idVal });
                    // setUserInfo(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchUserInfo();
        }
    }, [userInfo]); // This hook will run when userInfo changes



    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                // background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
                color: '#FFFFFF',
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    width: '260px',
                    background: 'rgba(15, 32, 39, 0.95)',
                    boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '20px',
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: '#ffffff',
                            padding: '10px',
                            textShadow: '0 2px 10px rgba(0, 224, 255, 0.5)',
                            textAlign: 'left',
                            marginBottom: '30px',
                        }}
                    >
                        User Dashboard
                    </Typography>
                    <List>
                        {[
                            { label: 'Health History', icon: <ListIcon />, key: 'healthHistory' },
                            { label: 'Update Information', icon: <AddBoxIcon />, key: 'updateInfo' },
                        ].map((item) => (
                            <ListItem
                                button
                                key={item.key}
                                onClick={() => setView(item.key)}
                                sx={{
                                    color: view === item.key ? '#00E0FF' : '#C7D1D9',
                                    marginBottom: '15px',
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: view === item.key ? 'rgba(0, 224, 255, 0.1)' : 'transparent',
                                    '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.2)' },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: view === item.key ? '#00E0FF' : '#C7D1D9',
                                        minWidth: '40px',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Button
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                        color: '#C7D1D9',
                        justifyContent: 'flex-start',
                        fontSize: '16px',
                        '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.2)' },
                    }}
                >
                    Logout
                </Button>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    display: 'flex',
                    height: '98%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {view === 'healthHistory' && (
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '1200px',
                            padding: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(15px)',
                            borderRadius: '20px',
                            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
                            height: '95%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Health History View */}
                        <HealthHistory userInfo={userInfo} />
                    </Box>
                )}

                {view === 'updateInfo' && (
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '1200px',
                            padding: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(15px)',
                            borderRadius: '20px',
                            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
                            height: '95%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Update Information View */}
                        <UpdateUserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default UserDashboard;