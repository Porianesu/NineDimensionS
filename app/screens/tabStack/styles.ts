import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"

export default StyleSheet.create({
  headerLeftIcon: {
    height: p2d(40),
    width: p2d(90),
  },
  headerLeftText: {
    color: "#000",
    fontSize: p2d(20),
    fontWeight: "bold",
    marginLeft: p2d(8),
  },
  headerPart: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: p2d(48),
    justifyContent: "space-between",
    paddingHorizontal: p2d(20),
  },
  headerRightImage: {
    height: p2d(32),
    width: p2d(32),
  },
  headerRightPart: {},
  pageContainer: {
    backgroundColor: "#EFF9FF",
    flex: 1,
  },
  tabBar: {
    alignItems: "center",
    backgroundColor: "#fff",
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
