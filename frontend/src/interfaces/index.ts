// サインアップ
export interface SignUpParams {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
  
  // サインイン
  export interface SignInParams {
    email: string
    password: string
  }
  
  // ユーザー
  export interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?: string
    image?: string
    allowPasswordChange: boolean
    created_at: Date
    updated_at: Date
  }

  export interface Post {
    id: string
    name: string
    content: string
    image?: {
      url: string
    }
  }

  export interface Photo {
    id: string
    userId: string
    name: string
    text: string
    url?: {
        url: string
    }
  }
  
  export interface Movie {
    id: string
    userId: string
    name: string
    text: string
    url?: {
        url: string
    }
  }
  
    
  export interface Sound {
    id: string
    userId: string
    name: string
    text: string
    url?: {
        url: string
    }
  }

  export interface PostApiJson {
    posts: Post[]
  }

  export interface PhotoApiJson {
    photos: Photo[]
  }

  export interface MovieApiJson {
    movies: Movie[]
  }
  export interface SoundApiJson {
    sounds: Sound[]
  }
