import React, { createContext, useState } from 'react';
import Login from '../components/login';
import Signup from '../components/Signup';
export const Elementcontext=createContext({})
const Index = () => {

    const elements:any={
        '0':<Login/>,
        '1':<Signup/>
    }
    const [loginelement, setloginelement] = useState(0);

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
