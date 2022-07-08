import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { FlatList, View, Text } from "react-native"
import styles from "./styles"
import { useStores } from "@/models"
import { CommodityType } from "@/screens/myCostume/types"
import CostumeItem from "@/screens/myCostume/components/costumeItem"

interface ICostumeTabPageProps {
  type: CommodityType
}
const CostumeTabPage: React.FC<ICostumeTabPageProps> = ({ type }) => {
  const {
    myCostumeStore: {
      initClothes,
      clothes,
      faces,
      actionCommodities,
      initFaces,
      initActionCommodities,
    },
  } = useStores()
  const data = useMemo(() => {
    switch (type) {
      case CommodityType.clothes:
        return clothes
      case CommodityType.face:
        return faces
      case CommodityType.action:
        return actionCommodities
      default:
        return []
    }
  }, [type, clothes, faces, actionCommodities])
  const init = async () => {
    switch (type) {
      case CommodityType.clothes:
        await initClothes()
        break
      case CommodityType.face:
        await initFaces()
        break
      case CommodityType.action:
        await initActionCommodities()
        break
    }
  }
  useEffect(() => {
    init()
  }, [])
  const renderItem = ({ item }) => {
    return <CostumeItem item={item}></CostumeItem>
  }
  const renderListFooterComponent = () => {
    return (
      <View style={styles.pageFooterContainer}>
        <Text style={styles.pageFooterText}>这是我的底线</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      style={styles.pageContainer}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.pageInnerContainer}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapperStyle}
      ListFooterComponent={renderListFooterComponent}
    ></FlatList>
  )
}
export default observer(CostumeTabPage)
