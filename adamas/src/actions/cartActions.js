import { ADD_TO_CART, USER_LOADING, REFRESH_CART } from "./types";

export const addToCart = (cart) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: cart,
  });
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const refreshCart = () => {
  return {
    type: REFRESH_CART,
  };
};
