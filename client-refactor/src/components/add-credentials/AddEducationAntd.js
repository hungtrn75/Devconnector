import { Form, Input, Tooltip, Icon, Checkbox, Button, DatePicker } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";

const FormItem = Form.Item;

class AddEducationForm extends React.Component {
  state = {
    checkJob: false,
    checkToDate: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          from: fieldsValue["from"].format("YYYY-MM-DD"),
          to: fieldsValue["to"] && fieldsValue["to"].format("YYYY-MM-DD")
        };
        this.props.addEducation(values, this.props.history);
      }
    });
  };

  handleChange = e => {
    this.setState(
      {
        checkJob: e.target.checked
      },
      () => {
        this.props.form.validateFields(["current"], { force: true });
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const titleItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 8
        },
        sm: {
          span: 12,
          offset: 8
        }
      }
    };
    const buttonItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 4
        },
        sm: {
          span: 12,
          offset: 2
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...buttonItemLayout}>
          <Button type="dashed" onClick={() => this.props.history.goBack()}>
            <Icon type="left" />
            Go back
          </Button>
        </FormItem>
        <FormItem {...titleItemLayout}>
          <div className="education">
            <h1>Add Your Education</h1>
            <p>Add any school, bootcamp, etc that you have attended</p>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="School/Bootcamp">
          {getFieldDecorator("school", {
            rules: [
              {
                required: true,
                message: "Please input your school!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Degree/Certificate">
          {getFieldDecorator("degree", {
            rules: [
              {
                required: true,
                message: "Please input your degree!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Field of study">
          {getFieldDecorator("fieldOfStydy", {
            rules: [
              {
                required: true,
                message: "Please input your field of study!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="From date">
          {getFieldDecorator("from", {
            rules: [
              {
                type: "object",
                required: true,
                message: "Please select time!"
              }
            ]
          })(<DatePicker style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="To date">
          {getFieldDecorator("to")(
            <DatePicker
              style={{ width: "100%" }}
              disabled={this.state.checkJob}
              onChange={(date, dateString) =>
                dateString
                  ? this.setState({ checkToDate: true })
                  : this.setState({ checkToDate: false })
              }
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Checkbox
            checked={this.state.checkJob}
            onChange={this.handleChange}
            disabled={this.state.checkToDate}
          >
            Current Job
          </Checkbox>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Description&nbsp;
              <Tooltip title="Tell us about your experience and what you learned?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("description", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input.TextArea />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

AddEducationForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};
const AddEducation = Form.create()(
  connect(
    mapStateToProps,
    { addEducation }
  )(withRouter(AddEducationForm))
);

export default AddEducation;
