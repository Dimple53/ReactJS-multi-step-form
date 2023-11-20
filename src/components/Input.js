import React from "react";
import PropTypes from "prop-types";

// Input component for rendering a form input field
const Input = ({ type, placeholder, name, value, onChange, error }) => {
  return (
    <div className="mb-5">
      {/* Input element with conditional class based on error */}
      <input
        // Apply conditional class based on the presence of 'error'
        className={error ? "input is-danger" : "input"}
        // Set the type of the input field (e.g., text, password, etc.)
        type={type}
        // Set a placeholder text for the input field
        placeholder={placeholder}
        // Set the name attribute for the input field
        name={name}
        // Set the current value of the input field
        value={value}
        // Provide a function to handle changes in the input field
        onChange={onChange}
        // Disable browser autocomplete for the input field
        autoComplete="off"
      />

      {/* Display error message if present */}
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
};

// PropTypes for type-checking the props passed to the component
Input.propTypes = {
  type: PropTypes.string, // Type of the input field (default is 'text')
  placeholder: PropTypes.string, // Placeholder text for the input field
  name: PropTypes.string.isRequired, // Name of the input field
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Value of the input field (string or object)
  onChange: PropTypes.func.isRequired, // Function to handle input changes
};

// Export the Input component
export default Input;
