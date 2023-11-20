import React, { useState, useEffect } from "react";
import Step from "./Step";
import Preview from "./Preview";
import validate from "../helpers/validate";

// Functional component named Form
const Form = () => {
  // State variables using the useState hook
  const [step, setStep] = useState(1); // To track the current step
  const [formData, setFormData] = useState({
    // Initial form data structure
    stepOne: {
      // Step 1 form fields
      firstName: {
        value: "",
        required: true,
        type: "input",
        placeholder: "First name",
      },
      lastName: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Last name",
      },
      age: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Age",
      },
    },
    stepTwo: {
      // Step 2 form fields
      city: {
        value: "",
        required: true,
        type: "input",
        placeholder: "City",
      },
      zipcode: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Zipcode",
      },
      country: {
        value: "",
        required: true,
        type: "select",
        choices: [
          { value: "", label: "Choose country" },
          { value: "America", label: "America" },
          { value: "Germany", label: "Germany" },
          { value: "India", label: "India" },
          { value: "Australia", label: "Australia" },
          { value: "United Kingdom", label: "United Kingdom" },
        ],
      },
    },
  });
  const [errors, setErrors] = useState({}); // To track form validation errors

  // Load form data from local storage when the component mounts
  useEffect(() => {
    const formValues = window.localStorage.getItem("data-forever");
    // Retrieve the stored form data from the local storage using the key "data-forever".
    setFormData(JSON.parse(formValues));
    /* Parse the retrieved JSON-formatted string into a JavaScript object and 
     set it as the state using the setFormData function. This updates the component state with the loaded form data.*/
  }, []);
  /*The empty array([]) passed as the second argument to useEffect is the dependency array. 
  It specifies when the effect should run. The effect runs only once when the component mounts.*/

  // Save form data to local storage whenever it changes
  useEffect(() => {
    window.localStorage.setItem("data-forever", JSON.stringify(formData));
    /* Store the current form data (formData state) in the local storage under the key "data-forever".
    The JSON.stringify function is used to convert the JavaScript object into a JSON - formatted string for storage.*/
  });
  /*This useEffect runs after every render because it doesn't have a dependency array. 
  It saves the current formData to local storage whenever formData changes.*/

  // Handler for input changes in the form
  const changeHandler = (step, e) => {
    e.persist(); // Persist the synthetic event to be used asynchronously

    // Update form data based on input changes
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: {
          ...prev[step][e.target.name],
          value: e.target.value,
        },
      },
    }));
  };

  // Handler for moving to the next step in the form
  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = validate(values); // Validate the form data
    setErrors(newErrors); // Update the errors state with validation results

    // If there are no validation errors, proceed to the next step
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  };

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault(); //event when submitting the form to prevent a browser reload/refresh.

    // Create FormData object and append form data to it
    const data = new FormData();
    data.append("firstName", formData.stepOne.firstName.value);
    data.append("lastName", formData.stepOne.lastName.value);
    data.append("age", formData.stepOne.age.value);
    data.append("city", formData.stepTwo.city.value);
    data.append("zipcode", formData.stepTwo.zipcode.value);
    data.append("country", formData.stepTwo.country.value);

    // In a real application, you might send the form data to an API here
    // For example, if you have some Redux action: sendData(data)
  };

  // JSX for the form component
  return (
    <form onSubmit={submitHandler}>
      <h1 className="is-size-2 has-text-centered mb-4">User Details</h1>

      {/* Render the appropriate step component based on the current step */}
      {step === 1 && (
        <Step
          data={formData.stepOne}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          errors={errors}
          stepKey="stepOne"
          step={1}
        />
      )}
      {step === 2 && (
        <Step
          data={formData.stepTwo}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          errors={errors}
          stepKey="stepTwo"
          onPrevStep={(step) => setStep(step)}
          step={2}
        />
      )}
      {step === 3 && (
        <Preview
          onPrevStep={() => setStep(step - 1)}
          data={[
            { label: "First name", value: formData.stepOne.firstName.value },
            { label: "Last name", value: formData.stepOne.lastName.value },
            { label: "Age", value: formData.stepOne.age.value },
            { label: "City", value: formData.stepTwo.city.value },
            { label: "Zipcode", value: formData.stepTwo.zipcode.value },
            { label: "Country", value: formData.stepTwo.country.value },
          ]}
        />
      )}
    </form>
  );
};

// Export the Form component
export default Form;
