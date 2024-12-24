import clsx from "clsx";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const IconButton = ({
  icon,
  onClick,
  size = "medium",
  variant = "text",
  color = "primary",
  title,
  id,
  fullWidth,
}) => {
  return (
    <button
      title={title}
      className={clsx(
        "tjn-icon-button cursor-pointer",

        //Button width
        {
          "w-full flex items-center justify-center": fullWidth,
        },

        //Sizes
        {
          "px-2 py-1 text-xs rounded-md": size === "tiny",
          "px-2 py-1 text-sm rounded-md": size === "small",
          "px-3 py-2 text-base rounded-md": size === "medium", // Assuming "text-base" for "medium"
          "px-6 py-3 text-lg rounded-lg": size === "large",
          "px-8 py-4 text-xl rounded-xl": size === "xlarge", // Adjusted for demonstration
        },
        // Contained variant,
        {
          "bg-tenjin-primary text-slate-100 hover:bg-tenjin-primary-light":
            variant === "contained" && color === "primary",
          "bg-slate-500 text-slate-50 hover:bg-slate-400":
            variant === "contained" && color === "default",
          "bg-tenjin-info text-slate-100 hover:bg-tenjin-info-light":
            variant === "contained" && color === "info",
          "bg-tenjin-success text-slate-100 hover:bg-tenjin-success-light":
            variant === "contained" && color === "success",
          "bg-tenjin-error text-slate-100 hover:bg-tenjin-error-light":
            variant === "contained" && color === "error",
          "bg-tenjin-warning text-slate-100 hover:bg-tenjin-warning-light":
            variant === "contained" && color === "warning",
        },

        // outlined variant,
        {
          "border border-tenjin-primary text-tenjin-primary hover:bg-slate-100":
            variant === "outlined" && color === "primary",
          "border  border-slate-500 text-slate-500 hover:bg-slate-100":
            variant === "outlined" && color === "default",
          "border  border-tenjin-info text-tenjin-info hover:bg-slate-100":
            variant === "outlined" && color === "info",
          "border  border-tenjin-success text-tenjin-success hover:bg-slate-100":
            variant === "outlined" && color === "success",
          "border  border-tenjin-error text-tenjin-error hover:bg-slate-100":
            variant === "outlined" && color === "error",
          "border  border-tenjin-warning text-tenjin-warning hover:bg-slate-100":
            variant === "outlined" && color === "warning",
        },
        //Text variant
        {
          "text-tenjin-primary font-semibold hover:bg-slate-100":
            variant === "text" && color === "primary",
          "text-slate-500 font-semibold hover:bg-slate-100":
            variant === "text" && color === "default",
          "text-tenjin-info font-semibold hover:bg-slate-100":
            variant === "text" && color === "info",
          "text-tenjin-success font-semibold hover:bg-slate-100":
            variant === "text" && color === "success",
          "text-tenjin-error font-semibold hover:bg-slate-100":
            variant === "text" && color === "error",
          "text-tenjin-warning font-semibold hover:bg-slate-100":
            variant === "text" && color === "warning",
        }
      )}
      aria-label={title}
      id={id || title}
      onClick={onClick}
    >
      {cloneElement(icon, { className: "w-4 h-4" })}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(["contained", "text", "outlined"]),
  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xlarge"]),
};

export default IconButton;
