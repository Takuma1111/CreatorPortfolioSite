import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { findSounds } from "../../lib/api/sounds"
import { Sound } from "../../interfaces/index"
import { Link,RouteComponentProps } from "react-router-dom";

import {ContentsList,SoundContent,Under,ExplainContent} from "../../style"


interface Props extends RouteComponentProps<{ id: string }>{}

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
            <ContentsList>
              <SoundContent><audio controls src={sounds?.url?.url}  /></SoundContent>
              {/* <ReactPlayer url={sounds?.url?.url} width="80%" height = "500px" id="MainPlay" muted playing loop controls={true} /> */}
                <div>
                    <ExplainContent>
                        <h2>説明</h2>
                            <p>{sounds?.text}</p>
                    </ExplainContent>
                </div>

            </ContentsList>
    </Container>
  )
}

export default SoundShow