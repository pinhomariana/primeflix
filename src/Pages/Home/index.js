import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
  const [movies, setMovies] =  useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies(){
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: `${process.env.REACT_APP_API_KEY}`,
          page: 1,
        }
      })
      setMovies(response.data.results.splice(0, 10))
      setLoading(false);
    }
   loadMovies(); 
  }, [])

  if(loading){
    return(
      <div className='loading'>
        <h2>Loading</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='movies-list'>
        {movies.map((movie) => {
          return(
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}></img>
              <Link to={`/movie/${movie.id}`}>View Details</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
