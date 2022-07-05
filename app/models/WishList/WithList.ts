import { destroy, getParent, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: types.optional(types.string, ""),
  })
  .actions((self) => ({
    changeName(newName) {
      self.name = newName
    },
    changePrice(newPrice) {
      self.price = newPrice
    },
    changeImage(newImage) {
      self.image = newImage
    },
    remove() {
      getParent<WishListType>(self, 2).remove(self as unknown as WishListItemType)
    },
  }))
export interface WishListItemType extends Instance<typeof WishListItem> {}
export interface WishListItemSnapshotOut extends SnapshotOut<typeof WishListItem> {}
export interface WishListItemSnapshotIn extends SnapshotIn<typeof WishListItem> {}
export const WishList = types
  .model({
    priceTimer: types.maybeNull(types.number),
    items: types.optional(types.array(WishListItem), []),
  })
  .actions((self) => ({
    add: (item) => {
      self.items.push(item)
    },
    startPriceChange: () => {
      if (self.priceTimer) {
        clearInterval(self.priceTimer)
        self.priceTimer = null
      } else {
        self.priceTimer = setInterval(() => {
          self.items[0].changePrice(self.items[0].price + 1)
        }, 1000) as unknown as number
      }
    },
    remove: (targetItem: WishListItemType) => {
      destroy(targetItem)
      // self.items.splice(self.items.indexOf(targetItem), 1)
    },
  }))
  .actions((self) => ({
    initWishList: async () => {
      self.items.replace([
        WishListItem.create({
          name: "测试1",
          price: 123,
          image: "",
        }),
      ])
    },
  }))
  .views((self) => {
    return {
      get totalPrice() {
        return self.items.reduce<number>((sum, entry) => {
          return sum + entry.price
        }, 0)
      },
    }
  })
export interface WishListType extends Instance<typeof WishList> {}
export interface WishListSnapshotOut extends SnapshotOut<typeof WishList> {}
export interface WishListSnapshotIn extends SnapshotIn<typeof WishList> {}
