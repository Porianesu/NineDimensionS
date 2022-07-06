import { Animated, StyleSheet, View } from "react-native"
import React, { useCallback, useRef, useState } from "react"
import { RefreshHeader, RefreshLayout } from "react-native-refresh"
import { Images } from "@/theme"
import LottieView from "lottie-react-native"

// import Dayjs from "dayjs"
import { Animations } from "@/theme/animations"
import { p2d } from "@/utils/commonUtils"

function NormalRefreshHeader(props) {
  // const isFirst = useRef(true)
  const { refreshing, onRefresh } = props

  // const [title, setTitle] = useState("下拉刷新")
  const [isShowContent, setIsShowContent] = useState(true)
  // const [lastTime, setLastTime] = useState(Dayjs().format("HH:mm"))
  const rotateZRef = useRef(new Animated.Value(0))

  const onPullingRefreshCallBack = useCallback(() => {
    // console.log("onPullingRefreshCallBack")

    Animated.timing(rotateZRef.current, {
      toValue: -180,
      duration: 200,
      useNativeDriver: true,
    }).start()
    // setTitle("松开立即刷新")
  }, [])

  const onRefreshCallBack = useCallback(
    (state) => {
      // console.log("onRefreshCallBack")
      // if (isFirst.current !== true) {
      onRefresh && onRefresh(state)
      // setLastTime(Dayjs().format("HH:mm"))
      // setTitle("正在刷新...")
      // console.log("正在刷新...")
      // } else {
      //   isFirst.current = false
      // }
    },
    [onRefresh],
  )

  const onEndRefreshCallBack = useCallback(() => {
    // console.log("onEndRefreshCallBack")
    // setTitle("结束刷新")
    setIsShowContent(false)
  }, [])

  const onIdleRefreshCallBack = useCallback(() => {
    console.log("onIdleRefreshCallBack")
    Animated.timing(rotateZRef.current, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
    // setTitle("下拉刷新")
    setIsShowContent(true)
  }, [])

  return (
    <RefreshLayout
      refreshing={refreshing}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
      onIdleRefresh={onIdleRefreshCallBack}
    >
      <RefreshHeader style={styles.container}>
        <View style={styles.leftContainer}>
          {refreshing ? (
            <LottieView
              style={styles.indicator}
              source={Animations.TabStack.refreshing}
              autoPlay={true}
              loop={true}
            ></LottieView>
          ) : (
            isShowContent && (
              <Animated.Image
                style={[
                  styles.image,
                  {
                    opacity: refreshing ? 0 : 1,
                    transform: [
                      {
                        rotate: rotateZRef.current.interpolate({
                          inputRange: [0, 180],
                          outputRange: ["0deg", "180deg"],
                        }),
                      },
                    ],
                  },
                ]}
                source={Images.TabStack.system_message_back_icon}
              />
            )
          )}
        </View>
        {/* <View style={styles.rightContainer}> */}
        {/*   <Text style={styles.titleStyle}>{title}</Text> */}
        {/*   <Text style={styles.timeStyle}>{`最后更新：${lastTime}`}</Text> */}
        {/* </View> */}
      </RefreshHeader>
      {props.children}
    </RefreshLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    justifyContent: "center",
  },
  image: {
    height: 30,
    position: "absolute",
    resizeMode: "contain",
    width: 30,
  },
  indicator: {
    height: p2d(80),
    width: p2d(80),
  },
  leftContainer: {
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  // rightContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: 150,
  // },
  // timeStyle: {
  //   color: "#333",
  //   fontSize: 16,
  //   marginTop: 10,
  // },
  // titleStyle: {
  //   color: "#333",
  //   fontSize: 16,
  // },
})

export default React.memo(NormalRefreshHeader)
