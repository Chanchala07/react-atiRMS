import React, { useState } from 'react'; // Import useState from React
import './sideBar.css';
import atiLogo from '../../../assets/images/logo-white.png';
import EmployeeList from '../employee/EmployeeList';
import FooterLogin from '../footer-after-login/FooterLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUsers, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import AddEmployee from '../add-Employee/AddEmployee';
import Profile from '../my-profile/Profile';


const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [window, setWindow] = useState("add-employee");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="App">
                {/* Sidebar */}
                <div
                    className={`w3-sidebar w3-bar-block w3-card w3-animate-left ${isSidebarOpen ? 'open' : 'closed'}`}
                    style={{
                        display: 'block',
                        width: isSidebarOpen ? '220px' : '70px',
                        // transition: 'width 0.3s'
                    }}
                    id="mySidebar"
                >
                    <nav className="navbar topnavbar">
                        <div className="navbar-header">
                            <img
                                src={atiLogo}
                                onClick={toggleSidebar}
                                style={{ cursor: 'pointer', width: isSidebarOpen ? "100px" : "40px" }}
                                alt="Sidebar Close"
                            />
                        </div>
                    </nav>
                    <div className='asidebar'>
                        <div className='user-block'>
                            <div className='pt-4 pb-2'>
                                <div className='mx-auto user-picture'>
                                    <div className='user-circle'>
                                        S
                                    </div>
                                </div>
                                {isSidebarOpen && (
                                    <div className='user-info text-center d-flex flex-column'>
                                        <span className='user-name'>Hello, Super Admin</span>
                                        <span className='user-role'>SuperAdmin <em className="fa fa-pencil"></em></span>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className='employee'>
                            <Link to='' title='Employee' className='employee-link'>
                                <FontAwesomeIcon icon={faUsers} style={{ color: "#fff", marginRight: "6%" }} />
                                {isSidebarOpen && (<span className='employee-text'>Employee</span>)}
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Main Content */}
                <div style={{ marginLeft: isSidebarOpen ? '16%' : '5%' }}>

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

                    {/* <EmployeeList /> */}
                    {/* <Profile/> */}
                    <AddEmployee/>


                    <FooterLogin />
                </div>
            </div>
        </>
    );
};

export default SideBar;
