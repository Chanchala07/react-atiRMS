import React, { useState } from 'react'; // Import useState from React
import './sideBar.css';
import atiLogo from '../../../assets/images/logo-white.png';
import EmployeeList from '../employee/EmployeeList';
import FooterLogin from '../footer-after-login/FooterLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"


const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="App">
                {/* Sidebar */}
                <div
                    className={`w3-sidebar w3-bar-block w3-card w3-animate-left ${isSidebarOpen ? 'open' : 'closed'}`}
                    style={{ display: isSidebarOpen ? 'block' : 'none', width: '25%' }}
                    id="mySidebar"
                >  
                 <nav className="navbar topnavbar">
                        <div className="navbar-header">
                        <img
                        src={atiLogo}
                        onClick={toggleSidebar}
                        style={{ cursor: 'pointer', height:"20px" }}
                        alt="Sidebar Close"
                    />
                        </div>
                    </nav>

                    <a href="#" className="w3-bar-item w3-button">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button">Link 3</a>
                </div>

                {/* Main Content */}
                <div style={{ marginLeft: isSidebarOpen ? '25%' : '0%' }}>

                    <header className="topnavbar-wrapper" style={{ background: "#6357ae" }}>
                        <nav className="navbar topnavbar">
               
                                <button
                                    id="openNav"
                                    className="w3-button w3-teal w3-xlarge"
                                    onClick={toggleSidebar}
                                    style={{ display: 'inline-block' }}
                                >
                                    &#9776;
                                </button>
                            
                            <div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="#"> <FontAwesomeIcon icon={faSignOutAlt} className='fa-icon' style={{ color: "#fff" }} /></a></li>
                                </ul>
                            </div>

                        </nav>
                    </header>

                    <EmployeeList />
                    <FooterLogin />
                </div>
            </div>
        </>
    );
};

export default SideBar;
