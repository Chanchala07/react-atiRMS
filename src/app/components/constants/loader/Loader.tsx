import React from 'react';
import './loader.css';

export const Loader = () => {
    return (
        <>
            <div className='w-100 h-100'>
                <div className='loader-body'>
                    <div className='custom-loader'></div>
                </div>
            </div>
        </>

    )
}

export default Loader
