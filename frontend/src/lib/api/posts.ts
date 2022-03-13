import { AxiosPromise } from "axios"

import client from "./client"
import { PostApiJson } from "../../interfaces/index"

// post取得
export const getPosts = (): AxiosPromise<PostApiJson> => {
  return client.get("/posts")
}

// post作成
export const createPost = (data: FormData): AxiosPromise => {
  return client.post("/posts", data)
}

// post削除
export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/${id}`)
}