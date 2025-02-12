import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RecordsTable = ({ searchTerm, setSearchTerm }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch records from the backend
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get');
                setRecords(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch records');
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    // Filter records based on the search term
    const filteredRecords = records.filter((record) =>
        Object.values(record).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) {
        return <Typography variant="h6">Loading records...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: 3,
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                View Patient Records
            </Typography>

            {/* Total Records and Search */}
            <Box
                sx={{
                    display: 'flex', // Row layout for the search and total records
                    justifyContent: 'space-between', // Space between the items
                    alignItems: 'center', // Align items vertically centered
                    marginBottom: 3,
                }}
            >
                {/* Total Records */}
                <Typography
                    variant="body1"
                    sx={{
                        color: '#333',
                        fontSize: '1rem',
                    }}
                >
                    Total Records: {filteredRecords.length}
                </Typography>

                {/* Search Bar */}
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                            color: '#333',
                            '& fieldset': {
                                borderColor: 'rgba(39, 36, 36, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: '#00E0FF',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#333',
                                borderWidth: '.8px',
                            },
                        },
                        width: { xs: '100%', sm: '300px' },
                    }}
                />
            </Box>

            {/* Records Table */}
            <TableContainer component={Paper} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: 'rgba(0, 224, 255, 0.2)',
                            }}
                        >
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Age</strong></TableCell>
                            <TableCell><strong>Gender</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Address</strong></TableCell>
                            <TableCell><strong>Condition</strong></TableCell>
                            <TableCell><strong>Remarks</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    sx={{
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 224, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <TableCell>{record.name}</TableCell>
                                    <TableCell>{record.age}</TableCell>
                                    <TableCell>{record.gender}</TableCell>
                                    <TableCell>{record.phone}</TableCell>
                                    <TableCell>{record.address}</TableCell>
                                    <TableCell>{record.condition}</TableCell>
                                    <TableCell>{record.remarks}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ color: '#333' }}>
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
};

export default RecordsTable;
