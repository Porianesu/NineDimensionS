import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { Group } from "@/models/Group/Group"
import { SystemMessages } from "@/models/system-message-store/system-message-store"
import { MyCostumeStore } from "@/models/my-costume-store/my-costume-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  groupStore: types.optional(Group, {
    users: [{
      id: '0',
      name: '男1',
      gender: 'f',
      wishList: {},
    },{
      id: '1',
      name: '女1',
      gender: 'm',
      wishList: {},
    },{
      id: '2',
      name: '男2',
      gender: 'f',
      wishList: {},
    },{
      id: '3',
      name: '女2',
      gender: 'm',
      wishList: {},
    }]
  }),
  systemMessageStore: types.optional(SystemMessages,{}),
  myCostumeStore: types.optional(MyCostumeStore,{
    character: {},
    recorder: {}
  })
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
