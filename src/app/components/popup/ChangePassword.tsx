import React from 'react'
import './popup.css';

const ChangePassword = () => {
    return (
        <>
            <div className="modal fade" id="changePasswordModal" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title custom-title" id="changePasswordModalLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='mb-2'>
                                    <label className='form-label fw-bold fs-12'>New Password</label>
                                    <input type='password'
                                        id='userPassword'
                                        placeholder='Password'
                                        className='form-control'
                                        required
                                    />
                                </div>
                                <div className='mb-2'>
                                    <label className='form-label fw-bold fs-12'>Confirm Password</label>
                                    <input type='password'
                                        id='createConfirm'
                                        placeholder='Re-enter Password'
                                        className='form-control'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
