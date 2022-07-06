import { Instance, types } from "mobx-state-tree"
import { WishList } from "@/models/WishList/WithList"
import response from "../../../db.json"

const User = types
  .model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
  })
  .actions(function (self) {
    return {
      addSuggestions(suggestions) {
        self.wishList.items.push(...suggestions)
      },
    }
  })
  .actions((self) => ({
    // getSuggestions: flow(function* () {
    //   const response = yield fetch(`http://192.168.1.4:3001/suggestions_${self.gender}`)
    //   const suggestions = yield response.json()
    //   self.wishList.items.push(...suggestions)
    // }),
    async getSuggestions() {
      const res = await new Promise((resolve) => {
        resolve(response)
      })
      self.addSuggestions(res[`suggestions_${self.gender}`])
    },
  }))

export interface UserType extends Instance<typeof User> {}
export const Group = types.model({
  users: types.array(User),
})
