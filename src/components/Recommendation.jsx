import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../api/data';


export const Recommendation = (props) => {

    const [recommendations, setRecommendations] = useState([]);
   
    const API_KEY = import.meta.env.VITE_API_KEY;
    const src = 'https://image.tmdb.org/t/p/w500/';
    const {movieId} = useParams();

    
    
    useEffect(() => {
        api
            .get(`movie/${movieId}/recommendations?api_key=${API_KEY}`)
            .then(response => setRecommendations(response.data.results))
    }, []); 

    
    
    return (
        <>
            <h2 className="w-[90%] mx-auto text-slate-300 text-[2rem] pb-4 mt-[5rem] border-b-[1px] border-slate-600">Recommendations</h2>
            <div className="w-[90%] mx-auto flex flex-wrap justify-center gap-x-3 gap-y-16 pb-[8rem] pt-16">

                {recommendations.map(item => {
                if(item.poster_path !== null) {
                    return (

                        <div key={item.id} className="
                        max-w-[16rem]
                        min-w-[10rem]
                        h-26
                        bg-gray-300
                        rounded-md
                        hover:bg-opacity-60
                        ">
                            <a href={props.streaming}  key={item.id}>
                                <img className="aspect-auto w-[100%]" src={`${src}${item.poster_path}`} />
                                <p className="text-center text-sm text-slate-400 pt-2 pb-2 mb-4">{item.title}</p>
                            </a>
                        </div>
                       
                    )
                }
                

                })}
                {recommendations.length === 0 && <div className="text-slate-700">none recommended for this movie</div>}
            </div>
        </>
        
    )
}



