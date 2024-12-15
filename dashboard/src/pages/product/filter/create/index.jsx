/* eslint-disable react/jsx-no-duplicate-props */
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../../../../redux/slices/category";
import CustomDropdown from "../../../../components/Dropdown";
import { createSettingFilter } from "../../../../redux/slices/settingFilter";
import { handleToast } from "../../../../utils/toast";

export default function CreateFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required("Danh mục là bắt buộc.")
      .min(2, "Danh mục phải có ít nhất 2 ký tự."),
    filterButton: Yup.array().of(
      Yup.object().shape({
        label: Yup.string()
          .required("Tên bộ lọc là bắt buộc.")
          .min(2, "Tên bộ lọc phải có ít nhất 2 ký tự."),
        key: Yup.string()
          .required("Khóa là bắt buộc.")
          .min(2, "Khóa phải có ít nhất 2 ký tự."),
        values: Yup.array()
          .of(Yup.string())
          .min(1, "Ít nhất một giá trị phải được thêm.")
          .required("Ít nhất một giá trị phải được thêm."),
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
    onSubmit: (values, { resetForm }) => {
      const payload = {
        ...values,
        filterButton: values.filterButton.map((filter) => {
          if (filter.key === "price" && filter.label === "Giá") {
            const [min, max] = filter.values;
            return {
              ...filter,
              values: `min:${min || ""}, max:${max || ""}`,
            };
          } else {
            return {
              ...filter,
              values: filter.values.join(", "),
            };
          }
        }),
      };

      dispatch(createSettingFilter(payload)).then((result) => {
        if (result.type === "settingFilter/create/fulfilled") {
          handleToast("success", "Thêm bộ lọc thành công");
        } else {
          handleToast("error", "Thêm bộ lọc thất bại");
        }
      });
      resetForm();
    },
  });

  const statusCategory = useSelector((state) => state.category.status);
  const category = useSelector((state) => state.category.data.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

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
                    sx={{ marginBottom: 2, alignItems: "center" }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Tên bộ lọc"
                        variant="outlined"
                        name={`filterButton[${index}].label`}
                        value={formik.values.filterButton[index].label}
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
                        value={formik.values.filterButton[index].key}
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
                      {formik.values.filterButton[index].key === "price" &&
                      formik.values.filterButton[index].label === "Giá" ? (
                        <>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Giá trị nhỏ nhất"
                                variant="outlined"
                                value={
                                  formik.values.filterButton[index].values[0] ||
                                  ""
                                }
                                onChange={(e) => {
                                  const newValues = [
                                    ...formik.values.filterButton[index].values,
                                  ];
                                  newValues[0] = e.target.value;
                                  formik.setFieldValue(
                                    `filterButton[${index}].values`,
                                    newValues
                                  );
                                }}
                                placeholder="Nhập giá trị nhỏ nhất"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Giá tối đa"
                                variant="outlined"
                                value={
                                  formik.values.filterButton[index].values[1] ||
                                  ""
                                }
                                onChange={(e) => {
                                  const newValues = [
                                    ...formik.values.filterButton[index].values,
                                  ];
                                  newValues[1] = e.target.value;
                                  formik.setFieldValue(
                                    `filterButton[${index}].values`,
                                    newValues
                                  );
                                }}
                                placeholder="Nhập giá trị lớn nhất"
                              />
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <TextField
                          fullWidth
                          label="Thêm giá trị"
                          variant="outlined"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              e.preventDefault();
                              const newValues = [
                                ...formik.values.filterButton[index].values,
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
                          fullWidth
                        />
                      )}
                      <Box>
                        {formik.values.filterButton[index].values.map(
                          (value, valueIndex) => (
                            <Chip
                              key={valueIndex}
                              label={value}
                              onDelete={() => {
                                const newValues = formik.values.filterButton[
                                  index
                                ].values.filter((_, i) => i !== valueIndex);
                                formik.setFieldValue(
                                  `filterButton[${index}].values`,
                                  newValues
                                );
                              }}
                              sx={{ marginRight: 1, marginBottom: 1 }}
                            />
                          )
                        )}
                      </Box>
                      {formik.touched.filterButton?.[index]?.values &&
                        formik.errors.filterButton?.[index]?.values && (
                          <Typography variant="caption" color="error">
                            {formik.errors.filterButton[index].values}
                          </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        type="button"
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => push({ label: "", key: "", values: [] })}
                        sx={{ marginBottom: 2 }}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="submit" variant="contained">
                  Thêm Bộ Lọc
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
