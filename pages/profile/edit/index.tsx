import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppSelector } from '../../../hooks/redux';
import Header from './../../../components/header/index';
import useri from '../../../components/header/user.png'
import { useFormik } from 'formik';
import { checkAuth } from '../../../utiles/checkauth';
import { wrapper } from '../../../redux/slices/wraper';
import { GetServerSideProps } from 'next';
import { imageUrl } from './../../../helpers/urls';
import { Api } from '../../../utiles/api';
import { parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { changeuser } from '../../../redux/slices/userslice';
import { changevalidate, editvalidate, formsubmit } from '../../../helpers/edithelper';
import { toast } from 'react-toastify';
import useSocket from '../../../hooks/useSocket';

const Edit = () => {
    const cookies=parseCookies()
    const notify = (msg:string) => toast.error(msg);
    const user = useAppSelector(state => state.user.user)
    const socket =useSocket()
    useEffect(() => {
      socket.emit('@Client:user_status',{status:true,id:user._id})
    }, []);
    const dispatch=useDispatch()
    const [updatecounter, setupdatecounter] = useState(1);
    const [userimage, setuserimage] = useState(user.avatar.length > 1 ? imageUrl + user.avatar : useri);
    const [profileimage, setprofileimage] = useState<any>();
    const formik = useFormik({
        initialValues: {
            name: user.name,
            surename: user.surename,
            information: user.information || ''
        },
        validate:editvalidate,
        onSubmit: async(values) => {
            const newuser:FormData=formsubmit(values)
            if(profileimage){
                newuser.append('foto',profileimage)
            }
            const data=await Api({},cookies.token).updateprofile(newuser)
            dispatch(changeuser(data))
        },
    });
    const changeformik=useFormik({
        initialValues:{
            oldpassword:"",
            newpassword:"",
            repet:""
        },
        validate:changevalidate,
        onSubmit:async(values)=>{
                const data=await Api({},cookies.token).changepassword({old:values.oldpassword,new:values.newpassword})
                notify(data.message)
        }
    })
    const onDrop = useCallback(acceptedFiles => {
        const newimage = URL.createObjectURL(acceptedFiles[0])
        setuserimage(newimage)
        setprofileimage(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div >
            <Header _id={user._id} avatar={user.avatar} />
            <div className="edit_profile_wraper">
                <div className="edit_profile-container">
                    <div className="edit_profile-control_panel">
                    <button 
                    style={updatecounter === 1 ? {color:'#1a237e',fontSize:"20px"}:{color:"black"}} 
                    className="edit_profile-control_item"
                    onClick={()=>setupdatecounter(1)}
                    >edit profile</button>
                    <button
                     style={updatecounter === 2 ? {color:'#1a237e',fontSize:"20px"}:{color:"black"}} 
                     onClick={()=>setupdatecounter(2)}
                     className="edit_profile-control_item">change password</button>
                    </div>
                    <div className="edit_profile-content">
                       {updatecounter === 1 ? 
                        <div className="edit_profile-item">
                        <div className="edit_profile-title">update your profile</div>
                        <img className="fileupload_user" src={userimage} alt="userimage" height="100px" width="100px" />
                        <div {...getRootProps()}>
                            <input  {...getInputProps()} accept=".jpg,.jpeg,.png" />
                            {
                                isDragActive ?
                                    <div className="after_drag" >Drop the image here ...</div> :
                                    <div className="before_drag before_drag-profile">Drag 'n' drop some image here,
                                        <br /> or click to select files <br />
                                        <span></span>
                                    </div>
                            }
                        </div>
                        <form className="update_profile-form" onSubmit={formik.handleSubmit}>
                            <label htmlFor="name">name</label>
                            <input
                            className="update_profile-form-field"
                                id="name"
                                name="name"
                                type="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="name"
                            />
                             <div
            className="form_helper"
            id="email-helper">
                {formik.errors.name && formik.touched.name && formik.errors.name }</div>
                <label htmlFor="surename">surename</label>
                             <input
                             className="update_profile-form-field"
                                id="surename"
                                name="surename"
                                type="surename"
                                onChange={formik.handleChange}
                                value={formik.values.surename}
                                placeholder="surename"
                            />
                             <div
            className="form_helper"
            id="email-helper">
                {formik.errors.surename && formik.touched.surename && formik.errors.surename }</div>
                <label htmlFor="information">profile information</label>
                             <input
                             className="update_profile-form-field"
                                id="information"
                                name="information"
                                type="information"
                                onChange={formik.handleChange}
                                value={formik.values.information}
                                placeholder="information"
                            />
                            <button className="createfile_btn createfile_btn-max" type="submit">Update profile</button>
                        </form>
                        </div>
                : null}
                {updatecounter === 2 ? <div className="edit_profile-item">
                <div className="edit_profile-title">change password</div>
                         <form className="update_profile-form" onSubmit={changeformik.handleSubmit}>
                            <label htmlFor="oldpassword">oldpassword</label>
                            <input
                            className="update_profile-form-field"
                                id="oldpassword"
                                name="oldpassword"
                                type="text"
                                onChange={changeformik.handleChange}
                                value={changeformik.values.oldpassword}
                                placeholder="oldpassword"
                            /> 
                            <div
            className="form_helper"
            id="email-helper">
                {changeformik.errors.oldpassword && changeformik.touched.oldpassword && changeformik.errors.oldpassword  }</div>
                            <label htmlFor="newpassword">newpassword</label>
                            <input
                            className="update_profile-form-field"
                                id="newpassword"
                                name="newpassword"
                                type="password"
                                onChange={changeformik.handleChange}
                                value={changeformik.values.newpassword}
                                placeholder="newpassword"
                            /> 
                            <div
            className="form_helper"
            id="email-helper">
                {changeformik.errors.newpassword && changeformik.touched.newpassword && changeformik.errors.newpassword  }</div>
                            <label htmlFor="repet">repet</label>
                            <input
                            className="update_profile-form-field"
                                id="repet"
                                name="repet"
                                type="password"
                                onChange={changeformik.handleChange}
                                value={changeformik.values.repet}
                                placeholder="repet"
                            /> 
                            <div
            className="form_helper"
            id="email-helper">
                {changeformik.errors.repet && changeformik.touched.repet && changeformik.errors.repet  }</div>
                           <button className="createfile_btn createfile_btn-max" type="submit">change password</button>
                             </form>
                </div> : null}
                    
                    </div>
                </div>
            </div>
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
        }
    }
  })

export default Edit;
