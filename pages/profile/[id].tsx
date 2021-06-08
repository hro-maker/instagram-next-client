import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { userr } from '../../interfaces/profile';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import Header from '../../components/header';
import Profiletop from '../../components/profile/Profiletop';
import Profilepost from '../../components/profile/Profilepost';
import { sortfunction } from './../index';
import { wrapper } from '../../redux/slices/wraper';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GridOnIcon from '@material-ui/icons/GridOn';
interface profileprops {
    user: userr,
    other: userr
}
const Profile: React.FC<profileprops> = ({ user, other }) => {
    const [postscounter, setpostscounter] = useState<number>(1);
    return (
        <>
        <Header _id={user._id} avatar={user.avatar} />
            <div className="profile_container">
                <div className="profile_wraper">
                    <Profiletop other={other} />
                    <hr className="profile_hr" />
                    <div className="for_btns">
                        <div
                         onClick={()=>setpostscounter(1)} 
                         style={{cursor:"pointer",borderTop:postscounter == 1 ?"2px solid black": "none"}}
                          className="prilfe_post_logo profile_iconss">
                            <GridOnIcon/>
                            <button>Posts</button>
                        </div>
                       {
                           String(user._id)===String(other._id) ?  <div
                           onClick={()=>setpostscounter(2)} 
                           style={{cursor:"pointer",marginLeft:"10px",borderTop:postscounter == 2 ?"2px solid black": "none"}} 
                           className="prilfe_post_logo profile_iconss">
                              <BookmarkIcon/>
                              <button>Saved</button>
                          </div> : null
                       }
                    </div>
                    <div className="profile_post-wraper">
                        {
                            postscounter === 1 ? other.posts.sort(sortfunction).map(el => {
                                return <Profilepost key={el.imageUrl} post={el} />
                            }) :
                            other.saved.sort(sortfunction).map(el => {
                                return <Profilepost key={el.imageUrl} post={el} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export const getServerSideProps: GetServerSideProps =wrapper.getServerSideProps( async (ctx) => {
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
    return {
        props: {
            user: isauth,
            other: data
        }
    }
})
export default Profile;
