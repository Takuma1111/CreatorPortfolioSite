import React, { useEffect, useState } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import MovieForm from "../post/MovieForm"
import MovieItem from "../post/MovieItem"

import { getMovies } from "../../lib/api/movies"
import { getCurrentUser } from "../../lib/api/auth"

import { Movie } from "../../interfaces/index"
import styled from 'styled-components';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const Under = styled.h2 `
  border-bottom: solid 2px gray;
  font-family:inherit;
  font-size: 35px;
  font-weight: 700;
  word-break: break-all;
  color: #777777;
`;
const MoviesContentsList = styled.div`
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

const PostButton = styled.div`
  color: skyblue;
  text-decoration:none;
  float: right;
  padding:15px;
  border-radius: 100vh;
  background-color: #A9A9A9;
`;


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
        <PostButton ><Link to={`/movie/post`} >投稿する</Link></PostButton>

        {/* <PostButton><Link to={`/movie/post`}>投稿する</Link></PostButton> */}
            <Under><h2>映像作品一覧</h2></Under>
            <MoviesContentsList>
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
            </MoviesContentsList>            
        </Grid>
      </Grid>
    </Container>
  )
}

export default Movies