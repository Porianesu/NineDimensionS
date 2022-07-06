import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Clipboard from "@react-native-clipboard/clipboard"
import styles from "./styles"

interface IBrandProps {}
const Brand: React.FC<IBrandProps> = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const copyToClipboard = () => {
    Clipboard.setString("Lepape_zx")
    // TODO
    alert("复制成功")
  }
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.bodyPart}
      contentContainerStyle={styles.bodyContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandPart}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandDesText1}>尽情期待</Text>
          <Text style={styles.brandDesText2}>即将上线...</Text>
        </View>
        <View style={[styles.brandContainer, styles.secondBrandContainer]}>
          <Text style={styles.brandDesText1}>更多场景合作</Text>
          <TouchableOpacity style={styles.clipBoardContainer} onPress={copyToClipboard}>
            <Text style={styles.brandDesText2}>联系合作微信</Text>
            <Text style={styles.brandDesText2}>Lepape_zx（点击复制）</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default observer(Brand)
