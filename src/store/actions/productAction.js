import {
  DELETE_PRODUCT,
  CEATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../thwabet/types";

export const deleteProduct = (prodId) => {
  return {
    type: DELETE_PRODUCT,
    payload: prodId,
  };
};

export const creatProduct = (title, price, imageUrl, description) => {
  return {
    type: CEATE_PRODUCT,
    payload: {
      title,
      price,
      imageUrl,
      description,
    },
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      pid: id,
      title,

      imageUrl,
      description,
    },
  };
};
