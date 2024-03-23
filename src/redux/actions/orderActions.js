// actions/orderActions.js

import { addOrder } from "../reducers/orderSlice";

// Action creator for adding an order
export const addNewOrder = (order) => {
  return (dispatch) => {
    dispatch(addOrder(order));
  };
};
