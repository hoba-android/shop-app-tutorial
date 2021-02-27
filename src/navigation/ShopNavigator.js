import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

import { createBottomTabNavigator } from "react-navigation-tabs";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProducts from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductsScreen";

import { Colors } from "../thwabet/Colors";
import { Ionicons } from "@expo/vector-icons";

const defaulOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "opensansbold",
  },
  headerBackTitleStyle: {
    fontFamily: "opensans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// const TabNavigator = createBottomTabNavigator({
//   Home: ProductsNavigator,
//   Test2: Test2,
//   Meals: {
//     screen: MealsNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return (
//           <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: Colors.primaryColor,
//     },
//   },

// });

const UserProductsNavigator = createStackNavigator(
  {
    user: UserProducts,
    edit: EditProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-create" size={24} color={tintColor} />
      ),
    },
    defaultNavigationOptions: defaulOptions,
  }
);

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    productDetails: ProductDetailsScreen,
    cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cart" size={24} color={tintColor} />
      ),
    },
    defaultNavigationOptions: defaulOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    order: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list" size={24} color={tintColor} />
      ),
    },
    defaultNavigationOptions: defaulOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    products: ProductsNavigator,
    orders: OrdersNavigator,
    Admin: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
