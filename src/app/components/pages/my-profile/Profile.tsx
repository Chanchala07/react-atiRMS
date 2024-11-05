import { useEffect, useState } from 'react';
import './profile.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const Profile = () => {

return (
  <>
    <div className='content-wraper'>
      <div className='heading'>
        <h3>My Profile</h3>
        <div className='col-md-2 text-end'>
          <Link to='' className='btn'>Back</Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 col-lg-12'>

        </div>
      </div>
    </div>
  </>
)
}

export default Profile

