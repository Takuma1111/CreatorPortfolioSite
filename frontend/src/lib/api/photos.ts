import { AxiosPromise } from "axios"

import client from "./client"
import { PhotoApiJson } from "../../interfaces/index"

// post取得
export const getPhotos = (): AxiosPromise<PhotoApiJson> => {
    console.log("直接取得したデータ")
    console.log(client.get("/photos"))
  return client.get("/photos")
}

// post作成
export const createPhoto = (data: FormData): AxiosPromise => {
  return client.post("/photos", data)
}

// post削除
export const deletePhoto = (id: string): AxiosPromise => {
  return client.delete(`/photos/${id}`)
}