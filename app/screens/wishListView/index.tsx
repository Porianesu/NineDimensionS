import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "@/navigators"
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { useStores } from "@/models"
import WishListItemView from "@/screens/wishListView/components/wishListItem"
import { Button } from "@/components"
import WishListItemEntry from "@/screens/wishListView/components/wishListItemEntry"
import { UserType } from "@/models/Group/Group"

const { width: windowWidth } = Dimensions.get("window")
const WishListView: React.FC<StackScreenProps<NavigatorParamList, "wishList">> = () => {
  const {
    groupStore: { users },
  } = useStores()
  const [selectedUser, setSelectedUser] = useState<UserType>()
  const onSelectUser = (target) => {
    setSelectedUser(target)
  }
  return (
    <View>
      <ScrollView
        scrollEnabled={true}
        style={{
          borderColor: "red",
          borderWidth: 1,
          width: windowWidth,
          height: 150,
        }}
      >
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() => {
              onSelectUser(user)
            }}
          >
            <View
              style={{
                width: "100%",
                height: 50,
                borderColor: "blue",
                borderWidth: 1,
                marginBottom: 20,
              }}
            >
              <Text>{user.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedUser ? (
        <>
          <Button
            onPress={async () => {
              selectedUser.wishList.startPriceChange()
            }}
          >
            <Text>press me</Text>
          </Button>
          {selectedUser.wishList.items.map((item, idx) => (
            <WishListItemView item={item} key={idx}></WishListItemView>
          ))}
          <Text>Total Price:{`${selectedUser.wishList.totalPrice}`} $</Text>
          <WishListItemEntry></WishListItemEntry>
          <Button
            onPress={() => {
              selectedUser.getSuggestions()
            }}
          >
            <Text>Suggestion</Text>
          </Button>
        </>
      ) : null}
    </View>
  )
}
export default observer(WishListView)
