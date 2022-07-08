import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import { CommodityModelType } from "@/models/my-costume-store/my-costume-store"
import { Image, View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import { Images } from "@/theme"
interface ICostumeItemProps {
  item: CommodityModelType
}
const CostumeItem: React.FC<ICostumeItemProps> = ({ item }) => {
  const genderIcon = useMemo(() => {
    switch (item.gender) {
      case "f":
        return Images.MyCostume.my_costume_gender_icon_female
      case "m":
        return Images.MyCostume.my_costume_gender_icon_male
      case "currency":
        return Images.MyCostume.my_costume_gender_icon_currency
    }
  }, [item.gender])
  return (
    <TouchableOpacity
      activeOpacity={item.isGenderAvailable ? 0.5 : 1}
      style={styles.itemContainer}
      onPress={item.isGenderAvailable ? item.tryCommodity : null}
    >
      <View style={styles.itemImageWrapper}>
        {item.isCurrentCommoditySelected ? <View style={styles.itemSelectedCover}></View> : null}
        {!item.isGenderAvailable ? (
          <View style={styles.itemUnavailableCover}>
            <Text style={styles.itemUnavailableCoverText}>切换性别可用</Text>
          </View>
        ) : null}
        <Image style={styles.itemGenderIcon} source={genderIcon} />
        <Image source={Images.MyCostume.my_costume_no_clothes} style={styles.itemImage}></Image>
        <View style={styles.itemSeqContainer}>
          <Text style={styles.itemSeqText}>{`No.${item.seq}`}</Text>
        </View>
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  )
}
export default observer(CostumeItem)
