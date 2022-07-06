import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"

export default StyleSheet.create({
  bodyContainer: {
    alignItems: "center",
    paddingBottom: p2d(30),
  },
  bodyPart: {
    flex: 1,
    width: "100%",
  },
  clipBoardContainer: {
    marginTop: p2d(15),
  },
  sceneContainer: {
    backgroundColor: "#52C3FF",
    borderRadius: p2d(15),
    height: p2d(120),
    paddingLeft: p2d(20),
    paddingTop: p2d(20),
    width: "100%",
  },
  sceneDesText1: {
    color: "#FFF",
    fontSize: p2d(18),
    fontWeight: "bold",
    includeFontPadding: false,
  },
  sceneDesText2: {
    color: "#FFF",
    fontSize: p2d(14),
    includeFontPadding: false,
    marginTop: p2d(2),
  },
  scenePart: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: p2d(32),
    paddingHorizontal: p2d(20),
    width: "100%",
  },
  secondSceneContainer: {
    marginTop: p2d(20),
  },
})
