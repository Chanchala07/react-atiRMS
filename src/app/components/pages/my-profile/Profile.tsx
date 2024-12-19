import { SetStateAction, useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserModal , setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState('personalDetails');
  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);
  const handleShowUser = () => setShowUserModal(true);
  const handleHideUser = () => setShowUserModal(false);
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    FirstName: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    UserName: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    UserPassword: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  useEffect(()=>{
    const userList = "http://ati.eastus.cloudapp.azure.com:5001/api/myprofile/1/1";
    fetch(userList)
    .then(response =>{
      if(!response.ok){
        throw new Error("Failed to fetch api");
      }
      return response.json();
    })
    .then(json =>{
      const user_List = json.Response.objUsersList; 
      setUsers(user_List);
      console.log(user_List)
    });
   
  },[])
  const tabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">        
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange}  placeholder="Search" />
        </IconField>
      </div>
    );
  };
  
  const header = renderHeader();
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
          <div className="d-flex justify-content-between align-items-center">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'personalDetails' ? 'active' : ''}`}
                  onClick={() => tabClick('personalDetails')}
                  href="#"
                >
                  Personal Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'userDetails' ? 'active' : ''}`}
                  onClick={() => tabClick('userDetails')}
                  href="#"
                >
                  User Details
                </a>
              </li>
            </ul>
            <a type='button' className='btn btn-primary btn-user' data-toggle="modal" data-target="#addUserModal" onClick={handleShowUser}>Add New User</a>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <form>
              <div className='tab-content p-0 b-0'>                
                <div className='active'>
                  <div className='panel panel-default'>
                    <div className='panel-body'>{
                      activeTab === 'personalDetails' && (                      
                      <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label'>Unique Id  <span className='text-danger'>* System generated</span></label>
                          <input 
                            className='form-control'
                            type='text'
                            id = 'userId_unique'
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
                      )}

                      {/* //For User Details */}
                      {activeTab === 'userDetails' && (
                        <div className='row'>
                          <div className='col-md-12 col-lg-12'>
                            <div className='panel'>
                              <div className='panel-body'>
                               <DataTable value={users} paginator showGridlines rows={10} header={header} filters={filters}
                                globalFilterFields={['FirstName', 'UserName', 'UserPassword']}
                                emptyMessage="No matching records found" onFilter={(e) => setFilters(e.filters)}>

                                <Column field='FirstName' header="Name" filter/>                              
                                <Column field='UserName' header="Username" filter/>                               
                                <Column field='UserPassword' header="Password" filter/>                              
                                <Column field='' header="Actions" />                               
                               </DataTable>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
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
              <h5 className="modal-title fw-bold">Change Password</h5>
              <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className='col-md-12'>
                  <div className='mb-2'>
                    <label className='form-label fw-bold fs-12'>New Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='userPassword'
                      name='userPassword'
                      required                      
                      placeholder='Password'
                    />
                  </div>
                  <div className='mb-2'>
                    <label className='form-label fw-bold fs-12'>Confirm Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='confirmPassword'
                      name='confirmPassword'
                      required                      
                      placeholder='Re-enter Password'
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0">
              <button type="button" className="btn btn-primary bg-purple btn-change-pwd col-md-12">Change Password</button>
              <button type="button" className="btn btn-secondary btn-change-pwd col-md-12" onClick={handleHide}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* User Modal*/}
      <div className={`modal fade ${showUserModal ? 'show': ''}`} style={{ display: showUserModal ? 'block' : 'none' }} id="addUserModal" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
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
                      required
                    />
                  </div>
                  <div className='mb-2'>
                    <label className='form-label fw-bold fs-12'>User Name <span className='text-danger'>*</span></label>
                    <input type='text'
                    className='form-control'
                    id='createUserName'
                    placeholder='someone@nowhere.com'
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
              <button type="button" className="btn btn-secondary btn-change-pwd col-md-12" data-dismiss="modal" onClick={handleHideUser}>Close</button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

