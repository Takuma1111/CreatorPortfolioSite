import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PhotoForm from "../post/PhotoForm"

import { getPhotos } from "../../lib/api/photos"

import { Photo } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

const PhotoPost: React.FC = () => {
  const classes = useStyles()
  const [photos, setPhotos] = useState<Photo[]>([])

  const handleGetPhotos = async () => {
    const { data }  = await getPhotos()
    console.log("取得したデータ")
    console.log(data.photos)
    setPhotos(data.photos)
  }

  useEffect(() => {
    handleGetPhotos()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <PhotoForm
            handleGetPhotos={handleGetPhotos}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default PhotoPost