"use client";

import clsx from "clsx";
import PropTypes from "prop-types";
import { cloneElement, isValidElement } from "react";
import {
  FaArrowLeft,
  FaCopy,
  FaEdit,
  FaHome,
  FaPlus,
  FaRegSave,
  FaTrash,
} from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import CircularProgress from "../circularProgress";
const iconSet = {
  back: <FaArrowLeft />,
  plus: <FaPlus />,
  save: <FaRegSave />,
  edit: <FaEdit />,
  delete: <FaTrash />,
  copy: <FaCopy />,
  home: <FaHome />,
  refresh: <FaArrowRotateRight />,
};
// Button.defaultProps = {
//   size: "medium",
//   color: "primary",
//   variant: "text",
//   type: "button",
// };
const Button = ({
  children,
  id,
  name,
  type = "button",
  size = "medium",
  color = "primary",
  variant = "text",
  icon,
  loading,
  loadingText,
  className,
  as: Component = "button",
  ...rest
}) => {
  const renderIcon = () => {
    if (loading)
      return (
        <div className="mr-2">
          <CircularProgress size={size} />
        </div>
      );

    if (!icon) return <></>;
    if (typeof icon === "string") {
      return iconSet[icon] ? (
        <span className="mr-2">{cloneElement(iconSet[icon])}</span>
      ) : (
        <></>
      );
    } else if (isValidElement(icon)) {
      return <span className="mr-2">{cloneElement(icon)}</span>;
    } else {
      return <></>;
    }
  };

  const renderChildren = () => {
    return loading ? (loadingText ? loadingText : "Please wait...") : children;
  };

  const componentProps = {
    ...(Component === "button" ? { type } : {}),
    id,
    name,
    className: clsx(
      // "rounded-md",
      "flex flex-row items-center",
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
    ),
    ...rest,
  };

  return (
    <Component {...componentProps}>
      {renderIcon()}
      {renderChildren()}
    </Component>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xlarge"])
    .isRequired,
  color: PropTypes.oneOf([
    "primary",
    "default",
    "info",
    "warning",
    "error",
    "success",
  ]).isRequired,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]).isRequired,
  icon: PropTypes.oneOf([
    "save",
    "plus",
    "edit",
    "delete",
    "copy",
    "back",
    "refresh",
    "home",
  ]),
};

export default Button;
