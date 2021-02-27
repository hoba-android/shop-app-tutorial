import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/productAction";

const EditProductsScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("id");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(actions.updateProduct(prodId, title, imageUrl, description));
    } else {
      dispatch(actions.creatProduct(title, +price, imageUrl, description));
    }
    props.navigation.goBack();
  }, [dispatch, title, +price, imageUrl, description, prodId]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(t) => setTitle(t)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(t) => setPrice(t)}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(t) => setDescription(t)}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>ImageURl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(t) => setImageUrl(t)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductsScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("id")
      ? "Edit Product"
      : "Add Product",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {
            submitFn();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductsScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "opensansbold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "opensans",
    color: "red",
    fontSize: 13,
  },
});
