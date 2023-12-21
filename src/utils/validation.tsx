export const validateAuth = (
  name: string,
  value: string,
  formData?: any
): string => {
  switch (name) {
    case "name":
      return value.trim() ? "" : "Please enter your name";
    case "email":
      return !value.trim()
        ? "Please enter your email"
        : /\S+@\S+\.\S+/.test(value)
        ? ""
        : "Email address is invalid";
    case "password":
      return !value.trim()
        ? "Please enter your password"
        : value.length < 6
        ? "Password must be at least 6 characters"
        : "";
    case "confirmPassword":
      return value.trim() === formData.password ? "" : "Password do not match!";
    case "address":
      return value.trim() ? "" : "Please enter your address!";
    case "phoneNumber":
      return /^\d{10}$/.test(value)
        ? ""
        : "Input only numbers and 10 characters";
    default:
      return "";
  }
};

export const validateNews = (name: string, value: string): string => {
  switch (name) {
    case "title":
      if (value.trim().length < 4) {
        return "Title must be at least 4 characters";
      } else if (value.trim().length > 50) {
        return "Title cannot exceed 50 characters";
      } else {
        return "";
      }
    case "desc":
      return value.trim().length >= 25
        ? ""
        : "Description must be at least 25 characters";
    case "category":
      return !value.trim() || value === "Choose category"
        ? "Please select a category"
        : "";
    case "picture":
      return value ? "" : "Please select an image";
    default:
      return "";
  }
};
