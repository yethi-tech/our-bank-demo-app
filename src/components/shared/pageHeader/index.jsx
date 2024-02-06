"use client";

import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({ title, id = "page_header", subTitle, actions }) => {
  return (
    <div className="py-2 mb-2 flex flex-row items-center border-b" id={id}>
      <div className="grow">
        <p className="text-lg page-title font-semibold">{title}</p>
        {subTitle && <p className="text-sm page-subtitle">{subTitle}</p>}
      </div>
      <div
        id="page_actions"
        className="flex flex-row items-center justify-start gap-1"
      >
        {actions}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf([PropTypes.node]),
};

export default PageHeader;
