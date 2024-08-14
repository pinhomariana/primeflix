import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

export default function Error() {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h2>Not found</h2>
        <Link to='/primeflix'>Back to Home</Link>
    </div>
  )
}
