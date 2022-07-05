import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { WishListItem, WishListItemType } from "@/models/WishList/WithList"
import WishLiteItemEdit from "@/screens/wishListView/components/wishLiteItemEdit"
import { Button, Text } from "@/components"
import { useStores } from "@/models"

interface IWishListItemEntryProps {}
const WishListItemEntry: React.FC<IWishListItemEntryProps> = () => {
  const { wishListStore } = useStores()
  const [entry, setEntry] = useState<WishListItemType>(
    WishListItem.create({
      name: "新增项目",
      price: 10,
      image: "",
    }),
  )
  const onAdd = () => {
    wishListStore.add(entry)
    setEntry(
      WishListItem.create({
        name: "新增项目",
        price: 10,
        image: "",
      }),
    )
  }
  return (
    <View>
      <WishLiteItemEdit item={entry}></WishLiteItemEdit>
      <Button onPress={onAdd}>
        <Text>Add</Text>
      </Button>
    </View>
  )
}

export default observer(WishListItemEntry)
