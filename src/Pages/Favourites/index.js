import React from 'react';
import './Favourites.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import image from './sad-face.png'

export default function Favourites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@primeflix")
        setMovies(JSON.parse(myList) || []);
    }, [])

    function deleteMovie(id){
      let filteredMovies = movies.filter((movie) =>{
        return (movie.id !== id);
      })
      setMovies(filteredMovies);
      localStorage.setItem("@primeflix", JSON.stringify(filteredMovies));
      toast.success("Movie deleted.")
    }

  return (
    <div className='my-list'>
      <h1>My movies</h1>
      {movies.length === 0 && <span>Your saved movies list is currently empty. Start adding movies to your collection!
        <img src={image}></img>
        </span>}
      <ul>
        {movies.map((movie) => {
          return(
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>See details</Link>
                <button class="button-18" role="button" onClick={() => deleteMovie(movie.id)}>
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
