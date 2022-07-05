import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, Text, Button } from "react-native"
import { WishListItemType } from "@/models/WishList/WithList"
import WishLiteItemEdit from "@/screens/wishListView/components/wishLiteItemEdit"
import { applySnapshot, clone, getSnapshot } from "mobx-state-tree"
import styles from "./styles"

interface IWishListItemViewProps {
  item: WishListItemType
}
const WishListItemView: React.FC<IWishListItemViewProps> = ({ item }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [cloneItem, setCloneItem] = useState<WishListItemType>(null)
  return !isEditing ? (
    <View>
      <Image source={{ uri: item.image }} />
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <View style={styles.ButtonContainer}>
        <Button
          title={"toggleEdit"}
          onPress={() => {
            setIsEditing(true)
            setCloneItem(clone(item))
          }}
        ></Button>
        <Button
          title={"removeItem"}
          onPress={() => {
            item.remove()
          }}
        ></Button>
      </View>
    </View>
  ) : (
    <View>
      <WishLiteItemEdit item={cloneItem}></WishLiteItemEdit>
      <View style={styles.ButtonContainer}>
        <Button
          title={"cancelEdit"}
          onPress={() => {
            setIsEditing(false)
          }}
        ></Button>
        <Button
          title={"saveEdit"}
          onPress={() => {
            applySnapshot(item, getSnapshot(cloneItem))
            setIsEditing(false)
            setCloneItem(null)
          }}
        ></Button>
      </View>
    </View>
  )
}
export default observer(WishListItemView)
