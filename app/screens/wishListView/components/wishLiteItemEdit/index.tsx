import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { WishListItemType } from "@/models/WishList/WithList"
import { observer } from "mobx-react-lite"

interface IWishLiteItemEditProps {
  item: WishListItemType
}
const styles = StyleSheet.create({
  EditItemContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
  },
  EditItemContent: {
    backgroundColor: "red",
    flex: 1,
  },
  EditItemName: {
    width: 50,
  },
})
const WishLiteItemEdit: React.FC<IWishLiteItemEditProps> = ({ item }) => {
  return (
    <View>
      <View style={styles.EditItemContainer}>
        <Text style={styles.EditItemName}>Name:</Text>
        <TextInput
          style={styles.EditItemContent}
          value={item.name}
          onChangeText={(text) => {
            item.changeName(text)
          }}
        ></TextInput>
      </View>
      <View style={styles.EditItemContainer}>
        <Text style={styles.EditItemName}>Price:</Text>
        <TextInput
          style={styles.EditItemContent}
          keyboardType={"number-pad"}
          value={`${item.price}`}
          onChangeText={(text) => {
            if (Number.isNaN(Number(text))) return
            item.changePrice(Number(text))
          }}
        ></TextInput>
      </View>
      <View style={styles.EditItemContainer}>
        <Text style={styles.EditItemName}>Image:</Text>
        <TextInput
          style={styles.EditItemContent}
          value={item.image}
          onChangeText={(text) => {
            item.changeImage(text)
          }}
        ></TextInput>
      </View>
    </View>
  )
}

export default observer(WishLiteItemEdit)
