import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={`fab fa-${icon}`} />
        </span>
      </div>
      <input
        type={type}
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  disabled: false,
  type: "text"
};

export default InputGroup;
