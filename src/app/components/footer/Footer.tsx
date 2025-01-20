import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='container'>
          <div className='row'>
            <p className='col-sm-9 col-xs-12'>© {new Date().getFullYear()} <span className='text-color'>ATI Inc. </span>All rights reserved.</p>
            <p className='col-sm-3 col-xs-12'>Developed by <span className='text-color'>Swap Infotech</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
