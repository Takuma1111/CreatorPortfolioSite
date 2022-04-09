import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"


import { Sound } from "../../interfaces/index"
import { deleteSound } from "../../lib/api/sounds"

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


interface SoundItemProps {
  sound: Sound
  handleGetSounds: Function
}

const SoundItem = ({ sound, handleGetSounds }: SoundItemProps) => {
  const classes = useStyles()
  const [like, setLike] = useState<boolean>(false)

  const handleDeleteSound = async (id: string) => {
    await deleteSound(id)
    .then(() => {
      handleGetSounds()
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
          title={sound.name}
        />
        { sound.url?.url ?
          <CardMedia
          component='img'
          image="https://creatorportfolio.s3.ap-northeast-1.amazonaws.com/%E9%9F%B3%E6%A5%BD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3+1.png"
          /> : null
        }
        
      </Card>
    </>
  )
}

export default SoundItem