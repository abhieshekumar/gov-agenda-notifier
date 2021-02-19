import React from 'react';
import './CustomInput.scss';
import classnames from 'classnames';

/**
  * The component for the custom input component.
  *
  * props:
  *    type
  *      The input type like 'text', 'email', 'tel', etc.
  *    placeholder
  *      The input's placeholder
  *    isRequired
  *      A boolean value that indicates whether this field is required
  *    isSubmitted
  *      A boolean value that indicates whether the corresponding to this input component form has
  *      been submitted
  *    value
  *      The input's value
  *    onChange
  *      The function that handles the input's changes event
  *    errorMessage
  *      A string with error message if there are any errors associated with this input element
  */

function CustomInput({
  type,
  placeholder,
  isRequired,
  isSubmitted,
  value,
  onChange,
  errorMessage,
}) {
  return (
    <div className={classnames('custom-input-wrapper')}>
      <input
        className={classnames({ submitted: isSubmitted, error: errorMessage !== null })}
        type={type || 'text'}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
      { errorMessage
        && (
          <div className="input-error">
            { errorMessage }
          </div>
        )}
    </div>
  );
}

export default CustomInput;
