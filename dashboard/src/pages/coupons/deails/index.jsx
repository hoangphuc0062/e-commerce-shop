import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
} from "@mui/material";
import { Stack } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import propTypes from "prop-types";
import { StatusChip } from "../../../components/StatusColor"; // Assuming you have a StatusChip component
import { fDateVN } from "../../../utils/format-time"; // Assuming this formats dates

const EyeCoupons = ({ open, handleClose, selectedData }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {selectedData?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {selectedData?.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgb(73, 158, 255)", fontWeight: "bold" }}>
                        {selectedData?.code}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <LocalOfferIcon sx={{ marginRight: 1 }} />Loại :
                        <Typography>{`${selectedData?.discount} ${selectedData?.type}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <DateRangeIcon sx={{ marginRight: 1 }} />
                        <Typography>
                            <span style={{ display: "block" }}>Ngày bắt đầu</span>
                            <span>{fDateVN(selectedData?.startDate)}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <CategoryIcon sx={{ marginRight: 1 }} />
                        <Typography>
                            <span style={{ display: "block" }}>Danh mục áp dụng</span>
                            <span>
                                {selectedData?.categoryApply.join(', ')}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <DateRangeIcon sx={{ marginRight: 1 }} />
                        <Typography>
                            <span style={{ display: "block" }}>Ngày kết thúc</span>
                            <span>{fDateVN(selectedData?.endDate)}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Hãng áp dụng</span>
                            <span>{selectedData?.brandApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Bộ sưu tập áp dụng</span>
                            <span>{selectedData?.collectionApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Sản phẩm áp dụng</span>
                            <span>{selectedData?.productApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Sản phẩm không áp dụng</span>
                            <span>{selectedData?.productNotApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Hãng không áp dụng</span>
                            <span>{selectedData?.brandNotApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Bộ sưu tập không áp dụng</span>
                            <span>{selectedData?.collectionNotApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>
                            <span style={{ display: "block" }}>Danh mục không áp dụng</span>
                            <span>{selectedData?.categoryNotApply.join(', ')}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>{`Số lượng: ${selectedData?.quantity}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <Typography>{`Số lượng đã dùng: ${selectedData?.quantityUsed}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        {selectedData?.status && <StatusChip status={selectedData?.status} />}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>

    );
};

EyeCoupons.propTypes = {
    open: propTypes.bool,
    handleClose: propTypes.func,
    selectedData: propTypes.object,
};

export default EyeCoupons;
