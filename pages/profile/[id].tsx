import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { userr } from '../../interfaces/profile';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import Header from '../../components/header';
import Profiletop from '../../components/profile/Profiletop';
import Profilepost from '../../components/profile/Profilepost';
import grid from '../../components/profile/grid.png'
import { sortfunction } from './../index';
interface profileprops {
    user: userr,
    other: userr
}
const Profile: React.FC<profileprops> = ({ user, other }) => {
    return (
        <>
       
        <Header _id={user._id} avatar={user.avatar} />
            <div className="profile_container">
                <div className="profile_wraper">
                    <Profiletop other={other} />
                    <hr className="profile_hr" />
                    <div className="for_btns">
                        <div className="prilfe_post_logo">
                            <img width="20px" style={{ color: "black" }} src={grid} alt="g" />
                            <button>Posts</button>
                        </div>
                    </div>
                    <div className="profile_post-wraper">
                        {
                            other.posts.sort((a, b) => sortfunction(a, b)).map(el => {
                                return <Profilepost key={el.imageUrl} post={el} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isauth = await checkAuth(ctx)

    if (!isauth) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        }
    }
    const data = await Api(ctx).userbyId(ctx.query.id as string)
    console.log(data)
    return {
        props: {
            user: isauth,
            other: data
        }
    }
}
export default Profile;
