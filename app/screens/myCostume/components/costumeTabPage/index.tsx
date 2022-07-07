import { observer } from "mobx-react-lite"
import React from "react"
import { ScrollView, Text } from "react-native"
import styles from "./styles"

interface ICostumeTabPageProps {}
const CostumeTabPage: React.FC<ICostumeTabPageProps> = () => {
  return (
    <ScrollView style={styles.pageContainer}>
      <Text>123</Text>
    </ScrollView>
  )
}
export default observer(CostumeTabPage)
