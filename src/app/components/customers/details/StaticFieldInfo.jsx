import React, { isValidElement } from "react";
import PropTypes from "prop-types";

const StaticFieldInfo = ({ fieldName, fieldValue, id }) => {
  const renderFieldValue = () => {
    if (!fieldValue) {
      return (
        <p
          className="text-sm value grow overflow-hidden whitespace-nowrap text-ellipsis px-2 border"
          id={id}
        >
          {"--"}
        </p>
      );
    }

    if (typeof fieldValue === "function") {
      return (
        <div className="grow value px-2 border" id={id}>
          {fieldValue()}
        </div>
      );
    }

    if (isValidElement(fieldValue)) {
      return (
        <div className="grow value px-2 border" id={id}>
          {fieldValue}
        </div>
      );
    }

    return (
      <p
        className="text-sm value grow overflow-hidden whitespace-nowrap text-ellipsis px-2 border"
        id={id}
      >
        {fieldValue}
      </p>
    );
  };

  return (
    <div className="flex items-center tenjin-static-field-info">
      <label
        htmlFor={id}
        className="label w-[25%] font-semibold text-sm px-2 border bg-blue-100"
      >
        {fieldName}
      </label>
      {renderFieldValue()}
    </div>
  );
};

StaticFieldInfo.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  id: PropTypes.string.isRequired,
};

export default StaticFieldInfo;
