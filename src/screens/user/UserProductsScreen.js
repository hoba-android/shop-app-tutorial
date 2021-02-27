import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import UserProductItem from "../../components/shop/UserProductItem";

import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as actions from "../../store/actions/productAction";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const confirmDelete = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(actions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <View>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <UserProductItem
              image={item.imageUrl}
              title={item.title}
              price={item.price}
              onEdit={() => {
                props.navigation.navigate("edit", { id: item.id });
              }}
              onDelete={() => confirmDelete(item.id)}
            />
          );
        }}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Admin Products",
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
          title="ADD"
          iconName={
            Platform.OS === "android"
              ? "md-add-circle"
              : "md-add-circle-outline"
          }
          onPress={() => {
            navData.navigation.navigate("edit");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
