import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"
export default StyleSheet.create({
  bodyPendantsContainer: {
    height: p2d(345),
    marginTop: p2d(20),
    position: "relative",
    width: p2d(345),
  },
  bodyRightPartBtnGroups: {
    position: "absolute",
    right: p2d(5),
    top: p2d(10),
  },
  bodyRightPartBtnImage: {
    height: p2d(40),
    marginBottom: p2d(15),
    width: p2d(40),
  },
  bodyTurnLeftBtn: {
    height: p2d(65),
    width: p2d(65),
  },
  bodyTurnLeftBtnWrapper: {
    bottom: 0,
    left: p2d(15),
    position: "absolute",
  },
  bodyTurnRightBtn: {
    height: p2d(65),
    width: p2d(65),
  },
  bodyTurnRightBtnWrapper: {
    bottom: 0,
    position: "absolute",
    right: p2d(15),
  },
  headerBackBtnContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerBackIcon: {
    height: p2d(20),
    width: p2d(10),
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: p2d(48),
    justifyContent: "space-between",
    paddingHorizontal: p2d(18),
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
    flex: 1,
  },
  saveBtnContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: p2d(16),
    height: p2d(32),
    justifyContent: "center",
    width: p2d(68),
  },
  saveBtnText: {
    color: "#52C3FF",
    fontSize: p2d(16),
    fontWeight: "bold",
    includeFontPadding: false,
  },
  tabBar: {
    alignItems: "center",
    backgroundColor: "#52C3FF",
    borderRadius: p2d(40),
    flexDirection: "row",
    height: p2d(80),
    justifyContent: "space-between",
    paddingHorizontal: p2d(16),
    position: "absolute",
    top: 0,
    width: p2d(208),
    zIndex: 1,
  },
  tabContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: p2d(94),
    justifyContent: "flex-end",
    position: "relative",
    width: "100%",
  },
  tabItemImage: {
    height: p2d(48),
    width: p2d(48),
  },
  tabTopBottomPart: {
    alignItems: "flex-end",
    backgroundColor: "#FFF",
    borderTopLeftRadius: p2d(30),
    borderTopRightRadius: p2d(30),
    flexDirection: "row",
    height: p2d(54),
    width: "100%",
    zIndex: 0,
  },
  tabTopBottomPartText: {
    color: "#000",
    fontSize: p2d(17),
    fontWeight: "bold",
    includeFontPadding: false,
    marginLeft: p2d(15),
  },
  tabViewContainer: {
    marginTop: p2d(-83),
  },
  topPartContainer: {
    alignItems: "center",
  },
  topPartWrapper: {
    height: p2d(600),
  },
})
