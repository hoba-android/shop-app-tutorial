import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";

import CartItem from "../../components/shop/CartItem";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/carAction";
import * as orderActions from "../../store/actions/orderAction";

const CartScreen = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const products = useSelector((state) => {
    // comvert the items object to an array
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      const currentItem = state.cart.items[key];
      transformedCartItems.push({
        productId: key,
        productTitle: currentItem.productTitle,
        productPrice: currentItem.productPrice,
        quantity: currentItem.quantity,
        sum: currentItem.sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View>
      <View>
        <Text>Total : ${totalAmount.toFixed(2)}</Text>
        <Button
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(products, totalAmount));
            // props.navigation.navigate("order");
          }}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => {
          return (
            <CartItem
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
              deletable={true}
              onRemove={() => {
                dispatch(actions.removeFormCart(item.productId));
              }}
            />
          );
        }}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};
export default CartScreen;

const styles = StyleSheet.create({});
