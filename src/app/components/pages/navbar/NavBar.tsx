import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './navBar.css';

const NavBar = () => {
  return (
    <>
      <header className="topnavbar-wrapper">
        <nav className="navbar topnavbar">
          <div className="navbar-header">
          
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"> <FontAwesomeIcon icon={faSignOutAlt} className='fa-icon' style={{ color: "#fff" }} /></a></li>
            </ul>
          </div>

        </nav>
      </header>

    </>
  )
}

export default NavBar
