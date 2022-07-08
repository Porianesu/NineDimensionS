import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "@/navigators"
import React, { useState } from "react"
import styles from "./styles"
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native"
import { Images } from "@/theme"
import { SafeAreaView } from "react-native-safe-area-context"
import { Route, TabView } from "react-native-tab-view"
import { NavigationState, SceneRendererProps } from "react-native-tab-view/lib/typescript/types"
import CostumeTabPage from "@/screens/myCostume/components/costumeTabPage"
import { useStores } from "@/models"
import { CommodityType } from "@/screens/myCostume/types"

const routes: Array<Route> = [
  {
    key: "0",
    title: "换装",
  },
  {
    key: "1",
    title: "捏脸",
  },
  {
    key: "2",
    title: "动作",
  },
]
const getTabImage = (key, isActive: boolean) => {
  switch (key) {
    case "0":
      if (isActive) {
        return Images.MyCostume.my_costume_clothes_active
      } else {
        return Images.MyCostume.my_costume_clothes_inactive
      }
    case "1":
      if (isActive) {
        return Images.MyCostume.my_costume_face_active
      } else {
        return Images.MyCostume.my_costume_face_inactive
      }
    case "2":
      if (isActive) {
        return Images.MyCostume.my_costume_actions_active
      } else {
        return Images.MyCostume.my_costume_actions_inactive
      }
  }
}

const MyCostume: React.FC<StackScreenProps<NavigatorParamList, "myCostume">> = (props) => {
  const { navigation, route } = props
  const {
    myCostumeStore: {
      character: { gender, changeGender, clothes, face, action },
      recorder,
      next,
      reduction,
      reset,
    },
  } = useStores()
  const [index, setIndex] = useState<number>(route?.params?.initTab || 0)
  const layout = useWindowDimensions()
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }
  const renderScene = ({
    route,
  }: SceneRendererProps & {
    route: Route
  }) => {
    switch (route.key) {
      case "0":
        return <CostumeTabPage type={CommodityType.clothes} />
      case "1":
        return <CostumeTabPage type={CommodityType.face} />
      case "2":
        return <CostumeTabPage type={CommodityType.action} />
      default:
        return null
    }
  }
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>
    },
  ) => {
    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const isActive = index === i
            const currentImage = getTabImage(route.key, isActive)
            return (
              <TouchableOpacity key={route.key} onPress={() => setIndex(i)}>
                <Image source={currentImage} style={styles.tabItemImage} />
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.tabTopBottomPart}>
          <Text style={styles.tabTopBottomPartText}>{`全部${routes[index].title}`}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={Images.MyCostume.my_costume_background}
        style={[styles.topPartWrapper, { width: layout.width }]}
      >
        <SafeAreaView edges={["top"]} style={styles.topPartContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerBackBtnContainer} onPress={goBack}>
              <Image
                style={styles.headerBackIcon}
                source={Images.TabStack.system_message_back_icon}
              ></Image>
              <Text style={styles.headerText}>我的装扮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtnContainer}>
              <Text style={styles.saveBtnText}>保存</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyPendantsContainer}>
            <Text>{face}</Text>
            <Text>{clothes}</Text>
            <Text>{action}</Text>
            {recorder ? (
              <View style={styles.bodyRightPartBtnGroups}>
                <TouchableOpacity
                  onPress={reduction}
                  activeOpacity={recorder.isReductionAvailable ? 0.5 : 1}
                >
                  <Image
                    style={styles.bodyRightPartBtnImage}
                    source={
                      recorder.isReductionAvailable
                        ? Images.MyCostume.my_costume_reduction_available
                        : Images.MyCostume.my_costume_reduction_unavailable
                    }
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={next} activeOpacity={recorder.isNextAvailable ? 0.5 : 1}>
                  <Image
                    style={styles.bodyRightPartBtnImage}
                    source={
                      recorder.isNextAvailable
                        ? Images.MyCostume.my_costume_next_available
                        : Images.MyCostume.my_costume_next_unavailable
                    }
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={reset}>
                  <Image
                    style={styles.bodyRightPartBtnImage}
                    source={Images.MyCostume.my_costume_reset}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeGender}>
                  <Image
                    style={styles.bodyRightPartBtnImage}
                    source={
                      gender === "f"
                        ? Images.MyCostume.my_costume_female
                        : Images.MyCostume.my_costume_male
                    }
                  ></Image>
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity style={styles.bodyTurnLeftBtnWrapper}>
              <Image
                style={styles.bodyTurnLeftBtn}
                source={Images.MyCostume.my_costume_turn_left}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bodyTurnRightBtnWrapper}>
              <Image
                style={styles.bodyTurnRightBtn}
                source={Images.MyCostume.my_costume_turn_right}
              ></Image>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <TabView
        lazy={true}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        initialLayout={{
          width: layout.width,
        }}
        tabBarPosition={"top"}
        style={styles.tabViewContainer}
      ></TabView>
    </View>
  )
}

export default observer(MyCostume)
