import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './navBar.css';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header className="topnavbar-wrapper">
        <nav className="navbar topnavbar">
          <div className="navbar-header">
          
          </div>
          <div className="nav navbar-nav navbar-right">
          
              <Link to="/"> Logout<FontAwesomeIcon icon={faSignOutAlt} className='fa-icon' style={{ color: "#fff" }} /></Link>
            
          </div>

        </nav>
      </header>

    </>
  )
}

export default NavBar
