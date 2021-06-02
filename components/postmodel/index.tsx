import React, { useContext, useEffect, useState } from 'react';
import { comenttype } from '../../interfaces/components';
import { Api } from './../../utiles/api';
import Modalcontent from './modalcontent';
import { posttype } from './../../interfaces/components/index';
import Loader from '../loader';
import { Modlacontext } from '../post/post';
import { parseCookies } from 'nookies';
export const Delecomentcontext=React.createContext(({}:any)=>{})
const Postmodal = ({ _id }: { _id: string }) => {
  const [postt, setpost] = useState<posttype>({} as posttype);
  const [coments, setcoments] = useState<comenttype[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const foo = async () => {
      setloading(true)
      const comentss = await Api().getcoments(_id)
      const post = await Api().getpostbyId({ postId: _id })
      setpost(post)
      setcoments(comentss)
      setloading(false)
    }
    foo()
  }, [])
  const cookies = parseCookies()
  const closemodale = useContext(Modlacontext)
  const closemodal=(e)=>{
      if(e.target.className === "post_modal_overlay"){
          closemodale()
      }
  }
 
  const deletecoment=async({comentId,postId}:any)=>{
    setloading(true)
        const coments=await Api({},cookies.token).deletecomment({comentId,postId})
        if(coments){
          const comentss = await Api().getcoments(_id)
          setcoments(comentss)
        }
        setloading(false)
  }
  return (
    <Delecomentcontext.Provider value={deletecoment}>
    <div onClick={(e)=>closemodal(e)} className="post_modal_overlay">
     {loading ? <div className="loader_wraper"><Loader /></div> : <Modalcontent coments={coments} post={postt} />}
    </div>
    </Delecomentcontext.Provider>
  );
}


export default Postmodal;
