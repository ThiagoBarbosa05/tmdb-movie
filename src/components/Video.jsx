import {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import {IoMdClose} from 'react-icons/io';
import api from '../api/data';

export const Video = (props) => {

    const [videoResults, setVideoResults] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const {movieId} = useParams();

    const getVideos = (movieId) => {
        api
            .get(`/movie/${movieId}/videos?api_key=${API_KEY}`)
            .then(response => {
                setVideoResults(response.data.results.map(item => item))
            }) 
    } 

    useEffect(() => {
        getVideos(movieId)
    }, [])

    console.log(videoResults)
 
    return (
        <div className="w-[90%] mx-auto mt-16 py-10 bg-black flex gap-x-2 gap-y-3 flex-wrap justify-center relative">
           
            <button 
                onClick={props.closeVideo} 
                    className="
                      text-slate-50
                        text-[1.1rem]
                        absolute
                        right-3
                        top-3
                "
            >
                    <IoMdClose />
            </button>
            {videoResults?.map(item => {

                
                if(item.name.match(/Trailer/)){
                    return (  
                        <div className=" 
                        w-[100%]
                        max-w-[720px]
                        min-w-[320px]
                        " 
                        key={item.id}>
                            <ReactPlayer width="100%" url={`https://www.youtube.com/watch?v=${item.key}`} />
                        </div>
                 )
                } 

                

                
            }

        )
    }
        {videoResults?.length === 0 && <div className="text-slate-300">no video to display here</div>}
        </div>
    )

    
} 