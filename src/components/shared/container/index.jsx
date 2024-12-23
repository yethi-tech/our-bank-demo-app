import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Container = ({
  children,
  maxWidth = "lg", // Default to large like MUI
  className = "",
  fullHeight,
  ...props
}) => {
  // Mapping of size names to Tailwind max-width classes
  const maxWidthClasses = {
    xs: "max-w-screen-sm", // 640px
    sm: "max-w-screen-md", // 768px
    md: "max-w-screen-lg", // 1024px
    lg: "max-w-screen-xl", // 1280px
    xl: "max-w-screen-2xl", // 1536px
    full: "max-w-full", // No max width
  };

  return (
    <div
      className={clsx(
        `
        mx-auto 
        w-full 
        px-4 
        sm:px-6 
        lg:px-8
        ${maxWidthClasses[maxWidth] || "max-w-full"}
        ${className}
      `,
        { "h-full": fullHeight }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  fullHeight: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "full"]),
  className: PropTypes.string,
};

export default Container;
