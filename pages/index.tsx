import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import Header from '../components/header';
import Post from '../components/post/post';
import { checkAuth } from '../utiles/checkauth';
import { post } from './../experimental';

const Index = () => {
    const cookies = parseCookies()
    console.log( cookies )
    return (
        <div>
           <Header/>
          <div className="main_wraper">
                 <div className="main_container">
                 <Post post={post}/>
                 </div>
          </div>
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isauth=await checkAuth(ctx)
    // if(!isauth){
    //         return {
    //             redirect: {
    //                 permanent: false,
    //                 destination: "/login",
    //               },
    //               props:{},
    //         }
    // }
    return {
        props:{}
    }
  }
export default Index;
