import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  disabled: false,
  type: "text"
};

export default TextFieldGroup;
