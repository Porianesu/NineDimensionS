import { Instance, types } from "mobx-state-tree"
import dayjs from "dayjs"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

export const SystemMessage = types
  .model({
    id: types.string,
    date: types.Date,
    title: types.string,
    content: types.string,
  })
  .views((self) => ({
    get dateStr() {
      return dayjs(self.date).format("YYYY年M月DD日  HH:mm:ss")
    },
  }))
export type SystemMessageType = Instance<typeof SystemMessage>
export const SystemMessages = types
  .model({
    messages: types.array(SystemMessage),
  })
  .actions((self) => ({
    addMessages: (messages) => {
      self.messages.push(...messages)
    },
  }))
  .actions((self) => ({
    getMoreMessages: async () => {
      const res = await new Promise((resolve) => {
        resolve([
          {
            id: uuidv4(),
            title: "系统消息标题",
            date: dayjs().valueOf(),
            content: "系统消息正文内容最多支持200字，不支持富文本不支持回车。",
          },
          {
            id: uuidv4(),
            title: "系统消息标题系统消息标题系统消息标题系统消息标",
            date: dayjs().valueOf(),
            content:
              "系统消息正文内容最多支持200字，不支持富文本不支持回车。系统消息正文内容最多支持200字，不支持富文本不支持回车。系统消息正文内容最多支持200字。",
          },
        ])
      })
      if (Array.isArray(res)) {
        self.addMessages(res)
      }
    },
  }))
  .actions((self) => ({
    initMessage: async () => {
      if (self.messages.length === 0) {
        await self.getMoreMessages()
      }
    },
  }))
