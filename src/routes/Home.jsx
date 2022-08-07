import {useEffect, useState} from 'react';
import { Releases } from "../components/Releases"
import api from '../api/data';
import { SearchMovies } from '../components/SearchMovies';
import { IoMdGift } from 'react-icons/io';

export const Home = (props) => {

  
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState({});

  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(e.target[0].value);
  }

  const getSearchResults = (value) => {
    api
    .get(`search/movie?api_key=${API_KEY}&query=${value}`) 
    .then(response => setSearchResults(response.data))
    
   }

  useEffect(() => {
    if(inputValue) {
      getSearchResults(inputValue);
    }
    
  }, [inputValue])
    
     return (
      <main>
        <form className="w-[80%] mx-auto flex items-center justify-center mt-16" onSubmit={handleSubmit}>
          <div className="bg-black w-[70%]">
            <input 
              className="
                          w-[100%] 
                          py-3 
                          px-5 
                          rounded-sm 
                          bg-slate-800 
                          text-slate-200 
                          outline-teal-300 
                          border-none
                        " 
              type="text" 
              placeholder="Search Movies" />  
           </div>
           <input
              className="
                bg-slate-700
                text-slate-200 
                px-5
                py-3
                cursor-pointer
              "   
              
              type="submit" 
              value="search"
            />
        </form>

        {inputValue.length !== 0 ? <SearchMovies data={searchResults} /> : <div className="w-[90%] mx-auto bg-gray-900 h-full pt-16 flex flex-wrap gap-x-5 justify-center gap-y-16 pb-16">{props.dataFetch.map(data => <Releases key={data.id} data={data}  />)} </div>}
  
      </main>
     
     )
}
  