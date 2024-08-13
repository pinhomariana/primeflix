import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './Movies.css';
import api from '../../Services/api';
import { toast } from "react-toastify";


function Movie(){
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadMovie(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: `${process.env.REACT_APP_API_KEY}`,
        }
      })
      .then((response)=>{
        setMovie(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("MOVIE NOT FOUND")
      })
    }

    loadMovie();


    return () => {
    }
  }, [])

  if(loading){
    return(
      <div className="movie-info">
        <h1>Loading...</h1>
      </div>
    )
  }
  
  function saveMovie(){
    const myList = localStorage.getItem("@primeflix");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some( (savedMovie) => savedMovie.id === movie.id)

    if(hasMovie){
      toast.warn("This movie is already on the list.");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
    toast.success("Movie added")

  }
  
  return(
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Rating: {movie.vote_average.toFixed(2)} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Save Movie</button>
        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie;