import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { checkAuth } from '../utiles/checkauth';

const Index = () => {
    const cookies = parseCookies()
    console.log( cookies )
    return (
        <div>
            index
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isauth=await checkAuth(ctx)
    if(!isauth){
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                  },
                  props:{},
            }
    }
    return {
        props:{}
    }
  }
export default Index;
