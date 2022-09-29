import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import cartReducer from "./cartReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart: cartReducer,
});

export default rootReducer;
