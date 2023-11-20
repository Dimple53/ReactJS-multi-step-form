import React, { Fragment } from "react";

// Preview component to display user data
const Preview = ({ data, onPrevStep }) => {
  return (
    <div className="panel is-primary">
      {/* Panel heading */}
      <p className="panel-heading">Your data</p>

      {/* Main content block */}
      <div className="panel-block is-block">
        {/* List to display user data */}
        <ul className="py-5">
          {data.map((input, index) => (
            <li key={index} className="py-2">
              <Fragment>
                {/* Display label and value */}
                <strong>{input.label}:</strong> {input.value}
              </Fragment>
            </li>
          ))}
        </ul>

        {/* Back button */}
        <div>
          <button
            type="button"
            className="button is-warning mr-2"
            onClick={onPrevStep}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
