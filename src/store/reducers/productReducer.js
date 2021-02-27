import {
  DELETE_PRODUCT,
  CEATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../thwabet/types";

import PRODUCTS from "../../data/dummyData";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.payload
        ),
      };

    case CEATE_PRODUCT:
      const prodData = action.payload;
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        prodData.title,
        prodData.imageUrl,
        prodData.description,
        prodData.price
      );
      return {
        ...state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const prodData2 = action.payload;
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === prodData2.pid
      );
      const updatedProduct = new Product(
        prodData2.pid,
        state.userProducts[productIndex].ownerId,
        prodData2.title,
        prodData2.imageUrl,
        prodData2.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === prodData2.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    default:
      return state;
  }
};
