import React from 'react'

const NavBar = () => {
  return (
   <>
   <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
  
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> LogOut</a></li>
    </ul>
  </div>
</nav>
   </>
  )
}

export default NavBar
