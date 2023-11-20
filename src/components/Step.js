import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import Select from "./Select";

// Step component to render input fields based on the provided data
const Step = ({
  data,
  onChange,
  onStepChange,
  errors,
  stepKey,
  step,
  onPrevStep,
}) => {
  let output = [];

  // Loop through the properties of the 'data' object
  for (const [key, val] of Object.entries(data)) {
    //check If the input type is 'input', render an Input component
    if (val.type === "input") {
      // Start pushing components into the output array.
      output.push(
        <Input
          key={key}
          placeholder={val.placeholder}
          name={key}
          value={val.value}
          onChange={(e) => onChange(stepKey, e)}
          error={errors[key]}
          type={val.type}
        />
      );
    } else if (val.type === "select") {
      // If the input type is 'select', render a Select component
      output.push(
        <Select
          key={key}
          name={key}
          value={val.value}
          onChange={(e) => onChange(stepKey, e)}
          error={errors[key]}
          choices={val.choices}
        />
      );
    }
  }

  return (
    <Fragment>
      {/* Render the array of input components */}
      {output}

      {/* Render 'Back' button if step is greater than 1 */}
      {step > 1 && (
        <button
          type="button"
          className="button is-warning mr-2"
          onClick={() => onPrevStep(step - 1)}
        >
          Back
        </button>
      )}

      {/* Render 'Next' button */}
      <button
        type="button"
        className="button is-link"
        onClick={(e) => onStepChange(data, e)}
      >
        Next
      </button>
    </Fragment>
  );
};

// PropTypes for type-checking the props passed to the component
Step.propTypes = {
  data: PropTypes.object.isRequired, // Input data object
  onChange: PropTypes.func.isRequired, // Function to handle input changes
  onStepChange: PropTypes.func.isRequired, // Function to handle step changes
  errors: PropTypes.object, // Error object
  stepKey: PropTypes.string.isRequired, // Key identifying the current step
  step: PropTypes.number.isRequired, // Current step number
  onPrevStep: PropTypes.func, // Function to handle going to the previous step
};

// Export the Step component
export default Step;
