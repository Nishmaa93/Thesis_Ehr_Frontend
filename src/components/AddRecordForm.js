import ImageIcon from '@mui/icons-material/Image';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tesseract from 'tesseract.js';

const steps = ['Adding Details', 'Upload Scan', 'Result'];

const AddRecordForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTab, setActiveTab] = useState(0); // Tab state for manual or automatic
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        condition: '',
        phone: '',
        remarks: '',
        address: '',
    });
    const [uploading, setUploading] = useState(false);
    const [ocrError, setOcrError] = useState('');
    const [ocrProgress, setOcrProgress] = useState(0);
    const [extractedText, setExtractedText] = useState('');
    const [scanFile, setScanFile] = useState(null);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanError, setScanError] = useState('');

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevStep) => prevStep - 1);
        }
    };

    const handleSave = async () => {
        try {

            if (formData.condition === '') { formData.condition = 'Normal' }
            if (formData.remarks === '') { formData.remarks = 'No remarks' }
            const response = await axios.post('http://localhost:5000/api/records', formData);
            toast.success(response.data.message, {
                position: "top-right"
            });
            // console.log('Response:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error saving record:', error);
            toast.error('Failed to save record. Please try again.', {
                position: "top-right"
            });
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setActiveTab(0);
        setFormData({
            name: '',
            age: '',
            gender: '',
            address: '',
            phone: '',
            condition: '',
            remarks: '',
        });
        setUploading(false);
        setOcrError('');
        setOcrProgress(0);
        setExtractedText('');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            setOcrProgress(0);
            setOcrError('');
            setExtractedText('');

            try {
                const result = await Tesseract.recognize(file, 'eng', {
                    logger: (info) => {
                        if (info.status === 'recognizing text') {
                            setOcrProgress(Math.round(info.progress * 100));
                        }
                    },
                });

                const extractedText = result.data.text;
                setExtractedText(extractedText);

                const name = extractedText.match(/Patient Name:\s*(.+)/i)?.[1] || '';
                const age = extractedText.match(/Age:\s*(\d+)/i)?.[1] || '';
                const gender = extractedText.match(/Gender:\s*(\w+)/i)?.[1] || '';
                const phone = extractedText.match(/Phone:\s*(\d+)/i)?.[1] || '';
                const address = extractedText.match(/Address:\s*(.+)/i)?.[1] || '';

                setFormData({
                    name,
                    age,
                    gender,
                    condition: '',
                    phone,
                    address,
                    remarks: '',
                });
            } catch (error) {
                console.error('OCR Error:', error);
                setOcrError('Failed to extract text from the uploaded image.');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleScanUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            setScanProgress(0);
            setScanError('');
            setExtractedText('');

            const formDataToSend = new FormData();
            formDataToSend.append('image', file);

            try {
                const response = await axios.post('http://localhost:5000/api/predict', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setScanProgress(progress);
                    },
                });

                const { predictedClass, confidence, recommendations } = response.data;
                if (predictedClass === 'TURBERCULOSIS') {
                    predictedClass = 'TUBERCULOSIS';
                }

                // Update extracted text and formData with prediction results
                setExtractedText(`Predicted Class: ${predictedClass}\nConfidence: ${confidence}\nRecommendations: ${recommendations}`);
                setFormData((prev) => ({
                    ...prev,
                    condition: predictedClass || 'N/A',
                    remarks: recommendations || 'No recommendations available',
                }));
            } catch (error) {
                console.error('Prediction Upload Error:', error);
                setScanError('Failed to process the uploaded scan. Please try again.');
            } finally {
                setUploading(false); // Reset uploading status
            }
        }
    };



    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{
                width: 700,
                height: 700,
                margin: '0 auto',
                padding: 4,
                background: 'linear-gradient(135deg, #FFFFFF, #E8E8E8)',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                color: '#000',
            }}
        >
            <Typography
                variant="h5"
                textAlign="center"
                mb={4}
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    color: '#333',
                }}
            >
                Add Patient Record
            </Typography>

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Content */}
            <Box sx={{ mt: 4 }}>
                {activeStep === 0 && (
                    <>
                        <Tabs value={activeTab} onChange={handleTabChange} centered>
                            <Tab label="Manual Entry" />
                            <Tab label="Automatic Entry (OCR)" />
                        </Tabs>

                        {activeTab === 0 && (
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    type="text"
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                />
                            </Box>
                        )}

                        {activeTab === 1 && (
                            <Box textAlign="center" mt={3}>
                                <IconButton
                                    component="label"
                                    sx={{
                                        border: '2px dashed #1976d2',
                                        padding: 4,
                                        borderRadius: 2,
                                        color: '#1976d2',
                                    }}
                                >
                                    <ImageIcon fontSize="large" />
                                    <Typography variant="body2">Upload Image for OCR</Typography>
                                    <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                </IconButton>

                                {uploading && (
                                    <Box textAlign="center" mt={2}>
                                        <CircularProgress />
                                        <Typography variant="body2" mt={1}>
                                            Extracting text ({ocrProgress}%)
                                        </Typography>
                                    </Box>
                                )}

                                {ocrError && (
                                    <Typography color="error" textAlign="center" mt={2}>
                                        {ocrError}
                                    </Typography>
                                )}

                                {extractedText && (
                                    <Box
                                        sx={{
                                            mt: 3,
                                            p: 2,
                                            border: '1px solid #ddd',
                                            borderRadius: 2,
                                            backgroundColor: '#f9f9f9',
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Extracted Text:</strong>
                                        </Typography>
                                        <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                                            {extractedText}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </>
                )}

                {activeStep === 1 && (
                    <Box textAlign="center" mt={3}>
                        <Typography variant="body1" mb={2}>
                            Upload an additional scan for verification.
                        </Typography>
                        <IconButton
                            component="label"
                            sx={{
                                border: '2px dashed #1976d2',
                                padding: 4,
                                borderRadius: 2,
                                color: '#1976d2',
                            }}
                        >
                            <ImageIcon fontSize="large" />
                            <Typography variant="body2">Upload Scan</Typography>
                            <input hidden accept="image/*,application/pdf" type="file" onChange={handleScanUpload} />
                        </IconButton>

                        {uploading && (
                            <Box textAlign="center" mt={2}>
                                <CircularProgress />
                                <Typography variant="body2" mt={1}>
                                    Uploading scan ({scanProgress}%)
                                </Typography>
                            </Box>
                        )}

                        {scanError && (
                            <Typography color="error" textAlign="center" mt={2}>
                                {scanError}
                            </Typography>
                        )}

                        {scanFile && (
                            <Box mt={3}>
                                <Typography variant="body2">
                                    <strong>Uploaded File:</strong> {scanFile.name}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>File Size:</strong> {(scanFile.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </Box>
                        )}
                    </Box>

                )}

                {activeStep === 2 && (
                    <Box>
                        <Typography variant="h6" mb={2}>
                            Summary
                        </Typography>
                        {Object.entries(formData).map(([key, value]) => (
                            <Typography variant="body2" key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || 'N/A'}
                            </Typography>
                        ))}
                    </Box>
                )}


            </Box>

            {/* Navigation Buttons */}
            <Stack direction="row" justifyContent="space-between" mt={4}>
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                    Back
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleNext}>
                        Next
                    </Button>
                )}
            </Stack>
        </Box >
    );
};

export default AddRecordForm;
