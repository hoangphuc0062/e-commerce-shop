import * as Yup from "yup";

export const CategorySchema = Yup.object().shape({
  categories: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Category name is required"),
      hasSubcategories: Yup.boolean(),
      subcategories: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Subcategory name is required"),
          })
        )
        .nullable()
        .when("hasSubcategories", {
          is: true,
          then: (schema) => schema.required("Subcategories are required"),
          otherwise: (schema) => schema.notRequired(),
        }),
    })
  ),
});
