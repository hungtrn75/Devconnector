import React, { Component } from "react";
import { notification } from "antd";

const openNotificationWithIcon = ({ status, text }) => {
  notification[status]({
    message: text,
    description: "Devconnector notification"
  });
  return null;
};

class Alert extends Component {
  onClick = () => {
    this.props.removeAlert();
  };

  shouldComponentUpdate(prevProps) {
    if (prevProps.alert.text !== this.props.alert.text) {
      !!prevProps.alert.text && openNotificationWithIcon(prevProps.alert);
      return true;
    }
    return false;
  }

  render() {
    return <div className="alert-container" />;
  }
}

export default Alert;
