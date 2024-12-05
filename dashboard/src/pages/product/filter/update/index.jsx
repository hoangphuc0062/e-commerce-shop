import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../../../../redux/slices/category";
import CustomDropdown from "../../../../components/Dropdown";
import { handleToast } from "../../../../utils/toast";
import {
  getSettingFilterById,
  updateSettingFilter,
} from "../../../../redux/slices/settingFilter";

export default function UpdateFilter() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Danh mục là bắt buộc."),
    filterButton: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required("Tên bộ lọc là bắt buộc."),
        key: Yup.string().required("Khóa là bắt buộc."),
        values: Yup.array()
          .of(Yup.string())
          .min(1, "Ít nhất một giá trị phải được thêm.")
          .required(),
      })
    ),
  });

  const initialValues = {
    category: "",
    filterButton: [{ label: "", key: "", values: [] }],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Update initial values when new data is loaded
    onSubmit: (values) => {
      const payload = {
        ...values,
        filterButton: values.filterButton.map((filter) =>
          filter.key === "price" && filter.label === "Giá"
            ? {
                ...filter,
                values: `min:${filter.values[0] || ""}, max:${
                  filter.values[1] || ""
                }`,
              }
            : { ...filter, values: filter.values.join(", ") }
        ),
      };

      // Uncomment and integrate update action
      dispatch(updateSettingFilter({ id: id, data: { ...payload } })).then(
        (result) => {
          console.log(result);
          if (result.type === "settingFilter/update/fulfilled") {
            handleToast("success", "Cập nhật bộ lọc thành công");
            navigate("/dashboard/filter");
          } else {
            handleToast("error", "Cập nhật bộ lọc thất bại");
          }
        }
      );
    },
  });

  const statusCategory = useSelector((state) => state.category.status);
  const category = useSelector((state) => state.category.data.categories);
  const settingFilter = useSelector(
    (state) => state.settingFilter.data.settingFilter
  );
  const statusSettingFilter = useSelector(
    (state) => state.settingFilter.statusGetById
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getSettingFilterById(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (statusCategory === "success" && category?.length) {
      setCategories(
        category
          .filter((cat) => cat.type === "product")
          .map((cat) => ({
            value: cat.slug,
            label: cat.name,
          }))
      );
    }
  }, [statusCategory, category]);

  useEffect(() => {
    if (statusSettingFilter === "success" && settingFilter) {
      const formattedData = {
        category: settingFilter.category,
        filterButton: settingFilter.filterButton.map((filter) => ({
          label: filter.label,
          key: filter.key,
          values:
            filter.key === "price" && filter.label === "Giá"
              ? filter.values.split(", ")
              : filter.values.split(","),
        })),
      };
      formik.setValues(formattedData);
    }
  }, [statusCategory, category, statusSettingFilter, settingFilter]);

  const handleValueChange = (index, valueIdx, value) => {
    const updatedValues = [...formik.values.filterButton[index].values];
    updatedValues[valueIdx] = value;
    formik.setFieldValue(`filterButton[${index}].values`, updatedValues);
  };

  return (
    <Box
      sx={{
        padding: 4,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <CustomDropdown
            label="Danh mục"
            name="category"
            options={categories}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Bộ lọc
          </Typography>

          <FieldArray
            name="filterButton"
            render={({ push, remove }) => (
              <>
                {formik.values.filterButton.map((filter, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    sx={{ marginBottom: 2 }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Tên bộ lọc"
                        variant="outlined"
                        name={`filterButton[${index}].label`}
                        value={filter.label}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.filterButton?.[index]?.label &&
                          Boolean(formik.errors.filterButton?.[index]?.label)
                        }
                        helperText={
                          formik.touched.filterButton?.[index]?.label &&
                          formik.errors.filterButton?.[index]?.label
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Khóa"
                        variant="outlined"
                        name={`filterButton[${index}].key`}
                        value={filter.key}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.filterButton?.[index]?.key &&
                          Boolean(formik.errors.filterButton?.[index]?.key)
                        }
                        helperText={
                          formik.touched.filterButton?.[index]?.key &&
                          formik.errors.filterButton?.[index]?.key
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {filter.key === "price" && filter.label === "Giá" ? (
                        <Grid container spacing={2}>
                          {["Giá trị nhỏ nhất", "Giá tối đa"].map(
                            (label, idx) => (
                              <Grid item xs={6} key={idx}>
                                <TextField
                                  fullWidth
                                  label={label}
                                  variant="outlined"
                                  value={filter.values[idx] || ""}
                                  onChange={(e) =>
                                    handleValueChange(
                                      index,
                                      idx,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Nhập ${label.toLowerCase()}`}
                                />
                              </Grid>
                            )
                          )}
                        </Grid>
                      ) : (
                        <TextField
                          fullWidth
                          label="Thêm giá trị"
                          variant="outlined"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              e.preventDefault();
                              const newValues = [
                                ...filter.values,
                                e.target.value.trim(),
                              ];
                              formik.setFieldValue(
                                `filterButton[${index}].values`,
                                newValues
                              );
                              e.target.value = "";
                            }
                          }}
                          placeholder="Nhấn Enter để thêm giá trị"
                        />
                      )}
                      <Box>
                        {filter.values.map((value, valueIndex) => (
                          <Chip
                            key={valueIndex}
                            label={value}
                            onDelete={() => {
                              const newValues = filter.values.filter(
                                (_, i) => i !== valueIndex
                              );
                              formik.setFieldValue(
                                `filterButton[${index}].values`,
                                newValues
                              );
                            }}
                            sx={{ marginRight: 1, marginBottom: 1 }}
                          />
                        ))}
                      </Box>
                      {formik.touched.filterButton?.[index]?.values &&
                        formik.errors.filterButton?.[index]?.values && (
                          <Typography variant="caption" color="error">
                            {formik.errors.filterButton[index].values}
                          </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                          color="error"
                          onClick={() => remove(index)}
                          disabled={formik.values.filterButton.length === 1}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        type="button"
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => push({ label: "", key: "", values: [] })}
                      >
                        Thêm Bộ Lọc
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button type="submit" variant="contained">
                  Cập nhật Bộ Lọc
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ marginLeft: 2 }}
                  color="error"
                  onClick={() => navigate("/dashboard/filter")}
                >
                  Hủy
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </Box>
  );
}
