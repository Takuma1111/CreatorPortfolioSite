import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import SoundItem from "../post/SoundItem"
import { getSounds } from "../../lib/api/sounds"
import { Sound } from "../../interfaces/index"
import { Link } from "react-router-dom";

import {SoundsContentsList,Box,Under,PostButton} from "../../style"

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

const Sounds: React.FC = () => {
  const classes = useStyles()
  const [sounds, setSounds] = useState<Sound[]>([])

  const handleGetSounds = async () => {
    const { data }  = await getSounds()
    setSounds(data.sounds)
  }

  useEffect(() => {
    handleGetSounds()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
        <PostButton><Link to={`/sound/post`}>投稿する</Link></PostButton>
        <Under><h2>音楽投稿一覧</h2></Under>
            <SoundsContentsList>
            { sounds?.map((sound: Sound) => {
                return (

                <Link to={`/sounds/${sound.id}`}>
                <Box>
                    <SoundItem
                        key={sound.id}
                        sound = {sound}
                        handleGetSounds={handleGetSounds}
                    />
                </Box>
                </Link>
                )}
            )}
            </SoundsContentsList>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Sounds