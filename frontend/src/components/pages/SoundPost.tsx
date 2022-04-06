import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import SoundForm from "../post/SoundForm"

import { getSounds} from "../../lib/api/sounds"

import { Sound } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

const SoundPost: React.FC = () => {
  const classes = useStyles()
  const [sound, setSounds] = useState<Sound[]>([])

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
          <SoundForm
            handleGetSounds={handleGetSounds}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SoundPost