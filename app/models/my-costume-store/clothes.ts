import { v4 as uuidv4 } from "uuid"

const getSeq = (() => {
  let seq = 0
  return () => {
    seq += 1
    return seq
  }
})()
const getRandom = () => {
  const random = Math.random()
  if (random >= 2 / 3) {
    return "currency"
  } else if (random >= 1 / 3) {
    return "f"
  } else {
    return "m"
  }
}
const clothes = []
for (let i = 0; i < 20; i++) {
  const seq = getSeq()
  clothes.push({
    id: uuidv4(),
    name: `商品-${seq}`,
    seq,
    gender: getRandom(),
    type: "clothes",
  })
}
const faces = []
for (let i = 0; i < 20; i++) {
  const seq = getSeq()
  faces.push({
    id: uuidv4(),
    name: `商品-${seq}`,
    seq,
    gender: getRandom(),
    type: "face",
  })
}
const actions = []
for (let i = 0; i < 20; i++) {
  const seq = getSeq()
  actions.push({
    id: uuidv4(),
    name: `商品-${seq}`,
    seq,
    gender: getRandom(),
    type: "action",
  })
}
export default { clothes, faces, actions }
