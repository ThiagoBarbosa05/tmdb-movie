import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import api from '../api/data';

export const Cast = (props) => {

    const castList = props.credits.map(item => <small className="text-slate-200" key={item.id}>{item.name},</small>);

    const sliceCastList = castList.slice(0, 5);

    return (
        <div>{sliceCastList}</div>
    )
   
}  