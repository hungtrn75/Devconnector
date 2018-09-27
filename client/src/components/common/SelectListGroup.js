import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        onChange={onChange}
        value={value}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string
};

SelectListGroup.defaultProps = {
  disabled: false,
  type: "text"
};

export default SelectListGroup;
