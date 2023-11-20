import React from "react";
import PropTypes from "prop-types";

// Select component for rendering a dropdown/select input field
const Select = ({ name, value, onChange, choices, error }) => {
  return (
    <div className="mb-5">
      {/* Select element with conditional classes based on error */}
      <div
        className={
          error ? "select is-fullwidth is-danger" : "select is-fullwidth"
        }
      >
        {/* Dropdown options */}
        <select name={name} value={value} onChange={onChange}>
          {choices.map((choice, index) => (
            // Individual option in the dropdown
            <option key={index} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>

      {/* Display error message if present */}
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
};

// PropTypes for type-checking the props passed to the component
Select.propTypes = {
  name: PropTypes.string.isRequired, // Name of the select input field
  value: PropTypes.string.isRequired, // Current value of the select input
  onChange: PropTypes.func.isRequired, // Function to handle select input changes
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired, // Array of choices with values and labels
  error: PropTypes.string, // Error message to display
};

// Export the Select component
export default Select;
