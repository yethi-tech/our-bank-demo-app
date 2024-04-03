"use client";

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = ({
  label,
  id,
  name,
  isRequired,
  placeholder,
  type = "text",
  ...rest
}) => {
  return (
    <div className="tjn_ui_control tjn_form_control w-full">
      <label
        htmlFor={id}
        className={clsx(
          "tjn_form_control__label block text-sm font-medium leading-6 text-gray-900",
          { "label-mandatory": isRequired }
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-tenjin-primary-light w-full">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            id={id}
            autoComplete="none"
            className="block tjn_form_control__control flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
