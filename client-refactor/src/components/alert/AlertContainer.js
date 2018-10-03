import { connect } from "react-redux";
import { removeAlert } from "../../actions/index";
import Alert from "./Alert";

const mapStateToProps = state => ({
  alert: state.alert
});
const AlertContainer = connect(
  mapStateToProps,
  { removeAlert }
)(Alert);

export default AlertContainer;
