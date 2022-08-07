import {useState, useEffect} from 'react';
import {FaRegThumbsUp, FaRegThumbsDown, FaPlay} from 'react-icons/fa';
import {AiFillStar} from 'react-icons/ai';
import {BiArrowBack} from 'react-icons/bi';
import {FiExternalLink} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import {Cast} from '../components/Cast';
import { Recommendation } from './Recommendation';
import api from '../api/data';
import { Video } from './Video';


export const Movie = (props) => {
    
     const [infoMovie, setInfoMovie] = useState({});
     const [credits, setCredits] = useState([]);
     const [genres, setGenres] = useState([]);
     const [showVideos, setShowVideos] = useState(false);
     const [streaming, setStreaming] = useState('');
     const {movieId} = useParams();
     const API_KEY = import.meta.env.VITE_API_KEY;
     const src = 'https://image.tmdb.org/t/p/w500/';


    const getMovie = (movieId) => {
        api
            .get(`movie/${movieId}?api_key=${API_KEY}`)
            .then(response => {
               
                setInfoMovie(response.data);
                setGenres(response.data.genres.map(item => item));

            })
            .catch(err => console.log(err));
    }

   
    // Get Credits Movie
    useEffect(() => {
        api
            .get(`movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(response => setCredits(response.data.cast.map(item => item)));
    }, [])

    

    const closeVideo = () => {
        setShowVideos(false);
    }

    const getStreaming = (movieId) => {
        api
            .get(`movie/${movieId}/watch/providers?api_key=${API_KEY}`)
            .then(response => {
                for(const [key, value] of Object.entries(response.data.results)) {
                    if(key === 'US') {
                        setStreaming(value.link)

                    }

                }  
            }) 
    }

    useEffect(() => {
        getMovie(movieId);
        
        getStreaming(movieId)
    }, []) 

    return ( 
        <div className="pb-16">
            <div className="border-b-[1px] border-slate-600 ml-8 mr-8">
                <Link 
                    className="
                       inline-flex
                       items-center
                        gap-x-2
                        text-slate-200
                        text-[1.5rem]
                        mt-8
                        mb-4
                    "
                    to="/"
                    >
                        <span className="pt-1"><BiArrowBack /> </span>
                        <span>Home</span>
                </Link>
            </div>
            <div className="
                    w-[100%]
                    pl-8
                    pr-8
                    mt-16
                    flex
                    flex-wrap
                    gap-x-8
                "
            >
                <div className="
                        w-[100%]
                        max-w-[350px]
                        min-w-[240px]
                    " 
                
                >
                     <img className="w-[100%]"  src={`${src}${infoMovie?.poster_path}`} />
                    <div className="flex items-center gap-x-5 mt-3">
                        <span className="flex items-center gap-x-1"> 
                            <strong className="text-yellow-300"><AiFillStar /></strong>     
                            <strong className="text-slate-400">{infoMovie?.vote_average}</strong>
                        </span>
                        <span className="flex items-center gap-x-2 text-slate-400"> 
                            <strong className="flex items-center text-teal-300">
                                <FaRegThumbsUp /> 
                                <FaRegThumbsDown/> 
                            </strong>
                            <strong>{infoMovie?.vote_count}</strong> 
                        </span>
                    </div>
                    
                    
                </div>
                <div className="
                       
                        min-w-[240px]
                    " 
                >
                    <h2 className="
                            text-white
                            text-[2.7rem]
                        "
                    >
                        {infoMovie?.title}
                    </h2>
                    <small className="text-slate-500">{infoMovie?.release_date && infoMovie?.release_date.substring(0, 4)}</small>
                    <span className="flex gap-x-2 text-slate-400 text-sm mt-3">
                        cast: <Cast credits={credits} />
                    </span>
                    <span className="flex gap-x-2 text-slate-400 text-sm">
                        genres: {genres.map(item => <small className="text-slate-200" key={item.id}>{item.name},</small>)}
                    </span> 

                    <h3 className="text-slate-200 pt-16 text-[1.8rem]">
                        Sinopse
                    </h3>               
                    <p className="
                            max-w-[640px]
                            text-slate-400
                            pt-[1rem]
                            pr-8
                            leading-7
                        "
                    >
                        {infoMovie?.overview}
                    </p>
                    <div className="flex items-center gap-x-5">
                        <button
                            onClick={() => setShowVideos(true)}
                            className="flex items-center gap-x-2 bg-red-600 text-white px-8 py-4 mt-8 rounded-2xl font-bold" 
                          
                        >
                           <FaPlay /> Watch Trailer
                        </button>
                           
                        <a href={streaming} className="flex items-center gap-x-2 bg-teal-500 text-white px-8 py-4 mt-8 rounded-2xl font-bold" >
                            <FiExternalLink /> See movie
                        </a>   
                        
                    </div>
                    
                </div> 
               
            </div>
            {showVideos && <Video closeVideo={closeVideo} /> }
            <Recommendation streaming={streaming} />
        </div>
        
    )
}