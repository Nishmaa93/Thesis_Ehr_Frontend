import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRecordForm from './AddRecordForm';
import RecordsTable from './RecordsTable';

const Dashboard = () => {
    const [view, setView] = useState('add');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [records, setRecords] = useState([
        { id: 1, name: 'John Doe', age: 25, gender: 'Male', phone: '9876543210', address: 'Kathmandu', condition: 'High Fever', remarks: 'Follow up in 3 days' },
        { id: 2, name: 'Jane Smith', age: 30, gender: 'Female', phone: '9841234567', address: 'Lalitpur', condition: 'Cough and Cold', remarks: 'Prescribed antibiotics' },
        { id: 3, name: 'Sam Wilson', age: 28, gender: 'Male', phone: '9807654321', address: 'Bhaktapur', condition: 'Headache', remarks: 'Prescribed painkillers' },


    ]);

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
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
                        Dashboard
                    </Typography>
                    <List>
                        {[
                            { label: 'Add Record', icon: <AddBoxIcon />, key: 'add' },
                            { label: 'View Records', icon: <ListIcon />, key: 'viewList' },
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
                {view === 'add' && (
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
                        {/* Scrollable Container */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                maxHeight: '100%', // Ensure it uses the parent's height for scrolling
                            }}
                        >
                            <AddRecordForm
                                records={records}
                                setRecords={setRecords}
                            />
                        </Box>
                    </Box>
                )}

                {view === 'viewList' && (
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
                        <Box
                            sx={{
                                flex: 1,
                                overflow: 'auto', // Enable vertical and horizontal scrolling
                            }}
                        >
                            <RecordsTable
                                records={records}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
