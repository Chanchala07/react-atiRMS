import React, { useState } from 'react';
import './sideBar.css';
import atiLogo from '../../../assets/images/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faDashboard, faEdit, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import FooterLogin from '../footer-after-login/FooterLogin';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { logout } from '../../../Reducers/authSlice';

const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    const userRoleId = localStorage.getItem("UserRoleId");
    const firstName = localStorage.getItem("FirstName");
    const roleNAme = localStorage.getItem("UserRoleName");
    const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";
    return (
        <div className="App">

            <div
                className={`w3-sidebar w3-bar-block w3-card w3-animate-left ${isSidebarOpen ? 'open' : 'closed'}`}
                style={{
                    display: 'block',
                    width: isSidebarOpen ? '16%' : '70px',
                }}
                id="mySidebar"
            >
                <nav className="navbar topnavbar" style={{ background: "#6357ae", height: "60px" }}>
                    <div className="navbar-header">
                        <img
                            src={atiLogo}
                            onClick={toggleSidebar}
                            style={{ cursor: 'pointer', width: isSidebarOpen ? "100px" : "40px" }}
                            alt="Sidebar Logo"
                        />
                    </div>
                </nav>
                <div className='asidebar'>
                    <div className='user-block'>
                        <div className='pt-4 pb-2'>
                            <div className='mx-auto user-picture'>
                                <div className='user-circle'>
                                {firstLetter}
                                </div>
                            </div>
                            {isSidebarOpen && (
                                <div className='user-info text-center d-flex flex-column'>
                                    <span className='user-name'>Hello, {firstName}</span>
                                    <span className='user-role'>
                                        <Link to='/home-page/profile' className='text-decoration-none text-purple'>{roleNAme} </Link>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </div>
                            )}
                        </div>

                    </div>
                    {Number(userRoleId) === 1 ? (<div className='employee'>
                        <Link to="/home-page/dashboard"
                            title='Dashboard'
                            className='employee-link'>
                            <FontAwesomeIcon icon={faDashboard}
                                style={{ color: "#fff", marginRight: "6%" }} />
                            {isSidebarOpen && (<span className='employee-text'>Dashboard</span>)}
                        </Link>
                    </div>) : ""}

                    {Number(userRoleId) === 1 ? (<div className='employee'>
                        <Link to="/home-page/employee-list"
                            title='Active Employee'
                            className='employee-link'>
                            <FontAwesomeIcon icon={faUsers}
                                style={{ color: "#fff", marginRight: "6%" }} />
                            {isSidebarOpen && (<span className='employee-text'>Active Employees</span>)}
                        </Link>
                    </div>) : ""}

                    {Number(userRoleId) === 1 ? (<div className='employee'>
                        <Link to="/home-page/archived-list"
                            title='Archived Employees'
                            className='employee-link'>
                            <FontAwesomeIcon icon={faArchive}
                                style={{ color: "#fff", marginRight: "6%" }} />
                            {isSidebarOpen && (<span className='employee-text'>Archived Employees</span>)}
                        </Link>
                    </div>) : ""}

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
                        <div className="nav navbar-nav navbar-right d-flex">

                            <Link to="/" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} className='fa-icon' style={{ color: "#fff" }} /></Link>

                        </div>
                    </nav>
                </header>

                <Outlet />
                <FooterLogin />
            </div>

        </div>
    );
};

export default SideBar;
