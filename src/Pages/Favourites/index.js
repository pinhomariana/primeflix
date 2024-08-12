import React from 'react';
import './Favourites.css';
import { useEffect, useState } from 'react';

export default function Favourites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@Movies")
    }, [])

  return (
    <div>

    </div>
  )
}
