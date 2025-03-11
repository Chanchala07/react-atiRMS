import React from 'react'

const AddEditUser = () => {
    return (
        <>
            <div className="modal fade " id="addUserModal" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="addUserLabel">Add User</h5>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='mb-2'>
                                    <label className='form-label fw-bold fs-12'>Name</label>
                                    <input type='text'
                                        className='form-control'
                                        id='createName'
                                        placeholder='Name'
                                        required
                                    />
                                </div>
                                <div className='mb-2'>
                                    <label className='form-label fw-bold fs-12'>Username <span className='text-danger'>*</span></label>
                                    <input type='text'
                                        className='form-control'
                                        id='createUserName'
                                        placeholder='someone@nowhere.com'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button"
                                className="btn btn-primary btn-change-pwd bg-purple">
                                Save
                            </button>
                            <button type="button"
                                className="btn btn-secondary btn-change-pwd"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditUser


