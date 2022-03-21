import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PostPhotoForm from "../post/PostPhotoForm"
import PostItem from "../post/PostItem"

import { getPosts } from "../../lib/api/posts"
import { Post } from "../../interfaces/index"
import styled from 'styled-components';


const MoviesContentsList = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 30%;
  width: 70%;
`;

const Box = styled.div`
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #777777;
  background: white;
  border-top: solid 5px #777777;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
`;
const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
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
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          {/* <PostPhotoForm
            handleGetPosts={handleGetPosts}
          /> */}
            <MoviesContentsList>
            { posts?.map((post: Post) => {
                return (
                    <Box>
                <PostItem
                    key={post.id}
                    post={post}
                    handleGetPosts={handleGetPosts}
                />
            </Box>
                )}
            )}
            </MoviesContentsList>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Photos