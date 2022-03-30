import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { findSounds } from "../../lib/api/sounds"
import { getCurrentUser } from "../../lib/api/auth"
import { Sound } from "../../interfaces/index"
import styled from 'styled-components';
import Cookies from "js-cookie";
import { Link,RouteComponentProps } from "react-router-dom";
import ReactPlayer from 'react-player'

interface Props extends RouteComponentProps<{ id: string }>{}


const Box = styled.div`
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #777777;
  background: white;
  border-top: solid 5px #777777;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
`;


const PhotoContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 150px;
  padding-right: 10%;
  padding-left: 10%;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
`;

const Under = styled.h1 `
  border-bottom: solid 2px gray;
  font-family:inherit;
  font-size: 35px;
  font-weight: 700;
  word-break: break-all;
  color: #777777;
`;


const ExplainContent = styled.p `
    padding-left : 50px;
    texta-align: center;
    width: 100px;
`;

const SoundContent = styled.p `
    width: 100%;
    height: 100%;
`;

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

  
export const SoundShow  = (props: Props) => {

  const classes = useStyles()
  const [sounds, setSound] = useState<Sound>()
 
  const handleFindSounds = async () => {
    const { data }  = await findSounds(props.match.params.id)
  
    setSound(data)
  
  }

  useEffect(() => {
    handleFindSounds()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
            <Under><h2>{sounds?.name}</h2></Under>
            <PhotoContentsList>
              <SoundContent><audio controls src={sounds?.url?.url}  /></SoundContent>
              {/* <ReactPlayer url={sounds?.url?.url} width="80%" height = "500px" id="MainPlay" muted playing loop controls={true} /> */}
                <div>
                    <ExplainContent>
                        <h2>説明</h2>
                            <p>{sounds?.text}</p>
                    </ExplainContent>
                </div>

            </PhotoContentsList>
    </Container>
  )
}

export default SoundShow