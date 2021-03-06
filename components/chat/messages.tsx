import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { messagetype, roomtype, roomuser } from '../../interfaces/components/chat';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import moment from 'moment';
import Link from 'next/link';
import { Picker } from 'emoji-mart';
import useSocket from '../../hooks/useSocket';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import { Api } from '../../utiles/api';
import { useDispatch } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { BiMicrophone, BiMicrophoneOff, BiSmile, BiVideo } from "react-icons/bi";
import Message from './message';
import { changeforfallow, changeroomid } from '../../redux/slices/chatslice';
interface usermessagetype {
    id: string,
    message: string
}
const Messages = () => {
    const [mecalling, setmecalling] = useState(false);
    const [othercalling, setothercalling] = useState(false);
    const router = useRouter()
    const socket = useSocket()
    const me = useAppSelector(state => state.user.user)
    const [usermessage, setusermessage] = useState<usermessagetype[]>([
        { id: router.query.id, message: "" },
        { id: me._id, message: "" }
    ]);
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
    const [loading, setloading] = useState(false);
    const fileref = useRef<HTMLInputElement>()
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
    const togglewmoji = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setemojibicker(!emojibicker)
    }
    const sentmessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (messagetext.length) {
            socket?.emit('@Client:Sent_message', {
                text: messagetext,
                romId: roomtt?._id,
                senter: me._id,
                secnt: roomtt?.users?.replace(me._id, '')
            })
        }
        if (imagesfiles.length) {
            setloading(true)
            const formdata = new FormData()
            imagesfiles.forEach(el => {
                formdata.append("foto", el)
            })
            const data = await Api({}, cookies.token).saveimages(formdata)
            setimagesfiles([])
            setimagesforsent([])
            socket?.emit('@Client:Sent_message_images', {
                text: '',
                romId: roomtt?._id,
                senter: me._id,
                secnt: roomtt?.users?.replace(me._id, ''),
                images: data
            })
            setloading(false)
        }
        setmessagetext('')
    }
    useEffect(() => {
        if (roomtt) {
            socket?.emit('@Client:Join_room', roomtt._id)
        }
        socket?.on('@server:Sent_message', (data) => {
                    if(String(data.romId) === String(roomtt?._id)){
                        setmessages(prev => [...prev, data])
                    }
        })
    }, [roomtt]);
    useEffect(() => {
        setsecntuser(roomtt?.romusers.filter(el => String(el._id) !== String(me._id))[0])
        return ()=>{
            socket.emit('@Client:leave_room',roomtt?._id)
        }
    }, [roomtt]);
    useEffect(() => {
        socket?.on('@server:user_status', (data) => {
            if (String(data._id) === String(router.query.id)) {
                setsecntuser(data)
            }
        })
        
    }, []);
    useEffect(() => {
        if(roomtt){
            socket?.on('@server:changetype', (data: usermessagetype & { room: string }) => {
                if (String(data.room) === String(roomtt._id)) {
                    setusermessage(prev => prev.map(el => String(el.id) === String(data.id) ? { id: data.id, message: data.message } : el))
                }
            })
        }
    }, [roomtt]);
    const fileinputchange = (e: React.FormEvent<HTMLInputElement>) => {
        if (fileref?.current?.files?.length) {
            for (let i = 0; i < fileref?.current?.files?.length; i++) {
                const imageurl = URL.createObjectURL(fileref?.current?.files[i] as any)
                setimagesforsent(prev => [...prev, imageurl])
                //@ts-ignore
                setimagesfiles(prev => [...prev, fileref?.current?.files[i]])
            }
        }
    }
    const onHideRecording = () => {
        setIsRecording(false);
        (mediaRecorder as any).stop();
        stream.getTracks().forEach(function (track) {
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

        recorder.ondataavailable = async (e) => {
            setloading(true)
            const file = new File([e.data], 'audio.webm');
            const formdata = new FormData()
            formdata.append("foto", file)
            const data = await Api({}, cookies.token).saveimages(formdata)
            socket?.emit('@Client:Sent_message_voice', {
                text: data[0],
                romId: roomtt?._id,
                senter: me._id,
                secnt: roomtt?.users?.replace(me._id, '')
            })
            setloading(false)
        };
    };
    const onError = err => {
        console.log('error' + err);
    };
    const deleteselectetimage = (i: number) => {
        console.log('befor remove',imagesforsent,imagesfiles)

        if (imagesfiles.length > 1) {
            setimagesfiles(prev => [...prev.slice(0, i), ...prev.slice(i + 1)])
            setimagesforsent(prev => [...prev.slice(0, i), ...prev.slice(i + 1)])
        } else {
            setimagesfiles([])
            setimagesforsent([])
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            if (roomtt) {
                await Api({}, cookies.token).readmessages(roomtt._id).then(() => {
                    dispatch(changeforfallow())
                    dispatch(changeroomid(roomtt._id))
                }).catch(() => {
                    console.log("errror")
                })
            }
        })()
    }, [roomtt]);
    const filterusermessage = () => {
        return usermessage.filter(el => String(el.id) !== String(me._id))[0]
    }
    const toggletyping = (str: string) => {
        socket.emit('changetype', { id: me._id, message: str, room: roomtt?._id })
    }
    const calltouser=()=>{
        setmecalling(true)
        socket.emit('Client:calling_to_user',{caller:me,targetid:secntuser?._id})
    }
   
    return (
        <div className="message_big_wraper">
            <div className="messages_userinformation">
                <div>
                    {secntuser && secntuser?.avatar?.length > 2
                        ? <img className="messages_userinformation-foto" width="55px" height="55px" src={secntuser.avatar} alt="ss" />
                        : <PermIdentityIcon style={{ width: "55px", height: "55px" }} />}
                </div>
                <div className=" messages_userinformation-desc">

                    <Link href={`/profile/${secntuser?._id}`}>
                        <a className="messages_userinformation-name"> {secntuser?.name}  {secntuser?.surename}  </a>
                    </Link>
                    {secntuser?.isActive ? <div className="user_online">online</div> : <div className="user_offline">
                        offline
                        <br />
                       <span>{moment(secntuser?.lastvisite).startOf(new Date(secntuser?.lastvisite).getHours()).fromNow()}</span> 
                    </div>}
                </div>
               <div onClick={calltouser} className="chat__userinformation--video">
               <BiVideo className="chat__userinformation--video-icon"/>
               </div>
            </div>
           
            <div className="messages_container">
                {messages.map((el) => {
                    return <Message num={messages.length} key={el._id} message={el} my={String(me._id) === String(el.senter._id)} />
                })
                }
            </div>
            {filterusermessage().message.length ? <div className="user__types-event">
            {secntuser?.name}  &ensp;
                 {filterusermessage().message}
                  </div> : null}
            {loading ? <div></div> : <div className="forimages_forsent">
                {imagesforsent.map((elem, i) => {
                    return <div key={elem} className="images_for-sent">
                        <span onClick={() => deleteselectetimage(i)}>&times;</span>
                        <img src={elem} alt={String(elem)} />
                    </div>
                })}
            </div>}
            <form onSubmit={(e) => sentmessage(e)} style={{ position: 'relative' }} className="chat_from" >
                {loading ? <div>
                    loading.....
                </div> : <>
                    <div style={{ display: "inline-block" }} className="postemoji_btn" onClick={(e) => {
                        e.stopPropagation()
                        togglewmoji(e)
                    }}><BiSmile className="postemoji" /></div>
                    <input
                        onFocus={() => toggletyping('typs message')}
                        onBlur={() => toggletyping('')}
                        value={messagetext}
                        onChange={(e) => setmessagetext(e.target.value)}
                        className="chat_input"
                        placeholder="Add a comment???"
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
                        ? <BiMicrophoneOff className="record_voisemessage record_voisemessage-sent" onClick={onHideRecording} />
                        : <BiMicrophone className="record_voisemessage record_voisemessage-start" onClick={onRecord} />}
                    <button type="submit" > <SendIcon style={{ width: "20px", color: "#1976d2" }} /> </button>
                    {emojibicker ? <Picker
                        style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                        onClick={onselect}
                    /> : null}
                </>}
            </form>
        </div>
    );
}

export default Messages;
