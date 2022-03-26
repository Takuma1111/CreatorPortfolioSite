import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PhotoForm from "../post/PhotoForm"
import PhotoItem from "../post/PhotoItem"

import { findPhotos } from "../../lib/api/photos"
import { getCurrentUser } from "../../lib/api/auth"

import { Photo } from "../../interfaces/index"
import styled from 'styled-components';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


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

const PhotoShow: React.FC = () => {
  const classes = useStyles()
  const [photos, setPhotos] = useState<Photo[]>([])


  const handleFindPhotos = async () => {
    const { data }  = await findPhotos()
    console.log("取得したデータ")
    console.log(data.photos)

    setPhotos(data.photos)
  }

  useEffect(() => {
    handleFindPhotos()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <PhotoForm
            handleGetPhotos={handleFindPhotos}
          />
            <MoviesContentsList>

            
            { photos?.map((photo: Photo) => {
                return (
                    <Link to={`/photos/${photo.id}`}  style={{ textDecoration: 'none' }}>
                    <Box>
                        <PhotoItem
                            key={photo.id}
                            photo = {photo}
                            handleGetPhotos={handleFindPhotos}
                        />
                    </Box>
                    </Link>
                )}
            )}
            </MoviesContentsList>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default PhotoShow