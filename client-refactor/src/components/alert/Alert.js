import React, { Component } from "react";
import styles from "./index.scss";
import classNames from "classnames";

class Alert extends Component {
  onClick = () => {
    this.props.removeAlert();
  };

  shouldComponentUpdate(prevProps) {
    if (prevProps.alert.text !== this.props.alert.text) {
      setTimeout(() => {
        this.props.removeAlert();
      }, 2500);
      return true;
    }
    return false;
  }

  render() {
    const { text, status } = this.props.alert;
    return (
      <div className="alert-container">
        {text && (
          <div
            onClick={this.onClick}
            className={classNames(
              "alert  animated wobble",
              styles.alert_box,
              `alert-${status}`
            )}
            role="alert"
          >
            <span className="mr-4">{text}</span>
            {text && (
              <button
                type="button"
                className={classNames("close", styles.icon_close)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
