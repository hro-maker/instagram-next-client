import React, { useEffect, useState } from 'react';
import Peer from "simple-peer";
import { roomtype } from '../../interfaces/components/chat';
import useSocket from './../../hooks/useSocket';
import { useRouter } from 'next/dist/client/router';
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
import { useAppSelector } from '../../hooks/redux';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
const index = () => {
    const [stream, setstream] = useState<any>(null);
    const [room, setroom] = useState<roomtype  | null>(null);
    const socket=useSocket()
    const router=useRouter()
    const cookies=parseCookies()
    const user=useAppSelector(state=>state.user.user)
    useEffect(() => {
            if(typeof window !== 'undefined' && router.query.id){
                
            (async()=>{
                const thisroom=await Api({},cookies.token).getroombyid(router.query.id as string)
                console.log(thisroom)
                setroom(thisroom)
            })()
            // navigator.getUserMedia({audio:true,video:true},(stream)=>{
            //     setstream(stream)
            //     const perincome=new Peer({
            //         initiator:true,
            //         trickle:false,
            //         stream
            //     })
            //     perincome.on('signal',()=>{

            //     })
            // },(err)=>{
            //         console.log(err)
            // })
            
            }
          
    }, [router.query.id]);
    useEffect(() => {
        socket.on('@Server:users_inside',(data)=>{
            console.log(data)
        })
        return ()=>{
            socket.emit('@Client:leave_room',{roomId:router.query.id,user})
        }

    }, []);
    useEffect(() => {
        if(router.query.id){
            socket?.emit('@Client:Join_room', {roomId:router.query.id,user})
        }
    }, [router.query.id]);
  
    return (
        <div>
            {stream ? <div>  <video
            controls
            width="250"
            loop
            autoPlay
            muted>
       </video> </div> : null}
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
            user:isauth
        }
    }
  })

export default index;
