import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "@/navigators"
import { Image, StatusBar, View, Text, TouchableOpacity, FlatList } from "react-native"
import styles from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Images } from "@/theme"
import { useStores } from "@/models"
import Message from "@/screens/systemMessage/components/message"

const SystemMessage: React.FC<StackScreenProps<NavigatorParamList, "systemMessage">> = (props) => {
  const { navigation } = props
  const {
    systemMessageStore: { messages, getMoreMessages, initMessage },
  } = useStores()
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }
  useEffect(() => {
    initMessage()
  }, [])
  const onEndReached = async () => {
    await getMoreMessages()
  }
  const renderItem = ({ item }) => {
    return <Message key={item.id} message={item} />
  }
  return (
    <SafeAreaView edges={["top"]} style={styles.pageContainer}>
      <StatusBar backgroundColor={"#52C3FF"}></StatusBar>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerBackBtnContainer} onPress={goBack}>
          <Image
            style={styles.headerBackIcon}
            source={Images.TabStack.system_message_back_icon}
          ></Image>
          <Text style={styles.headerText}>系统消息</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.bodyContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </SafeAreaView>
  )
}
export default observer(SystemMessage)
