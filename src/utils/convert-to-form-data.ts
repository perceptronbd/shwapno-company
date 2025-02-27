export const convertToFormData = <T extends Record<string, any>>(
  obj: T,
  form?: FormData,
  parentKey?: string,
): FormData => {
  const formData = form || new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File) {
      // Append file objects directly
      formData.append(fullKey, value);
    } else if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          convertToFormData(item, formData, `${fullKey}[${index}]`);
        } else {
          formData.append(`${fullKey}[${index}]`, String(item ?? ""));
        }
      });
    } else if (typeof value === "object" && value !== null) {
      // Handle nested objects
      convertToFormData(value, formData, fullKey);
    } else {
      // Handle primitive values
      formData.append(fullKey, String(value ?? ""));
    }
  });

  return formData;
};
