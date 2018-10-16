import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/index";
import { stat } from "fs";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values);
      }
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const {
      form: { getFieldDecorator },
      errors
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          validateStatus={errors && errors.email ? "error" : ""}
          help={errors.email ? errors.email : undefined}
        >
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={errors && errors.password ? "error" : ""}
          help={errors.password ? errors.password : undefined}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <Link className="login-form-forgot" to="forgot">
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(WrappedNormalLoginForm);
