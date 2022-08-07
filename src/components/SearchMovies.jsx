import {Link} from 'react-router-dom';

export const SearchMovies = (props) => {
    
    const src = 'https://image.tmdb.org/t/p/w500/';


    return (
        <div className="
            w-[90%]
            mx-auto
            flex
            flex-wrap
            justify-center
            gap-x-4
            gap-y-16
            mt-16
            b-16
        ">
            {props.data.results?.map(item => {
                if(item.poster_path !== null) {
                    return (
                        <div key={item.id} className="
                            max-w-[16rem]
                          bg-gray-300
                            rounded-md
                            hover:bg-opacity-60
                        ">
                            <Link to={`details/${item.id}`} className="
                                w-[100%]
                                max-w-[16rem] 
                                transition
                                delay-120
                                hover:opacity-80     
                            ">
                                <img 
                                    className="
                                    w-[100%]
                                    "
                                    src={`${src}${item.poster_path}`}
                                
                                />
                                <div className=" 
                                    pt-2 
                                  text-slate-300 
                                    text-center 
                                    flex
                                    flex-col
                                    justify-center 
                                    items-center
                                    "
                                >
                                    <p className="
                                    text-slate-300
                                    ">
                                    {item.title}
                                    </p>
                                    <p className="
                                        pt-3
                                        pb-6
                                        text-sm
                                    text-gray-400
                                        "
                                    >
                                    Release Year: {item?.release_date && item?.release_date.substring(0, 4)} 
                                    </p> 
                                </div>
                            </Link>
                        </div>
                            
                    )
                }
               
                
            })}
        </div>
    )
}