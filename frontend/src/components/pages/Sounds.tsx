import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import SoundForm from "../post/SoundForm"
import SoundItem from "../post/SoundItem"

import { getSounds } from "../../lib/api/sounds"
import { getCurrentUser } from "../../lib/api/auth"

import { Sound } from "../../interfaces/index"
import styled from 'styled-components';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const SoundsContentsList = styled.div`
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
const Under = styled.h2 `
  border-bottom: solid 2px gray;
  font-family:inherit;
  font-size: 35px;
  font-weight: 700;
  word-break: break-all;
  color: #777777;
`;

const PostButton = styled.div`
  color: skyblue;
  text-decoration:none;
  float: right;
  padding:15px;
  border-radius: 100vh;
  background-color: #A9A9A9;`
;

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
    console.log("取得したデータ")
    console.log(data.sounds)
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