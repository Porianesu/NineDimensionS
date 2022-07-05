import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"

export default StyleSheet.create({
  tabBar: {
    alignItems: "center",
    flexDirection: "row",
    height: p2d(90),
    justifyContent: "space-between",
    paddingHorizontal: p2d(28),
  },
  tabItem: {
    alignItems: "center",
    display: "flex",
    height: p2d(56),
    justifyContent: "center",
    width: p2d(56),
  },
  tabItemImage: {
    height: p2d(28),
    width: p2d(28),
  },
  tabItemText: {
    color: "#062A4E",
    fontSize: p2d(10),
    includeFontPadding: false,
  },
})
