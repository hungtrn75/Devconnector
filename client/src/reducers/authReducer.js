import * as Types from "../constants/ActionTypes";
import { isEmpty } from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.REGISTER_USER:
      return {
        ...state,
        user: action.payload
      };
    case Types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
