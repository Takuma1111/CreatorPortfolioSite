import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"
import Top from "components/pages/Top"
import Photo from "components/pages/Photos"
import PhotoShow from "components/pages/PhotoShow"
import PhotoPost from "components/pages/PhotoPost"
import Footer from "components/layouts/Footer"

import Movie from "components/pages/Movies"
import MovieShow from "components/pages/MovieShow"
import MoviePost from "components/pages/MoviePost"

import Sound from "components/pages/Sounds"
import SoundShow from "components/pages/SoundShow"
import SoundPost from "components/pages/SoundPost"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"

import PostList from "./components/post/PostList"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return   <Redirect to="/top" />
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/photos" component={Photo} />
            <Route exact path="/photo/post" component={PhotoPost} />
            <Route exact path="/photos/:id" component={PhotoShow} />
            <Route exact path="/movies" component={Movie} />
            <Route exact path="/movies/:id" component={MovieShow} />
            <Route exact path="/movie/post" component={MoviePost} />
            <Route exact path="/sounds" component={Sound} />
            <Route exact path="/sounds/:id" component={SoundShow} />
            <Route exact path="/sound/post" component={SoundPost} />

            <Route exact path="/top" component={Top} />
            <Private>
              <Route exact path="/home" component={Home} />
            </Private>
          </Switch>
        </CommonLayout>
        <Footer/>
      </AuthContext.Provider>
    </Router>
  )
}

export default App