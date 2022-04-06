import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { findPhotos } from "../../lib/api/photos"
import { Photo } from "../../interfaces/index"
import { RouteComponentProps } from "react-router-dom";

import {ContentsList,Under,ExplainContent,ExplainTitle} from "../../style"


interface Props extends RouteComponentProps<{ id: string }>{}



const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

  
export const PhotoShow  = (props: Props) => {

  const classes = useStyles()
  const [photos, setPhotos] = useState<Photo>()
 
  const handleFindPhotos = async () => {
    const { data }  = await findPhotos(props.match.params.id)
  
    setPhotos(data)
  
  }

  useEffect(() => {
    handleFindPhotos()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
            <Under><h3>{photos?.name}</h3></Under>
            <ContentsList>
                <img src={photos?.url?.url} alt="" width="90%" height = "80%" />
                <div>
                    <ExplainTitle><h2>説明</h2></ExplainTitle>
                        <ExplainContent>
                            <p>{photos?.text}</p>
                        </ExplainContent>
                </div>

            </ContentsList>
    </Container>
  )
}

export default PhotoShow