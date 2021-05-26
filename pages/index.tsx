import React, { createContext, useEffect, useState } from 'react';
import Confirmemail from '../components/confirmemail';
import Forgotpassword from '../components/forgotpassword';
import Login from '../components/login';
import Signup from '../components/Signup';
export const Elementcontext=createContext({})
const Index = () => {

    const elements:any={
        '0':<Login/>,
        '1':<Signup/>,
        '2':<Confirmemail/>,
        '3':<Forgotpassword/>
    }
    const [loginelement, setloginelement] = useState(0);
useEffect(() => {
    console.log(loginelement)
}, [loginelement]);
    const setLoginelement=(num:number)=>{
                setloginelement(num)
    }
    return (
        <Elementcontext.Provider value={{setLoginelement}}>
        <div className="main_page" >
          {elements[loginelement]}
        </div>
        </Elementcontext.Provider>
    );
}

export default Index;
