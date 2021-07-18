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
import ReactPlayer from 'react-player'
interface peereventtype{caller:string,target:string,room:string,signal:any}
const index = () => {
    const [stream, setstream] = useState<any>(null);
    const [partnerstream, setpartnerstream] = useState<any>(null);
    const [room, setroom] = useState<roomtype  | null>(null);
    const [mypeer, setmypeer] = useState<any>(null);
    const socket=useSocket()
    const router=useRouter()
    const cookies=parseCookies()
    const me=useAppSelector(state=>state.user.user)
    useEffect(() => {
            if(typeof window !== 'undefined' && router.query.id){
                
            (async()=>{
                const thisroom=await Api({},cookies.token).getroombyid(router.query.id as string)
                console.log(thisroom)
                setroom(thisroom)
            })()
           
            
            }
          
    }, [router.query.id]);
  useEffect(() => {
     
      if(room){
        if(!room?.users.includes(String(me._id))){
            router.push('/')
        }
        navigator.getUserMedia({audio:true,video:true},(stream)=>{
            setstream(stream)
           const myvideo:any= document.querySelector('#myvideo')
           if(myvideo){
               myvideo.srcObject=(stream)
           }
            socket?.emit('@Client:Join_room', room._id)
            const perincome=new Peer({
                initiator:true,
                trickle:false,
                stream
            })
            setmypeer(perincome)
            const target=room?.users.replace(me._id,'')
            perincome.on('signal',(signal)=>{
                console.log('we call to userrrr',{caller:me._id,target,room:room?._id,signal})
                socket.emit('@client:peer_call_to_user',{caller:me._id,target,room:room?._id,signal})
            })
            perincome.on('stream',(stream)=>{
                const other:any= document.querySelector('#partnervideo')
                    if(other){
                        console.log(other)
                        other.srcObject=(stream)
                    }
                    setpartnerstream(stream)
            })
        },(err)=>{
                console.log(err)
        })
      }
  }, [room]);
  
  useEffect(() => {
      socket.on('@server:peer_call_to_user',(data:peereventtype)=>{
               if(String(data.target) === String(me._id)){
                const peroutcom=new Peer({
                    initiator:false,
                    trickle:false,
                    stream
                })
                peroutcom.signal(data.signal)
                peroutcom.on('signal',(signal)=>{
                    console.log('we answer on call to userrrr',{caller:data.target,target:data.caller,room:room?._id,signal})
                    socket.emit('@client:peer_answer_call_to_user',{caller:data.target,target:data.caller,room:room?._id,signal})
                })
                peroutcom.on('stream',(stream)=>{
                    // const other:any= document.querySelector('.partnervideo')
                    // if(other){
                    //     console.log("alooooooooooooooooooo  ",other)
                    //     other.srcObject=(stream)
                    // }
                    setpartnerstream(stream)
                    console.log('outcome stream',stream)
                })
               }
      })
      socket.on('@server:peer_answer_call_to_user',(data:peereventtype)=>{
                if(String(data.target) === String(me._id)){
                    console.log('wi answer cal on answer')
                    mypeer.signal(data.signal)
                }    
      })
  }, []);
    return (
      
      <div>  
          {partnerstream ? <ReactPlayer controls autoPlay url={partnerstream}/> : null}
       {/* {stream ? <ReactPlayer controls autoPlay url={stream}/> :null} */}
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
