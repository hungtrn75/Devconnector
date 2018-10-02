import React, { Component } from "react";
import styles from "./index.scss";
import classNames from "classnames";

export default class Alert extends Component {
  dismiss = e => {
    e.preventDefault();
  };
  render() {
    const message = "This is a test text";
    return (
      <div
        className={classNames(
          "alert alert-primary animated slideInDown ",
          styles.alert_box
        )}
        role="alert"
      >
        {message}
      </div>
    );
  }
}
