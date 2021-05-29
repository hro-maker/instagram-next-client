import { GetServerSideProps } from 'next';
import React from 'react';
import { userr } from '../../interfaces/profile';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import { imageUrl } from './../../helpers/urls';
interface profileprops{
    user:userr,
    other:userr
}
const Profile:React.FC<profileprops> = ({other}) => {
    return (
        <div className="profile_container">
            <div className="information">
                <div className="image_wraper">
                    <div className="image_item">
                        <img className="profile_image" src={imageUrl+other.avatar} alt="avatar" />
                    </div>
                </div>
            </div>
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
    const data=await  Api(ctx).userbyId(ctx.query.id as string)
    return {
        props:{
            user:isauth,
            other:data
        }
    }
  }
export default Profile;
