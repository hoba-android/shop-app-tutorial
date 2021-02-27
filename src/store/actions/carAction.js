import { ADD_TO_CART, REMOVE_FROM_CART } from "../../thwabet/types";

export const addToCart = (item) => {
  return { type: ADD_TO_CART, payload: item };
};

export const removeFormCart = (prodId) => {
  console.log("acton called");
  return { type: REMOVE_FROM_CART, payload: prodId };
};
