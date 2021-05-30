import { GetServerSideProps } from 'next';
import React from 'react';
import Header from '../components/header';
import Post from '../components/post/post';
import { checkAuth } from '../utiles/checkauth';
import { Api } from './../utiles/api';
interface post {
    _id: string;
    imageUrl: string;
    coments: string[];
    description: string;
    createdAt: Date;
    likes: string[];
    user: {
        name: string;
        surename: string;
        _id: string;
        avatar: string;
    };
}
const Index = ({user,posts}:{posts:post[],user:any,loading:boolean}) => {

    // if(loading){
    //     return <div>loadinggggggggggggggggggggggggggg</div>
    // }
    return (
        <div>
           <Header _id={user._id} avatar={user.avatar}/>
          <div className="main_wraper">
                 <div className="main_container">
                     {posts.map((el:any)=>{
                         return     <Post key={el._id} user={user} post={el}/>
                     })}
                 
                 </div>
          </div>
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
    loading=true
    const posts=await Api(ctx).subscripersposts()
    loading=false
    return {
        props:{
            user:isauth,
            posts,
            loading
        }
    }
  }
export default Index;
