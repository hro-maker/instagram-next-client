import React, { useEffect, useState } from 'react';
import { comenttype } from '../../interfaces/components';
import { Api } from './../../utiles/api';
import Modalcontent from './modalcontent';

const Postmodal = ({post}) => {
    const [postt, setpost] = useState(post);
    const [coments, setcoments] = useState<comenttype[]>([]);
    useEffect(()=>{
           const foo= async()=>{
            const comentss =await Api().getcoments(post._id)
            setcoments(comentss)
           }
           foo()
    },[])
   
    return (
        <div className="post_modal_overlay">
          <Modalcontent coments={coments}  post={postt}/>
        </div>
    );
}


export default Postmodal;
