import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ArchivedEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const listUrl = 'http://ati.eastus.cloudapp.azure.com:5001/api/myprofile/archivedemployee/';
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
  {
    name: 'Actions',
     cell: ( row:any ) => <Link to= {`/home-page/add-employee/${row.Id}`} className='btn btn-primary btn-sm' style={{background: "#23b7e5",border: "none"}}>View or Edit</Link>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  { name: 'Name', selector: (row: any) => row.Name, sortable: true, width: '150px' },
  { name: 'Title/Role', selector: (row: any) => row.TitleRole, sortable: true, width: '150px' },
  { name: 'Year of Experience', 
    selector: (row: any) => {
      const workStartYear = new Date(row.WorkStartYear).getFullYear();
      const workEndYear = row.WorkEndPresent ? new Date().getFullYear() : new Date(row.WorkEndYear).getFullYear();
      return workStartYear ?  (workEndYear - workStartYear) : '-';
    },
    sortable: true, 
    width: '150px'
  },
  { name: 'Year with Employer', 
    selector: (row: any) =>{
      const atiStartYear = new Date(row.ATIStartYear).getFullYear();
      const atiEndYear = row.ATiEndPresent ? new Date().getFullYear() : new Date(row.ATIEndYear).getFullYear();
      return atiStartYear ? (atiEndYear - atiStartYear) : '-';
    }, 
    sortable: true,
    width: '150px'
  },
  { name: 'Company & Location', selector: (row: any) => row.CompanyLocation, sortable: true, width: '150px' },
  { name: 'Education/Degrees', selector: (row: any) => row.Education, sortable: true, width: '150px' },
  { name: 'Certifications/Licenses', selector: (row: any) => row.CertificatesLicenses, sortable: true, width: '150px' },
  { name: 'Other Professional Qualifications', selector: (row: any) => row.OtherQualification, sortable: true, width: '150px' },
  { name: 'Work Start Year', 
    selector: (row: any) => {
      if(!row.WorkStartYear) return '-';    
      const getMonth = (new Date(row.WorkStartYear).getMonth() + 1).toString().padStart(2,'0');
      const getYear = new Date(row.WorkStartYear).getFullYear();
      return `${getMonth}/${getYear}`; 
    },   
    sortable: true,
    width: '150px'
 },
  {
    name: 'Work End Year',
    selector: (row: any) => {
      const getMonth = (new Date(row.WorkEndYear).getMonth() + 1 ).toString().padStart(2,'0');
      const getYear = new Date(row.WorkEndYear).getFullYear();
      if(row.WorkEndPresent)       
        return row.WorkEndYear ? `${getMonth}/${getYear}` : 'Ongoing';
      else
        return row.WorkEndYear ? `${getMonth}/${getYear}` : '-'
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'ATI Start Year',
    selector: (row: any) => {
      if(!row.ATIStartYear) return '-';
      const getMonth = (new Date(row.ATIStartYear).getMonth() + 1).toString().padStart(2,'0')
      const getYear = new Date(row.ATIStartYear).getFullYear();
      return `${getMonth}/${getYear}`;
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'ATI End Year',
    selector: (row: any) => {     
      const getMonth = (new Date(row.ATIEndYear).getMonth() + 1).toString().padStart(2,'0');  
      const getYear = new Date(row.ATIEndYear).getFullYear();
      if(row.ATiEndPresent)
        return row.ATIEndYear ? `${getMonth}/${getYear}` : 'Ongoing';
      else
        return row.ATIEndYear ? `${getMonth}/${getYear}` : '-';
    },
    sortable: true,
    width: '150px'
  }
  
];
 

return (
  <>
    <div className='content-wraper'>
      <div className='heading'>
        <h3>Archived Employees</h3>
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

export default ArchivedEmployees

