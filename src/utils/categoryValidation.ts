export interface CategoryFormValues {
  mainName: string;
  subcategories: {
    name: string;
  }[];
}

export interface CategoryValidationErrors {
  mainName?: string;
  subcategories?: Record<number, string>;
}

export function validateCategoryForm(
  values: CategoryFormValues,
): CategoryValidationErrors {
  const errors: CategoryValidationErrors = {};
  const subcategoryErrors: Record<number, string> = {};

  if (!values.mainName.trim()) {
    errors.mainName = "Category name is required";
  }

  values.subcategories.forEach((subcategory, index) => {
    if (!subcategory.name.trim()) {
      subcategoryErrors[index] = "Subcategory name is required";
    }
  });

  if (Object.keys(subcategoryErrors).length > 0) {
    errors.subcategories = subcategoryErrors;
  }

  return errors;
}
