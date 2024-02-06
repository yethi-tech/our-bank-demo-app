"use client";

import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const Select = ({
  label,
  id,
  name,
  defaultValue,
  isRequired,
  value,
  onChange,
  placeholder = "Select One",
  options,
  by,
}) => {
  const [selected, setSelected] = useState(value || defaultValue);

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setSelected(newValue);
    }
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="tjn_ui_control tjn_form_control w-full">
      <label
        htmlFor={id}
        className="tjn_form_control__label block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div
          className="tjn_form_control__hidden_base"
          type="hidden"
          name={name}
          value={selected}
        />
        <div className="tjn_form_control__control tjn_select" id={id}>
          <Listbox value={selected} onChange={handleChange}>
            <div className="relative mt-0">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white pt-2 pb-1.5 pl-3 pr-10 text-left shadow-sm border sm:text-sm">
                <span className="block truncate">
                  {selected || placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronDown aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 z-[200] text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {options.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-100 text-tenjin-primary"
                            : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {by ? option[by] : option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-tenjin-primary">
                              <FaCheck />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  by: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default Select;
