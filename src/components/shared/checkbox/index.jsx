"use client";
import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, id, name, size = "medium", ...rest }) => {
  return (
    <div className="tjn_ui_control tjn_form_control inline-flex items-center flex-row gap-2 cursor-pointer">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="w-4 cursor-pointer h-4 tjn_form_control__control text-tenjin-primary bg-gray-100 border-gray-300 rounded-md"
        {...rest}
      />
      <label
        htmlFor={id}
        className=" text-sm text-gray-900 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
