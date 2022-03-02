import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import React, { Suspense } from "react";
import Home from "./components/pages/home/Home";
import MovieDetail from "./components/pages/movie-detail/MovieDetail";
import Category from "./components/pages/category/Category";
import WatchMovie from "./components/pages/watchMovie/WatchMovie";
import Search from "./components/search/Search";
import SearchList from "./components/search/search-list/SearchList";
import Genres from "./components/pages/genres/Genres";
import Season from "./components/pages/watchMovie/Season";
function App() {
  return (
    <> 
      <Router>
        <Header />
           <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/:category/:movieId" element={<MovieDetail/>} />
              <Route  path="/:category/page/:pageNumber" element={<Category/>} />
              <Route path="/watch/:category/:movieId/" element={<WatchMovie/>} >
                  <Route path=":season/:episode" element={<Season/>} />
              </Route>
              <Route path="/search/" element={<Search/>} >
                    <Route path=":keyword" element={<SearchList/>} />
              </Route>
              <Route path="/movie/genre/:genreNumber" element={<Genres/>} />
            </Routes>
          <Footer />
      </Router>
    </>
  );
}

export default App;
