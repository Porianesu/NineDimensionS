import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"

export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  headerBackBtnContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerBackIcon: {
    height: p2d(20),
    marginLeft: p2d(18),
    width: p2d(10),
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#52C3FF",
    flexDirection: "row",
    height: p2d(48),
    width: "100%",
  },
  headerText: {
    color: "#FFF",
    fontSize: p2d(17),
    fontWeight: "bold",
    includeFontPadding: false,
    marginLeft: p2d(16),
  },
  pageContainer: {
    backgroundColor: "#EFF9FF",
    flex: 1,
    width: "100%",
  },
})
