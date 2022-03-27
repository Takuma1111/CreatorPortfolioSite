import { AxiosPromise } from "axios"

import client from "./client"
import { PhotoApiJson,PhotoFindApiJson,Photo } from "../../interfaces/index"

// post取得
export const getPhotos = (): AxiosPromise<PhotoApiJson> => {
  return client.get("/photos")
}

export const findPhotos = (id: string): AxiosPromise<Photo> => {
    return client.get(`/photos/${id}`)
  }

// post作成
export const createPhoto = (data: FormData): AxiosPromise => {
  return client.post("/photos", data)
}

// post削除
export const deletePhoto = (id: string): AxiosPromise => {
  return client.delete(`/photos/${id}`)
}