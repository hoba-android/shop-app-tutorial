import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

const ProductItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageCont}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>${props.price.toFixed(2)}</Text>

      <View style={styles.actions}>
        <Button title="Show Details" onPress={props.onViewDetails} />
        <Button title="Add to cart" onPress={props.onAddToCart} />
      </View>
    </View>
  );
};

export default ProductItem;

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
  imageCont: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
