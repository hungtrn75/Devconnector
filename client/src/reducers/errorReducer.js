import * as Types from "../constants/ErrorTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.REGISTER_ERROR:
      return action.payload;
    default:
      return state;
  }
}
