export const Meesageimagemodal=({str,close}:{str:string,close:()=>void})=>{
    const click=(e)=>{
            if(e.target.className === 'image_modal-overlay'){
                close()
            }
    }
    if(str.length > 1){
        return <div onClick={(e)=>click(e)} className="image_modal-overlay">
            <div className="image_modal-close" onClick={close}>&times;</div>
            <div className='image_modal-image'>
            <img src={str} width="100%" height="100%"/>
            </div>
        </div>
    }
        return <></>
}