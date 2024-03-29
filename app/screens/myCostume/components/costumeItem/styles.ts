import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"
export default StyleSheet.create({
  itemContainer: {
    alignItems: "center",
  },
  itemGenderIcon: {
    borderTopLeftRadius: p2d(10),
    height: p2d(20),
    left: 0,
    position: "absolute",
    top: 0,
    width: p2d(20),
    zIndex: 0,
  },
  itemImage: {
    height: p2d(49),
    width: p2d(49),
  },
  itemImageWrapper: {
    alignItems: "center",
    backgroundColor: "#EFF9FF",
    borderRadius: p2d(10),
    height: p2d(125),
    justifyContent: "center",
    position: "relative",
    width: p2d(82),
  },
  itemName: {
    color: "#000",
    fontSize: p2d(12),
    includeFontPadding: false,
    marginTop: p2d(10),
  },
  itemSelectedCover: {
    backgroundColor: "transparent",
    borderColor: "#00C2FF",
    borderRadius: p2d(12),
    borderStyle: "solid",
    borderWidth: p2d(4),
    height: p2d(133),
    justifyContent: "center",
    left: p2d(-4),
    position: "absolute",
    top: p2d(-4),
    width: p2d(90),
    zIndex: 1,
  },
  itemSeqContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: p2d(10),
    borderBottomRightRadius: p2d(10),
    bottom: 0,
    height: p2d(20),
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  itemSeqText: {
    color: "#FFF",
    fontSize: p2d(12),
    includeFontPadding: false,
    zIndex: 0,
  },
  itemUnavailableCover: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: p2d(10),
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  itemUnavailableCoverText: {
    color: "#FFF",
    fontSize: p2d(12),
    includeFontPadding: false,
    textAlign: "center",
    width: p2d(48),
  },
})
