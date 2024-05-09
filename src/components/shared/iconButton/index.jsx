import PropTypes from "prop-types";
import { cloneElement } from "react";

const IconButton = ({ icon, size, variant, color, title, id }) => {
  return (
    <button
      title={title}
      className="tjn-icon-button"
      aria-label={title}
      id={id || title}
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
  variant: PropTypes.oneOf(["contained", "text", "outlined"]),
  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xlarge"]),
};

export default IconButton;
