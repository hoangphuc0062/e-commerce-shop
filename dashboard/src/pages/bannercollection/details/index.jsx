import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
export default function DeatilBanner(
    { open,
        handleClose,
        selectedData,
    }) {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogContent>
                {selectedData ? (
                    <Box>
                        <Typography variant="h6">{selectedData.name}</Typography>
                        <Typography variant="subtitle1">
                            Bộ sưu tập: {selectedData.collection}
                        </Typography>
                        <Typography variant="body1">
                            Trạng thái: {selectedData.status}
                        </Typography>
                        <Typography variant="body1">
                            Mức độ ưu tiên: {selectedData.priority}
                        </Typography>
                        <Typography variant="body1">
                            Ngày bắt đầu: {selectedData.startDate}
                        </Typography>
                        <Typography variant="body1">
                            Ngày kết thúc: {selectedData.endDate}
                        </Typography>
                        <Box mt={2}>
                            <img
                                src={selectedData.widthBanner}
                                alt={selectedData.collection}
                                style={{ width: '100%' }}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1">No data available</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    )
}
