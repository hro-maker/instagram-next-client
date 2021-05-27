import React from 'react';
import Loader from 'react-loader-spinner';
import './loader.module.scss'
const Loaderr = () => {
    return (
        <Loader
        type="Puff"
        color="#000000"
        height={100}
        width={100}
      /> );
}

export default Loaderr;
