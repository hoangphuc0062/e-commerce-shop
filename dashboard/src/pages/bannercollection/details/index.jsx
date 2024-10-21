import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
} from "@mui/material";
export default function DeatilBanner(
    { open,
        handleClose,
        selectedData,

    }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={false} // Disable the default maxWidth values
            sx={{ width: '40%', mx: 'auto' }} // Set the width to 40% and center it horizontally
        >
            <DialogContent sx={{ padding: 4, maxHeight: '60vh', overflowY: 'auto' }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <img
                        src={selectedData.image}
                        alt={selectedData.collection}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '200px',
                            margin: '0 auto',
                            display: 'block',
                        }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {selectedData?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Bộ sưu tập: {selectedData?.collection}
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Trạng thái:</strong> {selectedData?.status}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Mức độ ưu tiên:</strong> {selectedData?.priority}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Ngày bắt đầu:</strong> {selectedData?.startDate}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Ngày kết thúc:</strong> {selectedData?.endDate}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>


    )
}
