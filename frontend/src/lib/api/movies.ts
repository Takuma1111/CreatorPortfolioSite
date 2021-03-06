
import { AxiosPromise } from "axios"

import client from "./client"
import { MovieApiJson,Movie } from "../../interfaces/index"

export const getMovies = (): AxiosPromise<MovieApiJson> => {
  return client.get("/movies")
}

export const findMovies = (id: string): AxiosPromise<Movie> => {
    return client.get(`/movies/${id}`)
  }

// post作成
export const createMovie = (data: FormData): AxiosPromise => {
  return client.post("/movies", data)
}

// post削除
export const deleteMovie = (id: string): AxiosPromise => {
  return client.delete(`/movies/${id}`)
}