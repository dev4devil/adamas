import { ADD_TO_CART, REFRESH_CART } from "../actions/types";
import isEmpty from "is-empty";
const initialState = {
  cart: [],
  isCart: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        isCart: !isEmpty(action.payload),
        cart: action.payload,
      };
    case REFRESH_CART:
      return {
        ...state,
        isCart: (state) => !state,
      };
    default:
      return state;
  }
}
