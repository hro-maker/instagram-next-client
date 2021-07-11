import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import { useDropzone } from "react-dropzone";
import { Api } from "./../../utiles/api";
import { useDispatch } from "react-redux";
import { changeuser, pushpost } from "../../redux/slices/userslice";
import { toast } from "react-toastify";
import Searchuser from "./Searchuser";
import useSocket from "./../../hooks/useSocket";
import Eventsmodal from "./eventsmodal";
import { eventenum, eventtype } from "../../interfaces/components/events";
import { pushevent } from "../../redux/slices/chatslice";
import { useAppSelector } from "../../hooks/redux";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import { IoHomeOutline } from "react-icons/io5";
import { BiImageAdd, BiUserCircle } from "react-icons/bi";
import SendIcon from '@material-ui/icons/Send';
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCardImage } from "react-icons/bs";
import Callingmodal from './Callingmodal';
const Header = ({ avatar, _id }: any) => {
  const meee=useAppSelector(state=>state.user.user)

  const [userimage, setuserimage] = useState('');
  const [unreadedmessagescount, setunreadedmessagescount] = useState(0);
  const [addpostmodal, setaddpostmodal] = useState(false);
  const [showsearch, setshowsearch] = useState(false);
  const [eventsmodal, seteventsmodal] = useState(false);
  const [postimage, setpostimage] = useState<any>(null);
  const [callingmodal, setcallingmodal] = useState<{calling:boolean,caller:any}>({
      calling:false,
      caller:null
  });
  const [postdescription, setpostdescription] = useState("");
  const [searchinput, setsearchinput] = useState("");
  const notify = (msg: string) => toast.error(msg);
  const router = useRouter();
  const socket = useSocket();
  const dispatch = useDispatch();
  const events: Array<eventtype> = useAppSelector((state) => state.chat.events);
  const forfollow=useAppSelector((state) => state.chat.forfollow);
  const [unreadedevents, setunreadedevents] = useState<Array<eventtype>>([]);

  useEffect(() => {
    setunreadedevents(events.filter((el) => !el.readed));
    console.log("header on event change",events)
  }, [events]);
  const logout = () => {
    socket.emit("@Client:user_status", { status: false, id: _id });
    destroyCookie(null, "token");
    router.push("/login", undefined, { shallow: true });
  };
  const onDrop = useCallback((acceptedFiles) => {
    const newimage = URL.createObjectURL(acceptedFiles[0]);
    setuserimage(newimage);
    setpostimage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    socket.on("@server:newevent", (data: eventtype) => {
      if (String(_id) === String(data.object)  && String(_id) !== String(data.subject._id) ) {
          if(events.every(el=>el._id !== data._id)){
            console.log('pushevent',data)
            dispatch(pushevent(data));
          }
      }
    });
    (async ()=>{
        const counter=await Api({},cookies.token).getmyunreadedmessagescount()
        setunreadedmessagescount(counter)
    })()
    return () => {
      setaddpostmodal(false);
    };
  }, []);
  useEffect(() => {
    socket.on("@server:calling_to_user", ({caller,targetid}:any) => {
      if(String(targetid) === String(_id) && !router.pathname.includes('videochat')){
        if(callingmodal.calling){
          socket.emit('@client:calling_answer',{answered:false,caller:caller._id,answerer:_id})
        }
          setcallingmodal({calling:true,caller})
      }
    })
  }, []);
  useEffect(() => {
    socket.on("@server:calling_answer", ({answered,caller,answerer,roomid}:any) => {
          if(String(caller) === String(_id)){
              if(answered){
                  router.push('/videochat/'+String(roomid), undefined, { shallow: true })
              }else{
                console.log('answer is false')
                notify('videochat failure')
              }
          }
    })
  }, []);
  // 
  const cookies = parseCookies();
  const createpost = async () => {
    const post = new FormData();
    if (postimage) {
      post.append("foto", postimage);
      post.append("description", postdescription);
      const newpost = await Api({}, cookies.token).createpost(post);
      dispatch(pushpost(newpost));
      setpostimage(null);
      setpostdescription("");
      setuserimage('');
      const userr = await Api({}, cookies.token).getMe();
      dispatch(changeuser(userr));
    } else {
      notify("plesa upload image");
    }
  };
  const closeeventmodal = () => {
    seteventsmodal(false);
  };
  const closesearchmodal = () => {
    setshowsearch(false);
  };
  const unreadedfilter = (typee: string) => {
    return unreadedevents.filter((el) => el.type === typee);
  }
  useEffect(() => {
    (async ()=>{
      const counter=await Api({},cookies.token).getmyunreadedmessagescount()
      setunreadedmessagescount(counter)
  })()
  }, [forfollow]);
 useEffect(() => {
      socket.on('@server:new_room',async (data:any)=>{
        if(String(data.newmessage.secnt._id) === String(_id)){
          const counter=await Api({},cookies.token).getmyunreadedmessagescount()
          setunreadedmessagescount(counter)
        }
      })
      }, [socket]);
      
      const callinganswer=async(answer:boolean)=>{
          const room=await Api({},cookies.token).getroombyuserid(callingmodal.caller._id)
          socket.emit('@client:calling_answer',{answered:answer,caller:callingmodal.caller._id,answerer:_id,roomid:room._id})
          if(answer){
            router.push(`/videochat/${room._id}`, undefined, { shallow: true })
          }
          setcallingmodal({calling:false,caller:null})
      }
  return (
    <>
    {callingmodal.calling ? <Callingmodal answerfunction={callinganswer} caller={callingmodal.caller}/> : null}
    <div
      onClick={(e: any) => {
        if (e.target.className !== "header_search_input") {
          closesearchmodal();
        }
        if (e.target.id !== "heartic") {
          seteventsmodal(false);
        }
      }}
    >
      <div className={`addpostmodal ${addpostmodal && "addpostmodal_active"}`}>
        <div
          onClick={() => setaddpostmodal(false)}
          className="closeaddpostmodal"
        >
          &times;
        </div>
        {userimage.length ? <img
        className="create__post-placeholder"
          src={userimage}
          alt="userimage"
          height="200px"
          width="200px"
        />  : <BsCardImage className="create__post-placeholder"/>}
        
        <div {...getRootProps()}>
          <input {...getInputProps()} accept=".jpg,.jpeg,.png" />
          {isDragActive ? (
            <div className="after_drag">Drop the image here ...</div>
          ) : (
            <div className="before_drag">
              Drag 'n' drop some image here,
              <br /> or click to select files <br />
              <span></span>
            </div>
          )}
        </div>
        <input
          value={postdescription}
          onChange={(e) => setpostdescription(e.target.value)}
          type="text"
          className="createfile_input"
          placeholder="description"
        />
        <button onClick={createpost} className="createfile_btn">
          createpost
        </button>
      </div>
      {eventsmodal ? <Eventsmodal close={closeeventmodal} /> : null}
      <div className="header_big_wraper">
        <div className="header_container">
          <div className="header_small_wraper">
            <div className="header_left">
              <div
                onClick={() => router.push("/", undefined, { shallow: true })}
                className="header_logo"
              ></div>
            </div>
            <div className="header_center">
              <input
                onFocus={() => setshowsearch(true)}
                value={searchinput}
                onChange={(e) => setsearchinput(e.target.value)}
                className="header_search_input"
                placeholder="🔎︎Search"
                type="text"
              />
              {showsearch ? (
                <Searchuser
                  showsearchmodal={closesearchmodal}
                  chars={searchinput}
                />
              ) : null}
            </div>
            <div className="header_rigth">
              <IoHomeOutline 
                className="header_icons"/>
                <BiImageAdd 
                width={25}
                height={25}
                onClick={() => setaddpostmodal(!addpostmodal)}
                className="header_icons"
                  />
              
                <span onClick={() => router.push("/direct/inbox", undefined, { shallow: true })}> 
                <span className="direct__icon-wraper">
                <SendIcon  className="header_icons header_icons_direct" />
                  {unreadedmessagescount > 0 && <h3>{unreadedmessagescount}</h3>}
                </span>
                  
                   </span>
              <div id="heartic">
                <IoMdHeartEmpty 
                className="header_icons"
                onClick={(e) => {
                  e.stopPropagation();
                  seteventsmodal(true);
                }}
                />
                {unreadedevents.length > 0 ? (
                  <span className="events_counter">
                    {unreadedfilter(eventenum.like).length > 0 ? (
                      <div className="events_counter_like">
                        {unreadedfilter(eventenum.like).length}
                        <FavoriteIcon  style={{fontSize:"20px",color:"white",cursor:"pointer"}}/>
                      </div>
                    ) : null}
                    {unreadedfilter(eventenum.follow).length > 0 ? (
                      <div className="events_counter_follow">
                        {unreadedfilter(eventenum.follow).length}
                       <BiUserCircle width="20px" height="20px"/>
                      </div>
                    ) : null}
                    {unreadedfilter(eventenum.comment).length > 0 ? (
                      <div className="events_counter_comment">
                        {unreadedfilter(eventenum.comment).length}
                       <MessageIcon style={{fontSize:"20px",color:"white",cursor:"pointer"}}/>
                      </div>
                    ) : null}
                  </span>
                ) : null}
              </div>
              {
                avatar ? <img
                onClick={() => router.push("/profile/" + _id, undefined, { shallow: true })}
                className="header_icons"
                src={ avatar }
                alt="Home Page"
                width={25}
                height={25}
              /> : <BiUserCircle 
                onClick={() => router.push("/profile/" + _id, undefined, { shallow: true })}
                className="header_icons"
              />
              }
              
              <div className="header_dropdoun">
                <Link href={`/profile/[id]`} as={`/profile/${_id}`}>
                  <a className="header_dropdaoum-item">
                    <div>
                      <span></span> profile
                    </div>
                  </a>
                </Link>
                <Link href='/profile/edit' as={`/profile/edit`}>
                  <a className="header_dropdaoum-item">
                    {" "}
                    <div>
                      <span></span>Edit profile
                    </div>
                  </a>
                </Link>
                <Link href={`/`} as='/'>
                  <a className="header_dropdaoum-item">
                    {" "}
                    <div>
                      <span></span>saved
                    </div>
                  </a>
                </Link>

                <a className="header_dropdaoum-item">
                  {" "}
                  <div onClick={logout}>
                    <span></span>Logout
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
