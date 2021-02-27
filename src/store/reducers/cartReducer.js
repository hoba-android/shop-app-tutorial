import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
  DELETE_PRODUCT,
} from "../../thwabet/types";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // console.log(action.payload);
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        // already in so just increment the quanitiy
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1, // quanity for a new added prod
          prodPrice,
          prodTitle,
          prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };

    default:
      return state;
  }
};
