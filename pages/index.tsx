import { GetServerSideProps } from 'next';
import React from 'react';
import Header from '../components/header';
import Post from '../components/post/post';
import { checkAuth } from '../utiles/checkauth';
import { Api } from './../utiles/api';
import { posttype } from './../interfaces/components/index';
import {postinterface} from '../interfaces/profile'
export const sortfunction=(a:posttype |postinterface,b:posttype | postinterface)=>{
    var dateA = new Date(a.createdAt).getTime();
   var dateB = new Date(b.createdAt).getTime();
   return dateA > dateB ? -1 : 1;  
}
const Index = ({user,posts}:{posts:posttype[],user:any,loading:boolean}) => {

    return (
        <div>
           <Header _id={user._id} avatar={user.avatar}/>
          <div className="main_wraper">
                 <div className="main_container">
                     {posts.length > 0 ? posts.sort(sortfunction).map((el:any)=>{
                         return     <Post key={el._id} user={user} post={el}/>
                     }) : <div className="posts_dont_found">posts dont found</div>}
                 
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
