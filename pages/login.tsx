import { GetServerSideProps } from 'next';
import React, { createContext, useEffect, useState } from 'react';
import Confirmemail from '../components/auth/confirmemail';
import Forgotpassword from '../components/auth/forgotpassword';
import Login from '../components/auth/login';
import Signup from '../components/auth/Signup';
import { checkAuth } from './../utiles/checkauth';
export const Elementcontext=createContext({})
const Index = () => {
    const elements:any={
        '0':<Login/>,
        '1':<Signup/>,
        '2':<Confirmemail/>,
        '3':<Forgotpassword/>
    }
    const [loginelement, setloginelement] = useState(0);
useEffect(() => {
    console.log(loginelement)
}, [loginelement]);
    const setLoginelement=(num:number)=>{
                setloginelement(num)
    }
    return (
        <Elementcontext.Provider value={{setLoginelement}}>
        <div className="main_page" >
          {elements[loginelement]}
        </div>
        </Elementcontext.Provider>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const isauth=await checkAuth(ctx)
    // console.log("hellllllllllllllllllllllllllloooooooooooo",isauth)
    if(isauth){
        return {
            redirect: {
                permanent: false,
                destination: "/",
              },
              props:{},
        }
    }
    return {
        props:{}
    }
  }
export default Index;
