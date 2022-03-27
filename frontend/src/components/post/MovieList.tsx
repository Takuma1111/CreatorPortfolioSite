import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PostForm from "./PostForm"
import PostItem from "./PostItem"

import { getPosts } from "../../lib/api/posts"
import { Post } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

const PostList: React.FC = () => {
  const classes = useStyles()
  const [posts, setPosts] = useState<Post[]>([])

  const handleGetPosts = async () => {
    const { data }  = await getPosts()
    setPosts(data.posts)
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <PostForm
            handleGetPosts={handleGetPosts}
          />
          { posts?.map((post: Post) => {
            return (
              <PostItem
                key={post.id}
                post={post}
                handleGetPosts={handleGetPosts}
              />
            )}
          )}
        </Grid>   
      </Grid>
    </Container>
  )
}

export default PostList