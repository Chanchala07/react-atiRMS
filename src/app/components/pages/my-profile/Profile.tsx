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
import { profileListData1 } from '../../../Reducers/getDataListSlice';
import AddEditUser from '../../popup/AddEditUser';
import { RootState } from '../../../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from '../../popup/ChangePassword';
import { Loader } from '../../constants/loader/Loader';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [activeTab, setActiveTab] = useState('personalDetails');
  const { profileListData, status, error } = useSelector((state: RootState) => state.employeeList);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    FirstName: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    UserName: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    UserPassword: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(profileListData1());
        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <>
      {loading ? <Loader/> : ""}
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
            <button type='button'
              className='btn btn-primary btn-user'
              data-bs-toggle="modal"
              data-bs-target="#addUserModal">
              Add New User
            </button>
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
                                id='userId_unique'
                                value = {0}
                                disabled
                              />
                            </div>
                            <div className='mb-3'>
                              <label className='form-label'>User Name</label>
                              <input
                                className='form-control'
                                type='text'
                                id='userName'
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
                                id='password'
                                readOnly
                                disabled
                              />
                            </div>
                            <div className='mb-3'>
                              <button type="button" className='btn btn-primary btn-change-pass mt-4'>Change Password</button>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* //For User Details */}
                      {activeTab === 'userDetails' && (
                        <div className='row'>

                          <div className='col-md-12 col-lg-12'>
                            <DataTable value={profileListData}
                              paginator
                              showGridlines
                              rows={10}
                              header={header}
                              filters={filters}
                              globalFilterFields={['FirstName', 'UserName', 'UserPassword']}
                              emptyMessage="No matching records found"
                              onFilter={(e) => setFilters(e.filters)}>

                              <Column field='FirstName'
                                header="Name"
                                sortable />

                              <Column field='UserName'
                                header="Username"
                                sortable />

                              <Column field='UserPassword'
                                header="Password"
                                sortable />

                              <Column field=''
                                header="Actions"

                                body={(rowData) =>
                                  <div>
                                    <Link to=''
                                      className="btn btn-primary btn-sm bg-blue m-1">
                                      Archive
                                    </Link>

                                    <button type='button'
                                      className="btn btn-primary btn-sm bg-red m-1"
                                      data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                                      Change Password
                                    </button>

                                    <button type='button'
                                      className="btn btn-primary btn-sm bg-purple m-1"
                                      data-bs-toggle="modal" data-bs-target="#addUserModal">
                                      Edit
                                    </button>

                                    <Link to={`/home-page/add-employee/${rowData.EmployeeId}`}
                                      className="btn btn-primary btn-sm bg-blue m-1">
                                      View Resume
                                    </Link>
                                  </div>} />
                            </DataTable>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </form>
            <AddEditUser />
            <ChangePassword />
          </div>
        </div>
      </div>


    </>
  )
}

export default Profile

