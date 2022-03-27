import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import styled from 'styled-components';

import { Photo } from "../../interfaces/index"
import { deletePhoto } from "../../lib/api/photos"

const useStyles = makeStyles(() => ({
  card: {
    width: 220,
    height: 300, 
    textAlign: "center",
    marginTop: "2rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)"
    }
  },
  delete: {
    marginLeft: "auto"
  }
}))


interface PhotoItemProps {
  photo: Photo
  handleGetPhotos: Function
}

const PhotoItem = ({ photo, handleGetPhotos }: PhotoItemProps) => {
  const classes = useStyles()
  const [like, setLike] = useState<boolean>(false)

  const handleDeletePhoto = async (id: string) => {
    await deletePhoto(id)
    .then(() => {
      handleGetPhotos()
    })
  }

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              U
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={photo.name}
        />
        { photo.url?.url ?
          <CardMedia
            component="img"
            src={photo.url.url}
            alt="photo image"
          /> : null
        }
       
       
      </Card>
    </>
  )
}

export default PhotoItem