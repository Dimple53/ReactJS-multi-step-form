// Define a function that takes an object 'fields' as its parameter
export default (fields) => {
  // Initialize an empty object to store validation errors
  let errors = {};

  // Iterate through each property (field) in the 'fields' object
  for (let field in fields) {
    // Get the current field's configuration from the 'fields' object
    const currentField = fields[field];

    // Check if the current field and selected field is required and its value is an empty string
    if (currentField.required && currentField.value === "") {
      // If the condition is true, set an error message for this field
      errors[field] = "This field is required!!!";
    }
  }

  // Return the object containing validation errors
  return errors;
};
