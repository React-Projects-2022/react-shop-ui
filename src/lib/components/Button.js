import React from "react";
import PropTypes from "prop-types";
const Button = ({ text, className, handleAction, params }) => (
  <button
    type="button"
    className={className}
    onClick={() => handleAction(params)}
  >
    {text}
  </button>
);

export { Button };

Button.propTypes = {
  handleAction: PropTypes.func.isRequired,
};
