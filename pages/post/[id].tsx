import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { sortfunction } from '../';
import Header from '../../components/header';
import Loaderr from '../../components/loader';
import { Delecomentcontext } from '../../components/postmodel';
import Modalcontent from '../../components/postmodel/modalcontent';
import Profilepost from '../../components/profile/Profilepost';
import useSocket from '../../hooks/useSocket';
import { comenttype, posttype } from '../../interfaces/components';
import { userr } from '../../interfaces/profile';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
interface postbyidprops{
    post:posttype,
    other:userr,
    user:userr
}
const postbyid:React.FC<postbyidprops> = ({post,other,user}) => {

    const [postt, setpost] = useState<posttype>({} as posttype);
  const [coments, setcoments] = useState<comenttype[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const foo = async () => {
      setloading(true)
      const comentss = await Api().getcoments(post._id)
      const postt = await Api().getpostbyId({ postId: post._id })
      setpost(postt)
      setcoments(comentss)
      setloading(false)
    }
    foo()
  }, [])
  const socket =useSocket()
  useEffect(() => {
    socket.emit('@Client:user_status',{status:true,id:user._id})
  }, []);
  const cookies = parseCookies()
 
  const deletecoment=async({comentId,postId}:any)=>{
    setloading(true)
        const coments=await Api({},cookies.token).deletecomment({comentId,postId})
        if(coments){
          const comentss = await Api().getcoments(post._id)
          setcoments(comentss)
        }
        setloading(false)
  }
    return (
        <>
        <Header _id={user._id} avatar={user.avatar}/>
        <Delecomentcontext.Provider value={deletecoment}>
    <div  className="coment_post_wraper">
     {loading ? <div className="loader_wraper"><Loaderr /></div> : <Modalcontent useclose={false }coments={coments} post={postt} />}
     <h1 className="coment-post-donthave">{other.name}{other.posts.filter(el=>String(el._id) !== String(post._id)).length !== 0 ? "-s other posts" : " dont have other posts"}</h1>
     <div className="profile_post-wraper profile_post-wraper-mini">

         {
           other.posts.filter(el=>String(el._id) !== String(post._id)).sort(sortfunction).map(el => {
            return <Profilepost key={el.imageUrl} post={el} />
        })
         }
     </div>
    </div>
    </Delecomentcontext.Provider>
    </>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    let loading=false
    loading=true
    const isauth=await checkAuth(ctx)
    if(!isauth){
        loading=false
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                  },
                  props:{},
            }
    }
    const post=await Api(ctx).getpostbyId({postId:ctx?.params?.id as string} )  
    const userr=await Api(ctx).userbyId(post.user._id)
    return {
        props:{
            post,
            user:isauth,
            other:userr
        }
    }
  })
export default postbyid;
