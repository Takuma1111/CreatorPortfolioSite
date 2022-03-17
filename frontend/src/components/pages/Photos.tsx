import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PostPhotoForm from "../post/PostPhotoForm"
import PostItem from "../post/PostItem"

import { getPosts } from "../../lib/api/posts"
import { Post } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

const Photos: React.FC = () => {
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
          <PostPhotoForm
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

export default Photos