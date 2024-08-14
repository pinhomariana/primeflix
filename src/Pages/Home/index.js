import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
  const [movies, setMovies] =  useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadMovies(page = 1){
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: `${process.env.REACT_APP_API_KEY}`,
          page: page,
        }
      })
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    }
   loadMovies(currentPage); 
   window.scrollTo(0, 0);
  }, [currentPage])

  if(loading){
    return(
      <div className='loading'>
        <h2>Loading</h2>
      </div>
    )
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
      <div className='pagination'>
        <button class="button-18" role="button" onClick={handlePrevious} disabled={currentPage === 1}>Back</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button class="button-18" role="button" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  )
}
