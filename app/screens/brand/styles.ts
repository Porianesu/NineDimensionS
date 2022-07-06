import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"

export default StyleSheet.create({
  backGroundImage: {
    height: p2d(258),
    marginTop: p2d(120),
    width: p2d(275),
  },
  bodyContainer: {
    alignItems: "center",
    paddingBottom: p2d(30),
  },
  bodyPart: {
    flex: 1,
    width: "100%",
  },
  infoText: {
    color: "#52C3FF",
    fontSize: p2d(16),
    includeFontPadding: false,
    marginTop: p2d(190),
  },
})
