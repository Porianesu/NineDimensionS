import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"
export default StyleSheet.create({
  columnWrapperStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: p2d(10),
    paddingTop: p2d(12),
  },
  pageContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    width: "100%",
  },
  pageFooterContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: p2d(30),
    width: "100%",
  },
  pageFooterText: {
    color: "#52C3FF",
    fontSize: p2d(14),
    includeFontPadding: false,
  },
  pageInnerContainer: {
    paddingTop: p2d(3),
  },
})
