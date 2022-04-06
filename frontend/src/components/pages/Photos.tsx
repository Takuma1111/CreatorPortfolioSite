import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PhotoItem from "../post/PhotoItem"
import { getPhotos } from "../../lib/api/photos"

import { Photo } from "../../interfaces/index"
import { Link } from "react-router-dom";

import {ContentsLists,Box,Under,PostButton} from "../../style"


const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

const Photos: React.FC = () => {
  const classes = useStyles()
  const [photos, setPhotos] = useState<Photo[]>([])

  const handleGetPhotos = async () => {
    const { data }  = await getPhotos()
    setPhotos(data.photos)
  }

  useEffect(() => {
    handleGetPhotos()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
            <PostButton ><Link to={`/photo/post`} >投稿する</Link></PostButton>
            <Under><h2>写真投稿一覧</h2></Under>
          
            <ContentsLists>
            { photos?.map((photo: Photo) => {
                return (
                  
                <Link to={`/photos/${photo.id}`}>
                <Box>
                    <PhotoItem
                        key={photo.id}
                        photo = {photo}
                        handleGetPhotos={handleGetPhotos}
                    />
                </Box>
                </Link>
                )}
            )}
            </ContentsLists>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Photos