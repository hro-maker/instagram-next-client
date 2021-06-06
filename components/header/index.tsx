import React, { useCallback, useState } from 'react';
// const macbookIphone = require('./heartt.png');
import heart from './heartt.png'
import home from './homee.png'
import message from './messages.png'
import user from './user.png'
import { imageUrl } from './../../helpers/urls';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import addpost from './addpost.png'
import { Tooltip } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

const Header = ({avatar,_id}:any) => {
    const [userimage, setuserimage] = useState(user);
    const router=useRouter()
    const logout=()=>{
        destroyCookie(null, 'token')
        router.push('/login')
    }
    const onDrop = useCallback(acceptedFiles => {
                console.log(acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <>
        <div className="addpostmodal">
            <img className="fileupload_user" src={userimage} alt="userimage"  width="100px"/>
            <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, <br /> or click to select files</p>
      }
    </div>
            {/* <input accept=".jpg,.jpeg,.png" type="file"  id="userimage" /> */}
            <label htmlFor="userimage">userimage</label>
            <input type="text" placeholder="description" />
        </div>
        <div className="header_big_wraper">
            <div className="header_container">
                <div className="header_small_wraper">
                    <div className="header_left"><div onClick={()=>router.push('/')} className="header_logo"></div></div>
                    <div className="header_center">
                        <input className="header_search_input" placeholder="🔎︎Search" type="text" />
                    </div>
                    <div className="header_rigth">
                    <Tooltip title="Home" arrow>
                       <img  className="header_icons" src={home} alt='Home Page' width={25} height={25} />
                       </Tooltip>
                       <Tooltip className="header_tooltip" title="add post" arrow>
                       <img className="header_icons" src={addpost} alt='Home Page' width={25} height={25} />
                       </Tooltip>
                       
                       <img className="header_icons" src={message} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={heart} alt='Home Page' width={25} height={25} />
                       <img onClick={()=>router.push('/profile/'+_id)} className="header_icons" src={avatar ?imageUrl+avatar :user} alt='Home Page' width={25} height={25} />
                       <div className="header_dropdoun">
                               <Link href={`/profile/${_id}`}>
                              <a  className="header_dropdaoum-item"> <div><span></span> profile</div></a>
                               </Link>
                               <Link href={`/`}>
                              <a className="header_dropdaoum-item"> <div ><span></span>Edit profile</div></a>
                               </Link><Link href={`/`}>
                              <a className="header_dropdaoum-item"> <div ><span></span>saved</div></a>
                               </Link>
                            
                              <a className="header_dropdaoum-item"> <div onClick={logout} ><span></span>Logout</div></a>
                               
                         </div>
                          </div>

                </div>
            </div>
            

        </div>
        </>
    );
}

export default Header;
