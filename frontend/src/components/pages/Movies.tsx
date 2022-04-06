import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import MovieItem from "../post/MovieItem"

import { getMovies } from "../../lib/api/movies"

import { Movie } from "../../interfaces/index"
import { Link } from "react-router-dom";

import {ContentsLists,Box,Under,PostButton} from "../../style"



const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    marginTop: "3rem"
  }
}))


const Movies: React.FC = () => {
  const classes = useStyles()
  const [movies, setMovies] = useState<Movie[]>([])

  const handleGetMovies = async () => {
    const { data }  = await getMovies()
    setMovies(data.movies)
  }

  useEffect(() => {
    handleGetMovies()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container} >
      <Grid container direction="row" justifyContent="center">
        <Grid item>
        <PostButton ><Link to={`/movie/post`} >投稿する</Link></PostButton>

            <Under><h2>映像作品一覧</h2></Under>
            <ContentsLists>
            { movies?.map((movie: Movie) => {
                return (
                
                <Link to={`/movies/${movie.id}`}>
                <Box>
                    <MovieItem
                        key={movie.id}
                        movie = {movie}
                        handleGetMovies={handleGetMovies}
                    />
                </Box>
                </Link>
                )}
            )}
            </ContentsLists>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Movies