import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PhotoForm from "../post/PhotoForm"
import PhotoItem from "../post/PhotoItem"
import { findMovies } from "../../lib/api/movies"
import { getCurrentUser } from "../../lib/api/auth"
import { Movie } from "../../interfaces/index"
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
    padding-top : 30%;
    padding-left : 30%;
    texta-align: center;
`;


const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

  
export const MovieShow  = (props: Props) => {

  const classes = useStyles()
  const [movies, setMovie] = useState<Movie>()
 
  const handleFindMovies = async () => {
    const { data }  = await findMovies(props.match.params.id)
  
    setMovie(data)
  
  }

  useEffect(() => {
    handleFindMovies()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
            <Under><h2>{movies?.name}</h2></Under>
            <PhotoContentsList>
              <ReactPlayer url={movies?.url?.url} width="80%" height = "500px" id="MainPlay" muted playing loop controls={true} />
                {/* <img src={movies?.url?.url} alt="" width="90%" height = "80%" /> */}
                <div>
                    <ExplainContent>
                        <h2>説明</h2>
                            <p>{movies?.text}</p>
                    </ExplainContent>
                </div>

            </PhotoContentsList>
    </Container>
  )
}

export default MovieShow