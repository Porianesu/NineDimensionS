import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "@/navigators"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Route, SceneMap, TabView } from "react-native-tab-view"
import { TouchableOpacity, useWindowDimensions, View, Animated, Image } from "react-native"
import styles from "./styles"
import { NavigationState, SceneRendererProps } from "react-native-tab-view/lib/typescript/types"
import { Images } from "@/theme"

const routes: Array<Route> = [
  {
    key: "0",
    title: "首页",
  },
  {
    key: "1",
    title: "场景",
  },
  {
    key: "2",
    title: "品牌",
  },
  {
    key: "3",
    title: "我的",
  },
]

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
const renderScene = SceneMap({
  "0": FirstRoute,
  "1": SecondRoute,
  "2": FirstRoute,
  "3": SecondRoute,
})
const getTabImage = (key, isActive: boolean) => {
  switch (key) {
    case "0":
      if (isActive) {
        return Images.TabStack.main_page_active
      } else {
        return Images.TabStack.main_page_inactive
      }
    case "1":
      if (isActive) {
        return Images.TabStack.scene_active
      } else {
        return Images.TabStack.scene_inactive
      }
    case "2":
      if (isActive) {
        return Images.TabStack.brand_active
      } else {
        return Images.TabStack.brand_inactive
      }
    case "3":
      if (isActive) {
        return Images.TabStack.profile_active
      } else {
        return Images.TabStack.profile_inactive
      }
  }
}
const TabStack: React.FC<StackScreenProps<NavigatorParamList, "tabStack">> = (props) => {
  const layout = useWindowDimensions()
  const {
    route: {
      params: { initTab },
    },
  } = props
  const [index, setIndex] = useState<number>(initTab || 0)
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>
    },
  ) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isActive = index === i
          const currentImage = getTabImage(route.key, isActive)
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
          })

          return (
            <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => setIndex(i)}>
              <Image source={currentImage} style={styles.tabItemImage} />
              <Animated.Text style={[{ opacity }, styles.tabItemText]}>{route.title}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  return (
    <TabView
      lazy={true}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      tabBarPosition={"bottom"}
    />
  )
}
export default observer(TabStack)
