import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PhotoForm from "../post/PhotoForm"
import PhotoItem from "../post/PhotoItem"

import { getPhotos } from "../../lib/api/photos"
import { getCurrentUser } from "../../lib/api/auth"

import { Photo } from "../../interfaces/index"
import styled from 'styled-components';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const PhotosContentsList = styled.div`
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
const PostButton = styled.a`
  color: skyblue;
  text-decoration:none;
  float: right;
  padding:15px;
  border-radius: 100vh;
  background-color: #A9A9A9;
`;

const Under = styled.h2 `
  border-bottom: solid 2px gray;
  font-family:inherit;
  font-size: 35px;
  font-weight: 700;
  word-break: break-all;
  color: #777777;
`;




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
            <PostButton ><Link to={`/photo/post`} >投稿する</Link></PostButton>
            <Under><h2>写真投稿一覧</h2></Under>
          
            <PhotosContentsList>
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
            </PhotosContentsList>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Photos