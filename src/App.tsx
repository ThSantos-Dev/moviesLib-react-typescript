// Styles
import './App.css'

// Components
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import Search from './pages/Search/Search';
import Pagination from './pages/Pagenation/Pagination';

function App() {

  return (
    <div>

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movie/:id' element={<Movie />}/>
          <Route path='/movies/page/:page' element={<Pagination />}/>
          <Route path='/search' element={<Search />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
