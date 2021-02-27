import React from "react";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import productsReducer from "./src/store/reducers/productReducer";
import cartReducer from "./src/store/reducers/cartReducer";
import orderReducer from "./src/store/reducers/orderReducer";
import ShopNavigator from "./src/navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [loaded] = useFonts({
    opensans: require("./assets/fonts/OpenSans-Regular.ttf"),
    opensansbold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
