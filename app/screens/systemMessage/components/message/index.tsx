import { observer } from "mobx-react-lite"
import React from "react"
import { Text, View } from "react-native"
import { SystemMessageType } from "@/models/system-message-store/system-message-store"
import styles from "./styles"

interface IMessageProps {
  message: SystemMessageType
}
const Message: React.FC<IMessageProps> = ({ message }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemDate}>{message.dateStr}</Text>
      <View style={styles.itemBodyPart}>
        <View style={styles.itemImage}></View>
        <View style={styles.itemMessageContainer}>
          <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.itemTitle}>
            {message.title}
          </Text>
          <Text style={styles.itemContent}>{message.content}</Text>
        </View>
      </View>
    </View>
  )
}
export default observer(Message)
