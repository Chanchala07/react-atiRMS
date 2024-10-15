import React from 'react'
import './loginPage.css'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faLock } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import { Link } from 'react-router-dom';
const LoginPage = () => { 

  console.log("Testing")
  console.log("Testing again")
  return (
   <>
     <Header/>
      <div className='Section'>
        <div className='container'>
          <div className='row'>
            <form>
              <div className='col-md-5 col-sm-6 col-xs-12'>
                <div className='login-container rounded'>
                  <div className='panel-body'>
                    <div className='mb-3'>
                      <label className='form-label text-white'>User Name</label>
                      <div className = 'position-relative'>
                        <input className='form-control' type='text' name='userName' placeholder='someone@nowhere.com' />
                        <FontAwesomeIcon icon={faEnvelope} className='fa-icon' />
                      </div>
                     
                    </div>
                    <div className='mb-3'>
                      <label className='form-label text-white'>Password</label>
                      <div className='position-relative'>
                      <input className='form-control' type='password' name='password' placeholder='Password' />
                      <FontAwesomeIcon icon={faLock} className='fa-icon ' />
                      </div>            
                    </div>
                    <div className="form-check mb-3">
                      <input className='form-check-input' type='checkbox' />
                      <label className='text-white'>Remember Me?</label>
                    </div>
                   
                  </div>
                  <div className='login-btn'>
                    <Link to="/home-page">
                      <button type='button' 
                        className='btn btn-primary btn-lg w-100 fs-6' 
                        style={{background:"#337ab7",
                          border:'#286090'
                        }}>
                      Login
                      </button>
                    </Link>                   
                  </div>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
      <Footer/>
   </>
  )
}

export default LoginPage
