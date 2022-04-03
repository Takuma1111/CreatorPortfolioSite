import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import MovieForm from "../post/MovieForm"

import { getMovies} from "../../lib/api/movies"

import { Movie } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))

const MoviePost: React.FC = () => {
  const classes = useStyles()
  const [movies, setMovies] = useState<Movie[]>([])

  const handleGetMovies = async () => {
    const { data }  = await getMovies()
    console.log("取得したデータ")
    console.log(data.movies)
    setMovies(data.movies)
  }

  useEffect(() => {
    handleGetMovies()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <MovieForm
            handleGetMovies={handleGetMovies}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default MoviePost