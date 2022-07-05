import { WishList, WishListItem } from "./WithList"
import { getSnapshot, onPatch } from "mobx-state-tree"
import { reaction } from "mobx"

it("can create an instance of a model ", () => {
  const item = WishListItem.create({
    name: "测试1",
    price: 12.5,
  })
  expect(item.price).toBe(12.5)
  expect(item.image).toBe("")
  expect(item.name).toBe("测试1")
  item.changeName("测试2")
  expect(item.name).toBe("测试2")
})

it("can create a wishListView", function () {
  const list = WishList.create()
  const patches = []
  onPatch(list, (patch) => {
    patches.push(patch)
  })
  list.add({ name: "测试3", price: 11, image: "" })
  expect(getSnapshot(list)).toMatchSnapshot()
  list.items[0].changeName("测试4")
})
it("can calculate the total price of a wishlist ", function () {
  const list = WishList.create()
  let changed = 0
  reaction(
    () => list.totalPrice,
    () => changed++,
  )
  expect(list.totalPrice).toBe(0)
  expect(changed).toBe(0)
  list.add(WishListItem.create({ name: "测试3", price: 11, image: "" }))
  expect(list.totalPrice).toBe(11)
  expect(changed).toBe(1)
  list.items[0].changePrice(12)
  expect(changed).toBe(2)
  list.add(WishListItem.create({ name: "测试4", price: 55, image: "" }))
})
