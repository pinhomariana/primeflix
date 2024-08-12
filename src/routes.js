import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Header from "./Components/Header";
import React from 'react'
import Error from "./Pages/Error";
import Favourites from "./Pages/Favourites";

export default function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/movie/:id" element={ <Movies/> }/>
            <Route path="/favourites" element={ <Favourites/> }/>

            <Route path="*" element={ <Error/>}/>
        </Routes>
    </BrowserRouter>
  )
}
