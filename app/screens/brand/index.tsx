import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Image, RefreshControl, ScrollView, Text } from "react-native"
import styles from "./styles"
import { Images } from "@/theme"

interface IBrandProps {}
const Brand: React.FC<IBrandProps> = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.bodyPart}
      contentContainerStyle={styles.bodyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image style={styles.backGroundImage} source={Images.TabStack.brand_page_background}></Image>
      <Text style={styles.infoText}>品牌商品还未上线</Text>
    </ScrollView>
  )
}
export default observer(Brand)
