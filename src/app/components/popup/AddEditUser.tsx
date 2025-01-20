import React from 'react'
interface AddEditUserProps {
    data: any;
    onClose: () => void;
    show: boolean
}
const AddEditUser: React.FC<AddEditUserProps> = ({ data, onClose, show }) => {
    console.log(data,"prfile data")
    return ( 
        <>
            {/* User Modal*/}
            <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} id="addUserModal" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="">Add User</h5>
                            <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                                {/* <span aria-hidden="true">&times;</span> */}
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='col-md-12'>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>Name</label>
                                        <input type='text'
                                            className='form-control'
                                            id='createName'
                                            placeholder='Name'
                                            value={data.FirstName}
                                            required
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>User Name <span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className='form-control'
                                            id='createUserName'
                                            placeholder='someone@nowhere.com'
                                            value={data.UserName}
                                            required
                                        />
                                    </div>
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
                            </form>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="btn btn-primary btn-change-pwd bg-purple col-md-12">Save</button>
                            <button type="button" className="btn btn-secondary btn-change-pwd col-md-12" data-dismiss="modal" onClick={onClose}>Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddEditUser


