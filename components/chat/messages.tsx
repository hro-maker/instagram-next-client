import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { messagetype, roomtype, roomuser } from '../../interfaces/components/chat';
import { imageUrl } from './../../helpers/urls';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import { Picker } from 'emoji-mart';
import useSocket from '../../hooks/useSocket';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import { Api } from '../../utiles/api';
import { useDispatch } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { BiMicrophone, BiMicrophoneOff, BiSmile } from "react-icons/bi";
import {  } from "react-icons/bi";
const Messages = () => {
    const messagelistref = useRef<any>()
    const router = useRouter()
    const socket = useSocket()
    const [messages, setmessages] = useState<messagetype[]>([]);
    const [secntuser, setsecntuser] = useState<roomuser>();
    const [messagetext, setmessagetext] = useState<string>('');
    const [emojibicker, setemojibicker] = useState<boolean>(false);
    const [roomtt, setroomtt] = useState<roomtype>();
    const [imagesforsent, setimagesforsent] = useState<any[]>([]);
    const [imagesfiles, setimagesfiles] = useState<any[]>([]);
    const [stream, setstream] = useState<any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const fileref = useRef<HTMLInputElement>()
    const me = useAppSelector(state => state.user.user)
    const onselect = (emoji: any, e) => {
        e.stopPropagation()
        setmessagetext(prev => prev + emoji.native)
    }
    const cookies = parseCookies()
    useEffect(() => {
        (async () => {
            if (router.query.id.length > 7) {
                const data = await Api({}, cookies.token).getmessagesbyroomid(router.query.id as string)
                setroomtt(data.room)
                setmessages(data.messages)
                socket?.emit('@Client:Join_room', { roomId: data.room?._id })
            }
        })()
    }, [router.query.id]);
    const dispatch = useDispatch()
    const togglewmoji = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setemojibicker(!emojibicker)
    }

   const sentmessage =async (e: React.FormEvent) => {
        e.preventDefault()
        if(messagetext.length){
            socket?.emit('@Client:Sent_message', {
                text: messagetext,
                romId: roomtt?._id,
                senter: me._id,
                secnt: roomtt?.users?.replace(me._id, '')
            })
        }
        if(imagesfiles.length){
        const formdata=new FormData()
        imagesfiles.forEach(el=>{
                formdata.append("foto",el)
        })
     const data= await Api({},cookies.token).saveimages(formdata)
            socket?.emit('@Client:Sent_message_images', {
                text: '',
                romId: roomtt?._id,
                senter: me._id,
                secnt: roomtt?.users?.replace(me._id, ''),
                images:data
            })
            setimagesfiles([])
            setimagesforsent([])
        }

        setmessagetext('')
    }
    useEffect(() => {
        if (roomtt) {
            socket?.emit('@Client:Join_room', roomtt._id)
        }
        socket?.on('@server:Sent_message', (data) => {
            if (String(data.romId) === String(roomtt?._id)) {
                setmessages(prev => [...prev, data])
            }
        })
    }, [roomtt]);
    useEffect(() => {
        setsecntuser(roomtt?.romusers.filter(el => String(el._id) !== String(me._id))[0])
    }, [roomtt]);
    useEffect(() => {
        if (messagelistref.current) {
            messagelistref?.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
        console.log(messages)
    }, [messages.length]);
    useEffect(() => {
        socket?.on('@server:user_status', (data) => {
            if (String(data._id) === String(router.query.id)) {
                setsecntuser(data)
            }
        })
    }, []);
    const fileinputchange = (e: React.FormEvent<HTMLInputElement>) => {
        if(fileref?.current?.files?.length){
            for (let i = 0; i < fileref?.current?.files?.length; i++) {
                const imageurl = URL.createObjectURL(fileref?.current?.files[i] as any)
                setimagesforsent(prev => [...prev, imageurl])
                //@ts-ignore
                setimagesfiles(prev=>[...prev,fileref?.current?.files[i]])
            }
        }
    }
    const onHideRecording = () => {
        setIsRecording(false);
        (mediaRecorder as any).stop();
        stream.getTracks().forEach(function(track) {
            track.stop();
          });
      };
    const onRecord = () => {
        if (navigator.getUserMedia) {
          navigator.getUserMedia({ audio: true }, onRecording, onError);
        }
      };
      const onRecording = stream => {
        setstream(stream)
        // @ts-ignore
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
    
        recorder.start();
    
        recorder.onstart = () => {
          setIsRecording(true);
        };
    
        recorder.onstop = () => {
          setIsRecording(false);
        };
    
        recorder.ondataavailable =async (e) => {
          const file = new File([e.data], 'audio.webm');
          const formdata=new FormData()
          formdata.append("foto",file)
         const data= await Api({},cookies.token).saveimages(formdata)
            console.log(data)
        };
        
      };
    
      const onError = err => {
        console.log('The following error occured: ' + err);
      };
     const deleteselectetimage=(i:number)=>{
           if(imagesfiles.length > 1){
            setimagesfiles(prev=>[...prev.slice(0,i),prev.slice(i+1)])
            setimagesforsent(prev=>[...prev.slice(0,i),prev.slice(i+1)])
           }else{
            setimagesfiles([])
            setimagesforsent([])
           }
           
     }

    return (
        <div className="message_big_wraper">
            <div className="messages_userinformation">
                <div>
                    {secntuser && secntuser?.avatar?.length > 2
                        ? <img className="messages_userinformation-foto" width="55px" height="55px" src={imageUrl + secntuser.avatar} alt="ss" />
                        : <PermIdentityIcon style={{ width: "55px", height: "55px" }} />}
                </div>
                <div className=" messages_userinformation-desc">

                    <Link href={`/profile/${secntuser?._id}`}>
                        <a className="messages_userinformation-name"> {secntuser?.name}  {secntuser?.surename}  </a>
                    </Link>
                    {secntuser?.isActive ? <div className="user_online">online</div> : <div className="user_offline">
                        offline
                        <br />
                        {moment(secntuser?.lastvisite).startOf(new Date(secntuser?.lastvisite).getHours()).fromNow()}
                    </div>}
                </div>
            </div>
            <div className="messages_container">
                {
                    messages.map((el) => {

                        return <div ref={messagelistref} key={el._id} className={String(me._id) === String(el.senter._id) ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                            <div className="messages_userimage">
                                {el?.senter?.avatar?.length > 2
                                    ? <img width="100%" height="100%" src={imageUrl + el.senter.avatar} alt="image" />
                                    : <PermIdentityIcon style={{ width: "100%", height: "100%" }} />
                                }
                            </div>
                            <div className="message_text">
                                {el.text}
                            </div>
                            <span className="m_time">{moment(el.createdAt).format('LLL')}</span>
                            <span className="m_heart">{el.likes.length > 0 ? <><FavoriteBorderIcon />{el.likes.length}</> : null}</span>
                        </div>

                    })
                }
            </div>
            <div className="forimages_forsent">
                {imagesforsent.map((elem,i) => {
                    return <div key={elem}  className="images_for-sent">
                        <span onClick={()=>deleteselectetimage(i)}>&times;</span>
                        <img src={elem} alt={String(elem)} />
                    </div>
                })}
            </div>
            <form onSubmit={(e) => sentmessage(e)} style={{ position: 'relative' }} className="chat_from" >
                <div style={{ display: "inline-block" }} className="postemoji_btn" onClick={(e) => {
                    e.stopPropagation()
                    togglewmoji(e)
                }}><BiSmile className="postemoji"/></div>
                <input
                    value={messagetext}
                    onChange={(e) => setmessagetext(e.target.value)}
                    className="chat_input"
                    placeholder="Add a comment…"
                    type="text" />
                <input type="file"
                    multiple={true}
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => fileinputchange(e)}
                    ref={fileref as any}
                    className="chat_image_input" />
                <div className='chatimage_wraper' onClick={() => fileref.current?.click()}>
                    <PhotoLibraryIcon className='chatimage' />
                </div>
              {isRecording 
              ? <BiMicrophoneOff className="record_voisemessage record_voisemessage-sent" onClick={onHideRecording}/> 
              :  <BiMicrophone className="record_voisemessage record_voisemessage-start" onClick={onRecord} />}
                <button type="submit" > <SendIcon style={{ width: "20px", color: "#1976d2" }} /> </button>
                {emojibicker ? <Picker
                    style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                    onClick={onselect}
                /> : null}
            </form>
        </div>
    );
}

export default Messages;
