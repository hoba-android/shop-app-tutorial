import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        console.log(item.items);
        return (
          <OrderItem
            amount={item.totalAmount}
            date={item.get}
            items={item.items}
          />
        );
      }}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    // headerTitle: navData.navigation.getParam("title"),
    headerTitle: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({});
