import { ADD_ALERT, REMOVE_ALERT } from "../constants/AlertActions";
const alertsReducer = (state = { text: "", status: "" }, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return (state = {
        text: action.payload.text,
        status: action.payload.status
      });
    case REMOVE_ALERT:
      return (state = { text: "", status: "" });
    default:
      return state;
  }
};

export default alertsReducer;
