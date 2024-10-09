import React from 'react'
import './header.css'
const Header = () => {
  var headerImage = 'http://ati.eastus.cloudapp.azure.com:5000/Content/Images/ATI.png'
  return (
    <>
      <div className='header-container'>       
       <img src={headerImage} className='header-image' alt='hii' width={140} />
      </div>
    </>
  )
}

export default Header
