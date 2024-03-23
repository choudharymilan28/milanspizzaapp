// reducers/ordersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      OrderId: 1,
      type: "Veg",
      size: "Large",
      base: "Thin",
      stage: "Order Placed",
      timeInStage: new Date().getTime(),
      startTime: new Date().getTime(),
      pausedTime: new Date().getTime(),
    },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
