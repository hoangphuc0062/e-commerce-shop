import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const NotificationModal = ({ open, message, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    {message}
                </Typography>
                <Button onClick={onClose} color="primary" variant="contained" sx={{ mt: 2 }}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

export default NotificationModal;
