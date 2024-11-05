import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronCircleRight, faUsers, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import FooterLogin from '../footer-after-login/FooterLogin';
const Dashboard = () => {
    return (
        <>
            <div className='content-wrapper'>
                <div className='heading'>
                    <h3>Dashboard</h3>
                    <div className='row'>
                        <div className='col-lg-3 col-md-6'>
                            <div className='employye-box'>
                                <div className='panel-heading bg-reen'>
                                    <div className='row p-0'>
                                        <div className='col-sm-3'>                                  
                                            <FontAwesomeIcon icon={faUsers} className='icon-large'/>                                          
                                        </div>
                                        <div className='col-sm-9 text-end'>
                                            <div className='fs-1'>7</div>
                                            <p className='m-0'>Active Employees</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to = '/home-page/employee-list' className='bg-dark-gray panel-footer text-decoration-none'>
                                    <span className='pull-left'>View Details</span>
                                    <span className='float-end'>
                                        <FontAwesomeIcon icon = {faChevronCircleRight}/>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                            <div className='employye-box'>
                                <div className='panel-heading bg-red'>
                                    <div className='row p-0'>
                                        <div className='col-sm-3'>
                                         <FontAwesomeIcon icon={faUserXmark} className='icon-large'/>
                                        </div>
                                        <div className='col-sm-9 text-end'>
                                            <div className='fs-1'>7</div>
                                            <p className='m-0'>Unarchived Employyes</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to = '/home-page/employee-list' className='bg-dark-gray panel-footer text-decoration-none'>
                                    <span className='pull-left'>View Details</span>
                                    <span className='float-end'>
                                        <FontAwesomeIcon icon = {faChevronCircleRight}/>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        </>
    )
}

export default Dashboard