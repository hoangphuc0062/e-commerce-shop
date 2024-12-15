import {
  Add,
  CheckBox,
  Delete,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray } from "formik";
import React from "react";
import ImageUploader from "../../../components/upload";

export default function Variants({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  openRows,
  toggleRow,
}) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        backgroundColor: "background.default",
        p: 4,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 1,
        mb: 4,
        width: { xs: "100%", sm: "100%" },
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Các biến thể sản phẩm</Typography>
      </Grid>
      <Grid item xs={12}>
        <FieldArray
          name="variants"
          render={(arrayHelpers) => (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên biến thể</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values?.variants?.map((variant, variantIndex) => (
                      <React.Fragment key={variantIndex}>
                        {/* Main Variant Row */}
                        <TableRow>
                          <TableCell>
                            <TextField
                              fullWidth
                              label="Tên biến thể"
                              name={`variants[${variantIndex}].key`}
                              value={variant.key}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors.variants?.[variantIndex]?.key &&
                                  touched.variants?.[variantIndex]?.key
                              )}
                              helperText={
                                touched.variants?.[variantIndex]?.key &&
                                errors.variants?.[variantIndex]?.key
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              label="Giá"
                              name={`variants[${variantIndex}].price`}
                              value={variant.price}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors.variants?.[variantIndex]?.price &&
                                  touched.variants?.[variantIndex]?.price
                              )}
                              helperText={
                                touched.variants?.[variantIndex]?.price &&
                                errors.variants?.[variantIndex]?.price
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => arrayHelpers.remove(variantIndex)}
                              startIcon={<Delete />}
                            >
                              Xóa
                            </Button>
                            <IconButton
                              onClick={() => toggleRow(variantIndex)}
                              sx={{ marginLeft: 1 }}
                            >
                              {openRows[variantIndex] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          </TableCell>
                        </TableRow>

                        {/* Collapsible Values Row */}
                        <TableRow>
                          <TableCell colSpan={3} style={{ padding: 0 }}>
                            <Collapse
                              in={openRows[variantIndex]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 2 }}>
                                <Typography variant="subtitle1">
                                  Giá trị biến thể
                                </Typography>
                                <FieldArray
                                  name={`variants[${variantIndex}].values`}
                                  render={(valueArrayHelpers) => (
                                    <>
                                      {variant?.values?.map(
                                        (value, valueIndex) => (
                                          <Box
                                            key={valueIndex}
                                            sx={{
                                              mb: 3,
                                              p: 2,
                                              border: "1px solid #e0e0e0",
                                              borderRadius: 2,
                                            }}
                                          >
                                            <Grid container spacing={2}>
                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="ID"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].id`}
                                                  value={value.id}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.id &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.id
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.id &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]?.id
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Tên giá trị"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].name`}
                                                  value={value.name}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.name &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.name
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.name &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.name
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Giá"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].price`}
                                                  value={value.price}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.price &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.price
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.price &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.price
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Đơn vị"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].unit`}
                                                  value={value.unit}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.unit &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.unit
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.unit &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.unit
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Hàng tồn kho"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].inventory`}
                                                  value={value.inventory}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inventory &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.inventory
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inventory &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inventory
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Số lượng tồn kho"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].onStock`}
                                                  value={value.onStock}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.onStock &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.onStock
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.onStock &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.onStock
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Sắp về"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].inComing`}
                                                  value={value.inComing}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inComing &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.inComing
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inComing &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.inComing
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Số lượng tối thiểu trong kho"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].minInventory`}
                                                  value={value.minInventory}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.minInventory &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.minInventory
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.minInventory &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.minInventory
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Số lượng tối đa trong Hàng tồn"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].maxInventory`}
                                                  value={value.maxInventory}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.maxInventory &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.maxInventory
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.maxInventory &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.maxInventory
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <TextField
                                                  fullWidth
                                                  label="Lượt xem"
                                                  name={`variants[${variantIndex}].values[${valueIndex}].view`}
                                                  value={value.view}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  error={Boolean(
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.view &&
                                                      touched.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.view
                                                  )}
                                                  helperText={
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.view &&
                                                    errors.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.view
                                                  }
                                                />
                                              </Grid>

                                              <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                  control={
                                                    <Checkbox
                                                      name={`variants[${variantIndex}].values[${valueIndex}].stopSelling`}
                                                      checked={
                                                        value.stopSelling
                                                      }
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      color="primary"
                                                    />
                                                  }
                                                  label="Ngừng bán"
                                                />
                                                {Boolean(
                                                  errors.variants?.[
                                                    variantIndex
                                                  ]?.values?.[valueIndex]
                                                    ?.stopSelling &&
                                                    touched.variants?.[
                                                      variantIndex
                                                    ]?.values?.[valueIndex]
                                                      ?.stopSelling
                                                ) && (
                                                  <FormHelperText error>
                                                    {
                                                      errors.variants?.[
                                                        variantIndex
                                                      ]?.values?.[valueIndex]
                                                        ?.stopSelling
                                                    }
                                                  </FormHelperText>
                                                )}
                                              </Grid>

                                              <Grid item xs={12}>
                                                <ImageUploader
                                                  fooder={"products"}
                                                  onUploadComplete={(url) =>
                                                    handleChange({
                                                      target: {
                                                        name: `variants[${variantIndex}].values[${valueIndex}].thumbnail`,
                                                        value: url[0],
                                                      },
                                                    })
                                                  }
                                                  idupload={`uploadFile${valueIndex}`}
                                                  name={`variants[${variantIndex}].values[${valueIndex}].thumbnail`}
                                                  dataImage={
                                                    value.thumbnail
                                                      ? [value.thumbnail]
                                                      : []
                                                  }
                                                  onDelete={(index) => {
                                                    handleChange({
                                                      target: {
                                                        name: `variants[${variantIndex}].values[${valueIndex}].thumbnail`,
                                                        value: "",
                                                      },
                                                    });
                                                  }}
                                                  avatarSize={100}
                                                />
                                              </Grid>
                                              <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                              >
                                                <IconButton
                                                  color="error"
                                                  onClick={() =>
                                                    valueArrayHelpers.remove(
                                                      valueIndex
                                                    )
                                                  }
                                                >
                                                  <Delete />
                                                </IconButton>
                                              </Grid>
                                            </Grid>
                                          </Box>
                                        )
                                      )}
                                      <Box sx={{ textAlign: "right" }}>
                                        <Button
                                          variant="outlined"
                                          startIcon={<Add />}
                                          onClick={() =>
                                            valueArrayHelpers.push({
                                              id: "",
                                              name: "",
                                              price: "",
                                              thumbnail: "",
                                              unit: "",
                                              inventory: "",
                                              onStock: "",
                                              inComing: "",
                                              minInventory: "",
                                              maxInventory: "",
                                              stopSelling: false,
                                              view: "",
                                            })
                                          }
                                        >
                                          Thêm giá trị
                                        </Button>
                                      </Box>
                                    </>
                                  )}
                                />
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ textAlign: "right", marginTop: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() =>
                    arrayHelpers.push({
                      key: "",
                      price: "",
                      values: [
                        {
                          id: "",
                          name: "",
                          price: "",
                          thumbnail: "",
                          unit: "",
                          inventory: "",
                          onStock: "",
                          inComing: "",
                          minInventory: "",
                          maxInventory: "",
                          stopSelling: false,
                          view: "",
                        },
                      ],
                    })
                  }
                >
                  Thêm biến thể
                </Button>
              </Box>
            </>
          )}
        />
      </Grid>
    </Grid>
  );
}
