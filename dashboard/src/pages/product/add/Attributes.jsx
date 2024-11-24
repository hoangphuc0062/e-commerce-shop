import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
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

export default function Attributes({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  openRows,
  setOpenRows,
  toggleRow,
}) {
  return (
    <>
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
          <Typography variant="h6">Thuộc tính sản phẩm</Typography>
        </Grid>
        <Grid item xs={12}>
          <FieldArray
            name="attributes"
            render={(arrayHelpers) => (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tiêu đề thuộc tính</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.attributes.map((attribute, attributeIndex) => (
                        <React.Fragment key={attributeIndex}>
                          {/* Main Attribute Row */}
                          <TableRow>
                            <TableCell>
                              <TextField
                                fullWidth
                                label="Tiêu đề thuộc tính"
                                name={`attributes[${attributeIndex}].title`}
                                value={attribute.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  errors.attributes?.[attributeIndex]?.title &&
                                    touched.attributes?.[attributeIndex]?.title
                                )}
                                helperText={
                                  touched.attributes?.[attributeIndex]?.title &&
                                  errors.attributes?.[attributeIndex]?.title
                                }
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                  arrayHelpers.remove(attributeIndex);
                                  setOpenRows((prev) =>
                                    prev.filter(
                                      (_, index) => index !== attributeIndex
                                    )
                                  );
                                }}
                                startIcon={<Delete />}
                              >
                                Xóa
                              </Button>
                              <IconButton
                                onClick={() => toggleRow(attributeIndex)}
                                sx={{ marginLeft: 1 }}
                              >
                                {openRows[attributeIndex] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>

                          {/* Collapsible Details Row */}
                          <TableRow>
                            <TableCell colSpan={2} style={{ padding: 0 }}>
                              <Collapse
                                in={openRows[attributeIndex]}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 2 }}>
                                  <Table size="small">
                                    <TableBody>
                                      <FieldArray
                                        name={`attributes[${attributeIndex}].details`}
                                        render={(detailArrayHelpers) => (
                                          <>
                                            {attribute.details.map(
                                              (detail, detailIndex) => (
                                                <TableRow key={detailIndex}>
                                                  <TableCell
                                                    sx={{
                                                      borderBottom: "none",
                                                    }}
                                                  >
                                                    <TextField
                                                      fullWidth
                                                      label="Tên chi tiết"
                                                      name={`attributes[${attributeIndex}].details[${detailIndex}].key`}
                                                      value={detail.key}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      error={Boolean(
                                                        errors.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.key &&
                                                          touched.attributes?.[
                                                            attributeIndex
                                                          ]?.details?.[
                                                            detailIndex
                                                          ]?.key
                                                      )}
                                                      helperText={
                                                        touched.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.key &&
                                                        errors.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.key
                                                      }
                                                    />
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{
                                                      borderBottom: "none",
                                                    }}
                                                  >
                                                    <TextField
                                                      fullWidth
                                                      label="Giá trị chi tiết"
                                                      name={`attributes[${attributeIndex}].details[${detailIndex}].value`}
                                                      value={detail.value}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      error={Boolean(
                                                        errors.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.value &&
                                                          touched.attributes?.[
                                                            attributeIndex
                                                          ]?.details?.[
                                                            detailIndex
                                                          ]?.value
                                                      )}
                                                      helperText={
                                                        touched.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.value &&
                                                        errors.attributes?.[
                                                          attributeIndex
                                                        ]?.details?.[
                                                          detailIndex
                                                        ]?.value
                                                      }
                                                    />
                                                  </TableCell>
                                                  <TableCell
                                                    align="right"
                                                    sx={{
                                                      borderBottom: "none",
                                                    }}
                                                  >
                                                    <IconButton
                                                      color="error"
                                                      onClick={() =>
                                                        detailArrayHelpers.remove(
                                                          detailIndex
                                                        )
                                                      }
                                                    >
                                                      <Delete />
                                                    </IconButton>
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )}
                                            <TableRow>
                                              <TableCell
                                                sx={{ borderBottom: "none" }}
                                                colSpan={3}
                                                align="right"
                                              >
                                                <Button
                                                  variant="outlined"
                                                  startIcon={<Add />}
                                                  onClick={() =>
                                                    detailArrayHelpers.push({
                                                      key: "",
                                                      value: "",
                                                    })
                                                  }
                                                >
                                                  Thêm chi tiết
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          </>
                                        )}
                                      />
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Add Attribute Button */}
                <Box sx={{ textAlign: "right", marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => {
                      arrayHelpers.push({
                        title: "",
                        details: [{ key: "", value: "" }],
                      });
                    }}
                  >
                    Thêm thuộc tính
                  </Button>
                </Box>
              </>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
