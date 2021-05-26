import { GetServerSideProps } from 'next';
import React from 'react';

const Index = () => {
    return (
        <div>
            index
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props:{}
    }
  }
export default Index;
