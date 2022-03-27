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
import { Link,RouteComponentProps } from "react-router-dom";

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
    padding-top : 15%;
    texta-align: center;
`;

const ExplainTitle = styled.h2 `
    margin: auto;
`;
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
            <Under><h2>{photos?.name}</h2></Under>
            <PhotoContentsList>
                <img src={photos?.url?.url} alt="" width="90%" height = "80%" />
                <div>
                    <ExplainTitle><h2>説明</h2></ExplainTitle>
                        <ExplainContent>
                            <p>{photos?.text}</p>
                        </ExplainContent>
                </div>

            </PhotoContentsList>
    </Container>
  )
}

export default PhotoShow