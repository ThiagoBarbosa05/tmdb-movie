import {Link} from 'react-router-dom';

export const Releases = (props) => {

     return (
        <div className="
            max-w-[16rem]
            min-w-[10rem]
            h-26
            bg-gray-300
            rounded-md
            hover:bg-opacity-60
            
                
        "> 
            <Link to={`details/${props.data.id}`} className="
                w-[20%]
              text-gray-400
                transition
                delay-120
                hover:opacity-80
            ">
                <img 
                    className="
                    w-[100%]
                    aspect-auto
                    "
                    src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
                
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
                    {props.data.title}
                    </p>
                    <p className="
                        pt-3
                        pb-6
                        text-sm
                      text-gray-400
                        "
                    >
                    Release Year: {props.data.release_date.substring(0, 4)}
                    </p> 
                </div>
            </Link>
        </div>
     )
}