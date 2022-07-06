import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { Images } from "@/theme"
import Swiper from "react-native-swiper"
import RefreshNormalHeader from "@/components/RefreshControl/RefreshNormalHeader"

interface IMainPageProps {}
const MainPage: React.FC<IMainPageProps> = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  return (
    <ScrollView
      refreshControl={<RefreshNormalHeader onRefresh={onRefresh} refreshing={refreshing} />}
      style={styles.bodyPart}
      contentContainerStyle={styles.bodyContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.characterBG}>
        <TouchableOpacity style={styles.dressUpBtn}>
          <Image style={styles.dressUpBtnImage} source={Images.TabStack.main_page_dress_up_icon} />
          <Text style={styles.dressUpBtnText}>装扮</Text>
        </TouchableOpacity>
        <Text style={styles.characterName}>Character Name</Text>
        <TouchableOpacity style={styles.characterShareBtn}>
          <Image
            style={styles.characterShareBtnImage}
            source={Images.TabStack.main_page_character_share}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scenePart}>
        <Text style={styles.sceneTitle}>我的场景</Text>
        <View style={styles.sceneContainer}>
          <Text style={styles.sceneDesText1}>尽情期待</Text>
          <Text style={styles.sceneDesText2}>即将上线...</Text>
        </View>
      </View>
      <View style={styles.brandPart}>
        <Text style={styles.brandTitle}>平台活动</Text>
        <View style={styles.bannerContainer}>
          <Swiper
            autoplay={true}
            autoplayDirection={true}
            showsButtons={false}
            showsPagination={false}
            loop={true}
            horizontal={true}
          >
            <View style={styles.brandContainer}>
              <Text style={styles.brandDesText}>Nike清澜联名款限量发售1000份1</Text>
            </View>
            <View style={styles.brandContainer}>
              <Text style={styles.brandDesText}>Nike清澜联名款限量发售1000份2</Text>
            </View>
            <View style={styles.brandContainer}>
              <Text style={styles.brandDesText}>Nike清澜联名款限量发售1000份3</Text>
            </View>
          </Swiper>
        </View>
      </View>
    </ScrollView>
  )
}
export default observer(MainPage)
