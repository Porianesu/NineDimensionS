import {
  applySnapshot,
  getParent,
  getSnapshot,
  Instance,
  SnapshotOut,
  types,
} from "mobx-state-tree"
import data from "@/models/my-costume-store/clothes"
const { clothes, faces, actions } = data

const CharacterModel = types
  .model({
    gender: types.optional(types.enumeration("gender", ["m", "f"]), "m"),
    action: types.optional(types.string, ""),
    clothes: types.optional(types.string, ""),
    face: types.optional(types.string, ""),
  })
  .actions((self) => ({
    saveSnapshot: () => {
      const newSnapshot = getSnapshot(self)
      getParent<MyCostumeStoreType>(self).recorder.onSnapshot(newSnapshot)
    },
  }))
  .actions((self) => ({
    changeGender: () => {
      if (self.gender === "f") {
        self.gender = "m"
      } else {
        self.gender = "f"
      }
      self.face = ""
      self.clothes = ""
      self.action = ""
      self.saveSnapshot()
    },
    changeClothes: (newClothes) => {
      self.clothes = newClothes
      self.saveSnapshot()
    },
    changeFace: (newFace) => {
      self.face = newFace
      self.saveSnapshot()
    },
    changeAction: (newAction) => {
      self.action = newAction
      self.saveSnapshot()
    },
  }))
const RecordModel = types
  .model({
    currentIndex: types.optional(types.number, 0),
    snapshots: types.optional(types.array(CharacterModel), []),
    replaying: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get isReductionAvailable() {
      return self.snapshots.length > 1 && self.currentIndex !== 0
    },
    get isNextAvailable() {
      return self.snapshots.length > 1 && self.snapshots.length - 1 > self.currentIndex
    },
  }))
  .actions((self) => {
    return {
      onSnapshot: (snapshot) => {
        if (!self.replaying) {
          if (self.snapshots.length && self.snapshots.length - 1 > self.currentIndex) {
            self.snapshots.splice(
              self.currentIndex + 1,
              self.snapshots.length - 1 - self.currentIndex,
            )
          }
          self.snapshots.push(snapshot)
          self.currentIndex++
        }
      },
      reduction: (targetStore) => {
        if (self.isReductionAvailable) {
          self.replaying = true
          self.currentIndex -= 1
          const targetSnapshot = self.snapshots[self.currentIndex]
          applySnapshot(targetStore, targetSnapshot)
          self.replaying = false
        }
      },
      next: (targetStore) => {
        if (self.isNextAvailable) {
          self.replaying = true
          self.currentIndex += 1
          const targetSnapshot = self.snapshots[self.currentIndex]
          applySnapshot(targetStore, targetSnapshot)
          self.replaying = false
        }
      },
      reset: (targetStore) => {
        if (self.snapshots.length) {
          const firstSnapShots = self.snapshots[0]
          applySnapshot(targetStore, firstSnapShots)
          self.snapshots.splice(1, self.snapshots.length - 1)
          self.currentIndex = 0
        }
      },
    }
  })
const CommodityModel = types
  .model({
    id: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    seq: types.optional(types.number, 0),
    gender: types.enumeration("gender", ["m", "f", "currency"]),
    type: types.enumeration("type", ["clothes", "face", "action"]),
  })
  .views((self) => ({
    get isGenderAvailable() {
      // @ts-ignore
      return self.gender === "currency" ? true : getParent(self, 2).character.gender === self.gender
    },
    get isCurrentCommoditySelected() {
      const parent = getParent(self, 2)
      switch (self.type) {
        case "clothes":
          // @ts-ignore
          return parent.character.clothes === self.id
        case "face":
          // @ts-ignore
          return parent.character.face === self.id
        case "action":
          // @ts-ignore
          return parent.character.action === self.id
        default:
          return false
      }
    },
  }))
  .actions((self) => ({
    tryCommodity: () => {
      getParent<MyCostumeStoreType>(self, 2).tryCommodity(self)
    },
  }))
export type CommodityModelType = Instance<typeof CommodityModel>
export const MyCostumeStore = types
  .model({
    character: CharacterModel,
    recorder: RecordModel,
    clothes: types.optional(types.array(CommodityModel), []),
    faces: types.optional(types.array(CommodityModel), []),
    actionCommodities: types.optional(types.array(CommodityModel), []),
  })
  .actions((self) => ({
    addClothes: (newClothes) => {
      self.clothes.push(...newClothes)
    },
    addFaces: (newFaces) => {
      self.faces.push(...newFaces)
    },
    addActionCommodities: (newActionCommodities) => {
      self.actionCommodities.replace(newActionCommodities)
    },
    next: () => {
      self.recorder.next(self.character)
    },
    reduction: () => {
      self.recorder.reduction(self.character)
    },
    reset: () => {
      self.recorder.reset(self.character)
    },
    tryCommodity: (item) => {
      switch (item.type) {
        case "clothes":
          self.character.changeClothes(item.id)
          break
        case "face":
          self.character.changeFace(item.id)
          break
        case "action":
          self.character.changeAction(item.id)
          break
        default:
          break
      }
    },
  }))
  .actions((self) => ({
    initClothes: async () => {
      if (self.clothes.length === 0) {
        const res = await new Promise((resolve) => {
          resolve(clothes)
        })
        if (Array.isArray(res)) {
          self.addClothes(res)
        }
      }
    },
    initFaces: async () => {
      if (self.faces.length === 0) {
        const res = await new Promise((resolve) => {
          resolve(faces)
        })
        if (Array.isArray(res)) {
          self.addFaces(res)
        }
      }
    },
    initActionCommodities: async () => {
      if (self.actionCommodities.length === 0) {
        const res = await new Promise((resolve) => {
          resolve(actions)
        })
        if (Array.isArray(res)) {
          self.addActionCommodities(res)
        }
      }
    },
  }))

export interface MyCostumeStoreType extends Instance<typeof MyCostumeStore> {}
export interface MyCostumeStoreSnapshot extends SnapshotOut<typeof MyCostumeStore> {}
