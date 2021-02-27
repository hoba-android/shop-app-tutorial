import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/carAction";

const ProductDetailsScreen = (props) => {
  const id = props.navigation.getParam("id");
  const title = props.navigation.getParam("title");
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === id)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />

      <Button
        title="Add to Car"
        onPress={() => dispatch(actions.addToCart(selectedProduct))}
      />
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("title"),
  };
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 300,
    margin: 20,
    padding: 10,
  },

  image: {
    width: "100%",
    height: 300,
  },

  price: {
    fontSize: 20,
    color: "#888",
  },
  description: {
    fontFamily: "opensansbold",
    fontSize: 14,
    alignSelf: "center",
  },
});
