"use client";

import React from "react";
import PropTypes from "prop-types";

const Input = ({
  label,
  id,
  name,
  isRequired,
  value,
  onChange,
  placeholder,
  type = "text",
  ...rest
}) => {
  return (
    <div className="tjn_ui_control tjn_form_control w-full">
      <label
        htmlFor={id}
        className="tjn_form_control__label block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-tenjin-primary-light w-full">
          <input
            type={type}
            name={name}
            id={id}
            autoComplete="none"
            className="block tjn_form_control__control flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
