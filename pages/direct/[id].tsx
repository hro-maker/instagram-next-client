
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import Header from '../../components/header';
import { userr } from '../../interfaces/profile';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
interface directprops{
    user:userr
}
const Direct:FC<directprops> = ({user}) => {
    return (
        <div>
              <Header _id={user._id} avatar={user.avatar}/>
            hello
        </div>
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
    return {
        props:{
            user:isauth,
        }
    }
  })
export default Direct;
