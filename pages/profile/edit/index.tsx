import React, { useCallback, useState } from 'react';
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
interface updateerror{
    name:string
    surename:string
}
const Edit = () => {
    const cookies=parseCookies()
    const user = useAppSelector(state => state.user.user)
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
        validate:(values)=>{
                let errors:updateerror | any={}
                if(values.name.trim().length <= 4 ){
                    errors.name="name must be longer then 4"
                }
                if(values.surename.trim().length <= 4 ){
                    errors.surename="surename must be longer then 4"
                }
                return errors
        },
        onSubmit: async(values) => {
            const newuser=new FormData()
            if(profileimage){
                newuser.append('foto',profileimage)
            }
            newuser.append('name',values.name)
            newuser.append('surename',values.surename)
            newuser.append('information',values.information)
            const data=await Api({},cookies.token).updateprofile(newuser)
            dispatch(changeuser(data))
        },
    });
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

                    </div>



                    <div className="edit_profile-content">
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
