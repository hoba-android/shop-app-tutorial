import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/carAction";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const onAddToCart = (item) => {
    dispatch(actions.addToCart(item));
  };
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ProductItem
              image={item.imageUrl}
              title={item.title}
              price={item.price}
              onViewDetails={() =>
                props.navigation.navigate("productDetails", {
                  id: item.id,
                  title: item.title,
                })
              }
              onAddToCart={() => onAddToCart(item)}
            />
          );
        }}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
