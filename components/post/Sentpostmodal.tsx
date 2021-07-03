import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { changeuser } from '../../redux/slices/userslice';
import { Api } from '../../utiles/api';
import { subscruser } from '../profile/profilemodal';

const Sentpostmodal = () => {
    const user=useAppSelector(state=>state.user.user)
    const [loading, setloading] = useState(false);
    const router=useRouter()
    const cookies=parseCookies()


 
    return (
        <div>
            
        </div>
    );
}

export default Sentpostmodal;
