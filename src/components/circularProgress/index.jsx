import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const CircularProgress = ({ color, size }) => {
  return (
    <div
      className={clsx(
        "border-t-transparent border-solid animate-spin rounded-full",
        {
          "border h-3 w-3": size === "tiny",
          "border-2 h-3 w-3": size === "small",
          "border-2 h-4 w-4": size === "medium",
          "border-2 h-5 w-5": size === "large",
          "border-2 h-6 w-6": size === "xlarge",
        },
        {
          "border-tenjin-primary": color === "primary" || color === "default",
          "border-tenjin-success": color === "success",
          "border-tenjin-error": color === "error",
          "border-tenjin-warning": color === "warning",
          "border-tenjin-info": color === "info",
        }
      )}
    ></div>
  );
};

CircularProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "default",
    "success",
    "error",
    "warning",
    "info",
  ]),

  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xlarge"]),
};

CircularProgress.defaultProps = {
  size: "medium",
  color: "primary",
};

export default CircularProgress;
