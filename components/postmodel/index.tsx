import React, { useEffect, useState } from 'react';
import { comenttype } from '../../interfaces/components';
import { Api } from './../../utiles/api';
import Modalcontent from './modalcontent';
import { posttype } from './../../interfaces/components/index';
import Loader from '../loader';

const Postmodal = ({ _id }: { _id: string }) => {
  const [postt, setpost] = useState<posttype>({} as posttype);
  const [coments, setcoments] = useState<comenttype[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const foo = async () => {
      setloading(true)
      const comentss = await Api().getcoments(_id)
      const post = await Api().getpostbyId({ postId: _id })
      console.log(post,comentss,"sjkaajjjjjjjjjjjjjjjj")
      setpost(post)
      setcoments(comentss)
      setloading(false)
    }
    foo()
  }, [])
  return (
    <div className="post_modal_overlay">
     {loading ? <div className="loader_wraper"><Loader /></div> : <Modalcontent coments={coments} post={postt} />}
    </div>
  );
}


export default Postmodal;
