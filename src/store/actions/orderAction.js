import { ADD_ORDER } from "../../thwabet/types";

export const addOrder = (cartItem, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItem, amount: totalAmount },
  };
};
