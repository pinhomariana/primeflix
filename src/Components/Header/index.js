import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
        <Link className='logo' to='/primeflix'>Prime Flix</Link>
        <Link className='favourites' to='/favourites'>My Saved Movies</Link>
    </header>
  )
}
