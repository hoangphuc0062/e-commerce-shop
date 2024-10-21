import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReusableTable from '../../components/Table';
import DetailBanner from './details';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./SliderBanner.css";
//  sử lý swiper
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
// Sample data for banners
const columns = [
    { label: "Tên công ty", field: "name" },
    { label: "Bộ sưu tập", field: "collection" },
    { label: "Hình ảnh", field: "image" },
    { label: "Trạng thái ", field: "status" },
    { label: "Ngày bắt đầu", field: "startDate" },
    { label: "Ngày kết thúc", field: "endDate" },
];
const initialData = [
    {
        id: 1090909,
        name: "Thế Giới Di Động",
        collection: "Bộ sưu tập Điện Thoại Smartphone",
        image: "https://s.net.vn/kWGE",
        status: "active",
        priority: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31"

    },
    {
        id: 20909090909,
        name: "FPT Shop",
        collection: "Bộ sưu tập Laptop Gaming",
        image: "https://example.com/banner_laptop_gaming.jpg",
        status: "active",
        priority: 2,
        startDate: "2024-02-01",
        endDate: "2024-11-30"
    },
    {
        id: 3090909090,
        name: "CellphoneS",
        collection: "Bộ sưu tập Máy Tính Bảng",
        image: "https://example.com/banner_tablet.jpg",
        status: "inactive",
        priority: 3,
        startDate: "2024-03-15",
        endDate: "2024-09-15"
    }
];
// Collection names array (mapped to tabs)
const collections = [
    {
        name: "Bộ sưu tập Điện Thoại Smartphone",
        label: "Smartphone",
        images: [
            "https://s.net.vn/kWGE",
            "https://s.pro.vn/ZP8E",
            "https://s.net.vn/r72j"
        ],
        title: "Banner-1",
        descrtiption: "This is banner 1",
    },
    {
        name: "Bộ sưu tập Laptop Gaming",
        label: "Laptop Gaming",
        images: [
            "https://example.com/banner_laptop_gaming.jpg",
            "https://example.com/laptop_image_2.jpg",
            "https://example.com/laptop_image_3.jpg"
        ],
        title: "Banner-2",
        descrtiption: "This is banner 2",
    },
    {
        name: "Bộ sưu tập Máy Tính Bảng",
        label: "Máy Tính Bảng",
        images: [
            "https://example.com/banner_tablet.jpg",
            "https://example.com/tablet_image_2.jpg",
            "https://example.com/tablet_image_3.jpg"
        ],
        title: "Banner-3",
        descrtiption: "This is banner 3",
    }
];
export default function BannerCollection() {
    const [value, setValue] = useState(0); // Tab state
    const [selectedData, setSelectedData] = useState(null); // For detail view
    const [open, setOpen] = useState(false); // To control the detail dialog
    const [selectedDataEdit, setSelectedDataEdit] = useState(null); // For edit view
    const [openEdit, setOpenEdit] = useState(false); // To control the edit dialog
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleEdit = (id) => {
        navigate(`/dashboard/bannercollection/edit/${id}`);
    };
    const handleDelete = (index) => {
        console.log("Delete", index);
    };
    const handleEye = (data) => {
        setSelectedData(data);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Filter data based on the selected collection
    const filteredData = initialData.filter(item => item.collection === collections[value].name);
    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', width: '100%' }}>
            {/* Tabs section */}
            <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Horizontal tabs example"
                sx={{ borderBottom: 1, borderColor: 'divider' }} // Use borderBottom for horizontal tabs
            >
                {collections.map((collection, index) => (
                    <Tab key={index} label={collection.label} {...a11yProps(index)} />
                ))}
            </Tabs>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        thumbs={{
                            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                        }}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        className="mySwiper2"
                    >
                        {collections[value].images.map((image, index) => (
                            <SwiperSlide key={index}   >
                                <img
                                    src={image}
                                    alt={`${collections[value].label} ${index + 1}`}
                                    style={{ width: '100%', height: "100%", objectFit: 'cover' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper"
                    >
                        {/* pasting du lieu o day */}
                        {collections.map((collection, index) => (
                            <SwiperSlide key={index}>
                                <button className="p-2 ">
                                    <h1>{collection.title}</h1>
                                    <h6>{collection.descrtiption}</h6>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={8}>
                    {/* Tab Panel content */}
                    {collections.map((collection, index) => (
                        <TabPanel key={index} value={value} index={index} sx={{ width: '100%' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    {/* Changed from <Typography> to <div> for wrapping */}
                                    <div style={{ marginBottom: 2 }}>
                                        <Typography variant="h6" component="h2">
                                            {collection.label}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <ReusableTable
                                            data={filteredData}
                                            columns={columns}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            handleEye={handleEye}
                                            navigate={"/dashboard/bannercollection/create"}
                                        />
                                        {selectedData && (
                                            <DetailBanner
                                                open={open}
                                                handleClose={handleClose}
                                                selectedData={selectedData}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEdit}
                                            />
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}
