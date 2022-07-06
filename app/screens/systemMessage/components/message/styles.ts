import { StyleSheet } from "react-native"
import { p2d } from "@/utils/commonUtils"
export default StyleSheet.create({
  itemBodyPart: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: p2d(20),
    paddingLeft: p2d(15),
    paddingRight: p2d(30),
    width: "100%",
  },
  itemContainer: {
    alignItems: "center",
    flex: 1,
    marginTop: p2d(20),
    width: "100%",
  },
  itemContent: {
    color: "#8395A7",
    fontSize: p2d(14),
    includeFontPadding: false,
    marginTop: p2d(10),
  },
  itemDate: {
    color: "#000",
    fontSize: p2d(12),
    includeFontPadding: false,
  },
  itemImage: {
    backgroundColor: "#52C3FF",
    borderRadius: p2d(25),
    height: p2d(50),
    width: p2d(50),
  },
  itemMessageContainer: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: p2d(20),
    borderBottomRightRadius: p2d(20),
    borderTopLeftRadius: p2d(5),
    borderTopRightRadius: p2d(20),
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: p2d(15),
    paddingBottom: p2d(20),
    paddingLeft: p2d(20),
    paddingRight: p2d(23),
    paddingTop: p2d(15),
  },
  itemTitle: {
    color: "#000",
    fontSize: p2d(18),
    fontWeight: "bold",
    includeFontPadding: false,
  },
})
