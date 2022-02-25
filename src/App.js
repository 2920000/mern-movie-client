import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/home/Home";
import MovieDetail from "./components/pages/movie-detail/MovieDetail";
import Catalog from "./components/pages/catalog/Catalog";
import WatchMovie from "./components/pages/watchMovie/WatchMovie";
import Search from "./components/search/Search";
import SearchList from "./components/search/search-list/SearchList";
import Genres from "./components/pages/genres/Genres";
import NavSide from "./components/tablet-nav-sidebar/NavSide";
function App() {
  return (
    <> 
     
      <Router>
      {/* <NavSide/> */}
        <Header />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/:category/:movieId" element={<MovieDetail/>} />
              <Route  path="/:category/page/:pageNumber" element={<Catalog/>} />
              <Route path="/watch/:category/:movieId" element={<WatchMovie/>} />
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
