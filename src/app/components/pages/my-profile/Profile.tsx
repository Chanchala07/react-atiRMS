import { useEffect, useState } from 'react';
import './profile.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);
  return (
    <>
      <div className='content-wrapper'>
        <div className='border-bottom bg-gray'>
          <h3 className='text-profile d-flex justify-content-between align-items-center'>
            <span className=''>My Profile</span>
            <span className=''>
              <Link to='' className='btn btn-back text-decoration-none'>Back</Link>
            </span>
          </h3>
        </div>
        <div className='row'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Personal Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Users Details</a>
            </li>

          </ul>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <form>
              <div className='tab-content p-0 b-0'>
                <div id='' className='active'>
                  <div className='panel panel-default'>
                    <div className='panel-body'>
                      <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label'>Name <span className='text-danger'>* System generated</span></label>
                          <input 
                            className='form-control'
                            type='text'
                            id = 'name'
                            disabled
                            />
                        </div>
                        <div className='mb-3'>
                          <label className='form-label'>User Name</label>
                          <input 
                            className='form-control'
                            type='text'
                            id = 'userName'
                            disabled
                            />
                        </div>
                       
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                            <label className='form-label'>Password </label>
                            <input 
                              className='form-control'
                              type='text'
                              id = 'password'
                              readOnly
                              disabled
                              />
                        </div>
                        <div className='mb-3'>
                          <button type= "button" className='btn btn-primary btn-change-pass mt-4' data-toggle="modal" data-target="#changePasswordModal"  onClick={handleShow}>Change Password</button>
                        </div>
                        </div>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`modal fade ${showModal ? 'show': ''}`}  style={{ display: showModal ? 'block' : 'none' }} role="dialog" id="changePasswordModal" aria-labelledby="changePasswordLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" onClick={handleHide}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

