
import { AxiosPromise } from "axios"

import client from "./client"
import { SoundApiJson,Sound } from "../../interfaces/index"

// post取得
export const getSounds = (): AxiosPromise<SoundApiJson> => {
  return client.get("/sounds")
}

export const findSounds = (id: string): AxiosPromise<Sound> => {
    return client.get(`/sounds/${id}`)
  }

// post作成
export const createSound = (data: FormData): AxiosPromise => {
  return client.post("/sounds", data)
}

// post削除
export const deleteSound = (id: string): AxiosPromise => {
  return client.delete(`/sounds/${id}`)
}