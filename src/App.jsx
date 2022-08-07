import {useEffect, useState} from 'react';
import {discoverMovie} from './api/data';
import {Header} from './components/Header';
import { Home } from './routes/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Details } from './routes/Details';
import { Recommendation } from './components/Recommendation';


function App() {

  const [dataFetch, setDataFetch] = useState([]);

  const getMovie = async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    setDataFetch(json.results);

  }
  
  useEffect(() => {
    getMovie(discoverMovie)
  }, [])
 
  return (
    <div>
       <Header />
        
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home dataFetch={dataFetch} />}/>
            <Route path='/:details/:movieId/' element={<Details />}/>
          </Routes>
       </BrowserRouter>
       
    </div>
    
     
  ) 
          
  }

export default App
