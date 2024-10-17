import { useEffect, useState } from 'react';
import './employeeList.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const listUrl = 'http://ati.eastus.cloudapp.azure.com:5001/api/employee';
    fetch(listUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then(json => setEmployees(json.Response))
      .catch(error =>{
        console.log(error,"error")
      })
}, []);

// console.log(employees,"employees  ")
const columns = [
  //{ name: 'ID', selector:( row:any )=> row.Id, sortable: true },
  { name: 'Name', selector: (row: any) => row.Name, sortable: true, width: '150px' },
  { name: 'Title/Role', selector: (row: any) => row.TitleRole, sortable: true, width: '150px' },
  { name: 'Year of Experience', selector: (row: any) => row.YearofExperience, sortable: true, width: '150px' },
  { name: 'Year with Employer', selector: (row: any) => row.YearsWithEmployeer, sortable: true, width: '150px' },
  { name: 'Company & Location', selector: (row: any) => row.CompanyLocation, sortable: true, width: '150px' },
  { name: 'Education/Degrees', selector: (row: any) => row.Education, sortable: true, width: '150px' },
  { name: 'Certifications/Licenses', selector: (row: any) => row.CertificatesLicenses, sortable: true, width: '150px' },
  { name: 'Other Professional Qualifications', selector: (row: any) => row.OtherQualification, sortable: true, width: '150px' },
  { name: 'Work Start Year', 
    selector: (row: any) => {
      if(!row.WorkStartYear) return '-';    
      const startDate = new Date(row.WorkStartYear).getFullYear();
      return startDate; 
    },   
    sortable: true,
    width: '150px'
 },
  {
    name: 'Work End Year',
    selector: (row: any) => {
      if(!row.WorkEndYear) return '-';
      const endDate = new Date(row.WorkEndYear).getFullYear();
      return endDate;
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'ATI Start Year',
    selector: (row: any) => {
      if(!row.ATIStartYear) return '-';
      const atiStart = new Date(row.ATIStartYear).getFullYear();
      return atiStart;
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'ATI End Year',
    selector: (row: any) => {
      if(!row.ATIEndYear) return '-';
      const atiEnd = new Date(row.ATIEndYear).getFullYear();
      return atiEnd;
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'Actions',
     cell: ( row:any ) => <Link to= '/add-employee' className='btn btn-primary btn-sm' style={{background: "#23b7e5",border: "none"}}>View or Edit</Link>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
 

return (
  <>
    <div className='content-wraper'>
      <div className='heading'>
        <h3>Employee List</h3>
      </div>
      <div className='row'>
        <div className='col-md-12 col-lg-12'>
          <div className='panel'>
            {/* <input
             type='text'
             placeholder='Search'
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            /> */}
            <DataTable
              columns={columns}
              data={employees}
              // progressPending={loading}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default EmployeeList

