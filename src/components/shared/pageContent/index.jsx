import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const PageContent = ({ id = "page_content", fillHeight, children }) => {
  return (
    <div
      id={id}
      className={clsx(
        "overflow-hidden",
        { grow: fillHeight },
        { "h-0": fillHeight }
      )}
    >
      {children}
    </div>
  );
};

PageContent.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default PageContent;
