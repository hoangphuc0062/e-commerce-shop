import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Button,
} from "@mui/material";

const Chechoau = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const dataCart = localStorage.getItem("cart");
  console.log(dataCart);

  const fetchProvinces = async () => {
    try {
      const res = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await res.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchDistricts = useCallback(async (provinceCode) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await res.json();
      setDistricts(data.districts || []);
      setWards([]);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }, []);

  const fetchWards = useCallback(async (districtCode) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await res.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const validationSchema = yup.object({
    gender: yup.string().required("Vui lòng chọn giới tính"),
    fullName: yup.string().required("Vui lòng nhập họ và tên"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    city: yup.object().required("Vui lòng chọn tỉnh/thành phố"),
    district: yup.object().required("Vui lòng chọn quận/huyện"),
    ward: yup.object().required("Vui lòng chọn phường/xã"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    paymentMethod: yup
      .string()
      .required("Vui lòng chọn phương thức thanh toán"),
  });

  const formik = useFormik({
    initialValues: {
      gender: "Anh",
      fullName: "",
      phone: "",
      email: "",
      city: null,
      district: null,
      ward: null,
      address: "",
      notes: "",
      shippingFee: 0,
      totalPrice: 25560997,
      paymentMethod: "cash",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        gender: values.gender,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        city: values.city.name,
        district: values.district.name,
        ward: values.ward.name,
        address: values.address,
        notes: values.notes,
        totalPrice: values.totalPrice,
        paymentMethod: values.paymentMethod,
      };
      console.log("Submitted values:", data);
    },
  });

  return (
    <Box
      sx={{ maxWidth: 600, mx: "auto", p: 2 }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Thông tin khách mua hàng
      </Typography>

      {/* Gender */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <RadioGroup
          row
          value={formik.values.gender}
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
        >
          <FormControlLabel value="Anh" control={<Radio />} label="Anh" />
          <FormControlLabel value="Chị" control={<Radio />} label="Chị" />
          <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
        </RadioGroup>
        {formik.errors.gender && (
          <Typography color="error" variant="caption">
            {formik.errors.gender}
          </Typography>
        )}
      </FormControl>

      {/* Full Name and Phone */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Họ Và Tên"
          fullWidth
          {...formik.getFieldProps("fullName")}
          error={Boolean(formik.errors.fullName)}
          helperText={formik.errors.fullName}
        />
        <TextField
          label="Số Điện Thoại"
          fullWidth
          {...formik.getFieldProps("phone")}
          error={Boolean(formik.errors.phone)}
          helperText={formik.errors.phone}
        />
      </Box>

      {/* Email */}
      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        {...formik.getFieldProps("email")}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email}
      />

      {/* City/Province */}
      <Autocomplete
        options={provinces}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option.code === value?.code}
        value={formik.values.city}
        onChange={(e, value) => {
          formik.setFieldValue("city", value);
          if (value) fetchDistricts(value.code);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tỉnh/Thành phố"
            error={Boolean(formik.errors.city)}
            helperText={formik.errors.city?.name}
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* District */}
      <Autocomplete
        options={districts}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option.code === value?.code}
        value={formik.values.district}
        onChange={(e, value) => {
          formik.setFieldValue("district", value);
          if (value) fetchWards(value.code);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Quận/Huyện"
            disabled={!districts.length}
            error={Boolean(formik.errors.district)}
            helperText={formik.errors.district?.name}
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* Ward */}
      <Autocomplete
        options={wards}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option.code === value?.code}
        value={formik.values.ward}
        onChange={(e, value) => formik.setFieldValue("ward", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Phường/Xã"
            disabled={!wards.length}
            error={Boolean(formik.errors.ward)}
            helperText={formik.errors.ward?.name}
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* Address */}
      <TextField
        label="Số nhà, Tên đường"
        fullWidth
        sx={{ mb: 2 }}
        {...formik.getFieldProps("address")}
        error={Boolean(formik.errors.address)}
        helperText={formik.errors.address}
      />

      {/* Notes */}
      <TextField
        label="Ghi chú"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        {...formik.getFieldProps("notes")}
      />

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Thông tin thanh toán
      </Typography>

      {/* Payment Method */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Phương thức thanh toán</FormLabel>
        <RadioGroup
          row
          value={formik.values.paymentMethod}
          onChange={(e) =>
            formik.setFieldValue("paymentMethod", e.target.value)
          }
        >
          <FormControlLabel value="cash" control={<Radio />} label="Tiền mặt" />
          <FormControlLabel value="vnpay" control={<Radio />} label="VNPAY" />
        </RadioGroup>
        {formik.errors.paymentMethod && (
          <Typography color="error" variant="caption">
            {formik.errors.paymentMethod}
          </Typography>
        )}
      </FormControl>

      {/* Shipping Fee and Total */}
      <Typography sx={{ mb: 1 }}>
        <strong>Tiền ship:</strong> {formik.values.shippingFee.toLocaleString()}{" "}
        VND
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Tổng tiền:</strong> {formik.values.totalPrice.toLocaleString()}{" "}
        VND
      </Typography>

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Xác nhận
      </Button>
    </Box>
  );
};

export default Chechoau;
