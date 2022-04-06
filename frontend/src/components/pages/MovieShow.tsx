import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { findMovies } from "../../lib/api/movies"
import { Movie } from "../../interfaces/index"
import { Link,RouteComponentProps } from "react-router-dom";
import ReactPlayer from 'react-player'
import {ContentsList,Under,ExplainContent} from "../../style"



interface Props extends RouteComponentProps<{ id: string }>{}


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
            <ContentsList>
              <ReactPlayer url={movies?.url?.url} width="80%" height = "500px" id="MainPlay" muted playing loop controls={true} />
                <div>
                    <ExplainContent>
                        <h2>説明</h2>
                            <p>{movies?.text}</p>
                    </ExplainContent>
                </div>

            </ContentsList>
    </Container>
  )
}

export default MovieShow