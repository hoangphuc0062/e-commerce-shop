/* eslint-disable react/prop-types */
import { memo } from "react";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
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
import ImageUploader from "../../../components/upload";

const fields = [
  { label: "SKU", field: "SKU" },
  { label: "Giá", field: "price" },
  { label: "Giá thị trường", field: "priceInMarket" },
  { label: "Giá lịch sử", field: "historicalPrice" },
  { label: "Khuyến mãi", field: "discount" },
  { label: "Tồn kho", field: "inventory" },
  { label: "Tồn kho tối thiểu", field: "minInventory" },
  { label: "Tồn kho tối đa", field: "maxInventory" },
  { label: "Trong kho", field: "onStock" },
  { label: "Sắp về", field: "inComing" },
];

function VariantsRow({
  variant,
  variantIndex,
  handleChange,
  handleBlur,
  errors,
  touched,
  toggleRow,
  openRows,
  arrayHelpers,
}) {
  return (
    <>
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
            label="Giá Trị"
            name={`variants[${variantIndex}].value`}
            value={variant.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(
              errors.variants?.[variantIndex]?.value &&
                touched.variants?.[variantIndex]?.value
            )}
            helperText={
              touched.variants?.[variantIndex]?.value &&
              errors.variants?.[variantIndex]?.value
            }
          />
        </TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              arrayHelpers.remove(variantIndex);
            }}
            startIcon={<Delete />}
          >
            Xóa
          </Button>
          <IconButton onClick={() => toggleRow(variantIndex)}>
            {openRows[variantIndex] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Collapsible Details Row */}
      <TableRow>
        <TableCell colSpan={3} style={{ padding: 0, borderBottom: "none" }}>
          <Collapse
            in={openRows[variantIndex]}
            timeout="auto"
            unmountOnExit
            sx={{ padding: 2 }}
          >
            <Table size="small">
              <TableBody>
                {fields.map(({ label, field }) => (
                  <TableRow key={field}>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                      }}
                    >
                      <TextField
                        fullWidth
                        label={label}
                        name={`variants[${variantIndex}].${field}`}
                        value={variant[field] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          errors.variants?.[variantIndex]?.[field] &&
                            touched.variants?.[variantIndex]?.[field]
                        )}
                        helperText={
                          touched.variants?.[variantIndex]?.[field] &&
                          errors.variants?.[variantIndex]?.[field]
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Hình ảnh Biến thể</Typography>

                  <ImageUploader
                    idupload={`variants[${variantIndex}].thumbnail`}
                    avatarSize={100}
                    onUploadComplete={(url) => {
                      arrayHelpers.replace(variantIndex, {
                        ...variant,
                        thumbnail: url,
                      });
                    }}
                    onDelete={() => {
                      arrayHelpers.replace(variantIndex, {
                        ...variant,
                        thumbnail: "",
                      });
                    }}
                    fooder="productThumbnailVariant"
                    error={errors.variants?.[variantIndex]?.thumbnail}
                  />
                </div>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const MemoizedVariantsRow = memo(VariantsRow);

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
    <Box
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
      <Typography variant="h6" gutterBottom>
        Biến thể sản phẩm
      </Typography>
      <FieldArray
        name="variants"
        render={(arrayHelpers) => (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Biến thể</TableCell>
                    <TableCell>Giá trị</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.variants.map((variant, variantIndex) => (
                    <MemoizedVariantsRow
                      key={variantIndex}
                      variant={variant}
                      variantIndex={variantIndex}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      toggleRow={toggleRow}
                      openRows={openRows}
                      arrayHelpers={arrayHelpers}
                    />
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
                    value: "",
                    SKU: "",
                    price: "",
                    priceInMarket: "",
                    historicalPrice: "",
                    discount: "",
                    inventory: "",
                    minInventory: "",
                    maxInventory: "",
                    onStock: "",
                    inComing: "",
                    thumbnail: "",
                  })
                }
              >
                Thêm biến thể
              </Button>
            </Box>
          </>
        )}
      />
    </Box>
  );
}
