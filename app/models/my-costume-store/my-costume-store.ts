import {
  applySnapshot,
  getParent,
  getSnapshot,
  Instance,
  SnapshotOut,
  types,
} from "mobx-state-tree"

const CharacterModel = types
  .model({
    gender: types.optional(types.enumeration("gender", ["m", "f"]), "m"),
    head: types.optional(types.string, ""),
    clothes: types.optional(types.string, ""),
    trousers: types.optional(types.string, ""),
    shoes: types.optional(types.string, ""),
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
export const MyCostumeStore = types
  .model({
    character: CharacterModel,
    recorder: RecordModel,
  })
  .actions((self) => ({
    next: () => {
      self.recorder.next(self.character)
    },
    reduction: () => {
      self.recorder.reduction(self.character)
    },
    reset: () => {
      self.recorder.reset(self.character)
    },
  }))

export interface MyCostumeStoreType extends Instance<typeof MyCostumeStore> {}
export interface MyCostumeStoreSnapshot extends SnapshotOut<typeof MyCostumeStore> {}
