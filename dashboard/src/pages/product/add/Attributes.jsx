/* eslint-disable react/prop-types */
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Collapse,
  Box,
} from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import { FieldArray } from "formik";
export default function Attributes({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  openRows,
  toggleRow,
}) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Thuộc tính sản phẩm
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldArray
            name="attributes"
            render={(arrayHelpers) => (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Tiêu đề thuộc tính</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} align="right">
                          <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() =>
                              arrayHelpers.push({
                                title: "",
                                details: [{ key: "", value: "" }],
                              })
                            }
                            sx={{ mt: 2 }}
                          >
                            Thêm thuộc tính
                          </Button>
                        </TableCell>
                      </TableRow>
                      {values.attributes.map((attribute, attributeIndex) => (
                        <React.Fragment key={attributeIndex}>
                          {/* Main Attribute Row */}

                          <TableRow>
                            <TableCell>
                              <IconButton
                                onClick={() => toggleRow(attributeIndex)}
                              >
                                {openRows[attributeIndex] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            </TableCell>
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
                                onClick={() =>
                                  arrayHelpers.remove(attributeIndex)
                                }
                                startIcon={<Delete />}
                              >
                                Xóa
                              </Button>
                            </TableCell>
                          </TableRow>

                          {/* Collapsible Details Row */}
                          <TableRow>
                            <TableCell colSpan={3} style={{ padding: 0 }}>
                              <Collapse
                                in={openRows[attributeIndex]}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 2 }}>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Tên chi tiết</TableCell>
                                        <TableCell>Giá trị chi tiết</TableCell>
                                        <TableCell>Hành động</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <FieldArray
                                        name={`attributes[${attributeIndex}].details`}
                                        render={(detailArrayHelpers) => (
                                          <>
                                            <TableRow>
                                              <TableCell
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

                                            {attribute.details.map(
                                              (detail, detailIndex) => (
                                                <TableRow key={detailIndex}>
                                                  <TableCell>
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
                                                  <TableCell>
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
                                                  <TableCell align="right">
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
              </>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
