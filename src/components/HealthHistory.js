import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// fetch records from API where phone number matches
const showRecords = async (phone) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/records/phone/${phone}`);
        // console.log('response', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching health records:', error);
        return null;
    }
};

// Health History component with improved UI
const HealthHistory = ({ userInfo }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            const data = await showRecords(userInfo.phone);
            if (data) {
                // Sort records by updatedAt in descending order
                const sortedData = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setRecords(sortedData);
            }
            setLoading(false);
        };

        fetchRecords();
    }, [userInfo.phone]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Card sx={{ width: '100%', maxWidth: '800px', padding: '30px', boxShadow: 6, borderRadius: '16px' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                        Health History of {userInfo.name}
                    </Typography>

                    {loading ? (
                        <Typography sx={{ color: '#999', marginTop: '20px', textAlign: 'center' }}>Loading health records...</Typography>
                    ) : (
                        <Box sx={{ marginTop: '20px' }}>
                            {records.length === 0 ? (
                                <Typography sx={{ color: '#999', textAlign: 'center' }}>No records found.</Typography>
                            ) : (
                                records.map((record, index) => (
                                    <Card key={index} sx={{ marginBottom: '15px', padding: '20px', boxShadow: 3, borderRadius: '10px' }}>
                                        <Typography sx={{ color: '#777', fontSize: '14px' }}>
                                            <strong>Date:</strong> {new Date(record.updatedAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: record.condition === 'Normal' ? 'green' : 'red',
                                                fontWeight: record.condition === 'Normal' ? 'bold' : 'normal',
                                                fontSize: '16px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <strong>Condition:</strong> {record.condition}
                                        </Typography>
                                        <Divider sx={{ marginBottom: '10px' }} />
                                        <Typography sx={{ color: '#555' }}>
                                            <strong>Remarks:</strong> {record.remarks}
                                        </Typography>
                                    </Card>
                                ))
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default HealthHistory;