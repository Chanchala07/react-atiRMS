import { useEffect, useState } from 'react';
import './employeeList.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

interface Employee{
  Id:number
  Name: string
  TitleRole: string
  CompanyLocation: string
  WorkStartYear: string
  WorkEndYear: string
  ATIStartYear:string
  ATIEndYear: string
  Education: string
  CertificatesLicenses:string
  OtherQualification: string
  WorkEndPresent:boolean
  ATiEndPresent: boolean
  ProjectDetails: string
}
const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const listUrl = 'http://ati.eastus.cloudapp.azure.com:5001/api/employee';
    fetch(listUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch api");
        }
        
        return response.json();
      })
      .then((json) =>{setEmployees(json.Response);
        setFilteredEmployees(json.Response);
      } )
      .catch(error =>{
        console.log(error,"error")
      })
}, []);

// console.log(employees,"employees  ")
const columns = [
  //{ name: 'ID', selector:( row:any )=> row.Id, sortable: true },
  {
    name: 'Actions',
    cell: (row: Employee) => <Link to={`/home-page/add-employee/${row.Id}`}
      className='btn btn-primary btn-sm' style={{ background: "#23b7e5", border: "none" }}>View or Edit</Link>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: 'Name',
    selector: (row: Employee) => row.Name,
    sortable: true,
    width: '200px'
  },
  {
    name: 'Title/Role',
    selector: (row: Employee) => row.TitleRole,
    sortable: true,
    width: '420px'
  },
  { name: 'Year of Experience', 
    selector: (row: Employee) => {
      const workStartYear = new Date(row.WorkStartYear);
      const workEndYear = row.WorkEndPresent ? new Date() : new Date(row.WorkEndYear);
      if(!workStartYear || !workEndYear) return '-';
      let years = workEndYear.getFullYear() - workStartYear.getFullYear();
      let months = workEndYear.getMonth() - workStartYear.getMonth();
      if(months < 0){
        years -= 1;
        months += 12;
      }
      const totalMonths = years * 12 + months;
      const yearText = years === 1 ? "year" : "years";
      const monthText = months === 1 ? "month" : "months";
     {
        const yearDisplay = years > 0 ? `${years} ${yearText}` : '';
        const monthDisplay = months > 0 ? `${months} ${monthText} ` : '';
        const separator = yearDisplay && monthDisplay ? ', ' : '';
        return `${yearDisplay}${separator}${monthDisplay}` || '-';
      }
     
          
    },
    sortable: true, 
    width: '150px'
  },
  { name: 'Year with Employer', 
    selector: (row: Employee) =>{
      const atiStartYear = new Date(row.ATIStartYear);
      const atiEndYear = row.ATiEndPresent ? new Date(): new Date(row.ATIEndYear);
      if(!atiStartYear || !atiEndYear) return '-';
      let years = atiEndYear.getFullYear() - atiStartYear.getFullYear();
      let months = atiEndYear.getMonth() - atiStartYear.getMonth();
      if(months < 0){
        years -= 1;
        months += 12;
      }
      const yearText = years === 1 ? "year" : "years";
      const monthText = months === 1 ? "month" : "months";
    
      const yearDisplay = years > 0 ? `${years} ${yearText}` : '';
          const monthDisplay = months > 0 ? `${months} ${monthText} ` : '';
          const separator = yearDisplay && monthDisplay ? ', ' : '';
          return `${yearDisplay}${separator}${monthDisplay}` || '-';
    }, 
    sortable: true,
    width: '170px'
  },
  {
    name: 'Firm Name and Location (city and state)',
    selector: (row: Employee) => row.CompanyLocation,
    sortable: true,
    width: '270px'
  },
  {
    name: 'Education/Degrees',
    selector: (row: Employee) => row.Education,
    sortable: true,
    width: '420px'
  },
  {
    name: 'Certifications/Licenses',
    selector: (row: Employee) => row.CertificatesLicenses,
    sortable: true,
    width: '420px'
  },
  {
    name: 'Other Professional Qualifications',
    selector: (row: Employee) => row.OtherQualification,
    sortable: true,
    width: '420px'
  },
  { name: 'Career Start Year', 
    selector: (row: Employee) => {
      if(!row.WorkStartYear) return '-';    
      const getMonth = (new Date(row.WorkStartYear).getMonth() + 1).toString().padStart(2,'0');
      const getYear = new Date(row.WorkStartYear).getFullYear();
      return `${getMonth}/${getYear}`; 
    },   
    sortable: true,
    width: '150px'
 },
  {
    name: 'Career End Year',
    selector: (row: Employee) => {
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
    name: 'ATI/DGI Start Year',
    selector: (row: Employee) => {
      if(!row.ATIStartYear) return '-';
      const getMonth = (new Date(row.ATIStartYear).getMonth() + 1).toString().padStart(2,'0')
      const getYear = new Date(row.ATIStartYear).getFullYear();
      return `${getMonth}/${getYear}`;
    },
    sortable: true,
    width: '150px'
  },
  {
    name: 'ATI/DGI End Year',
    selector: (row: Employee) => {     
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
const handleSearchInputChange = (text: string) => {
  setSearchQuery(text);

  const lowerText = text.toLowerCase();
  const filtered = text === ""
    ? employees
    : employees.filter((employee) =>
        (employee.Name?.toLowerCase() || "").includes(lowerText) ||
        (employee.TitleRole?.toLowerCase() || "").includes(lowerText) ||
        (employee.CompanyLocation?.toLowerCase() || "").includes(lowerText) ||
        (employee.Education?.toLowerCase() || "").includes(lowerText) ||
        (employee.CertificatesLicenses?.toLowerCase() || "").includes(lowerText) ||
        (employee.OtherQualification?.toLowerCase() || "").includes(lowerText)
      );

  setFilteredEmployees(filtered);
  //console.log("Filtered Employees:", filtered);
};

return (
  <>
    <div className='content-wraper'>
      <div className='heading'>
        <h3>Active Employees{" "}
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fs-20'
            title='The search functionality searches over all Employee Info and Project Info data for a given Employee. You can also sort on each of the columns.'
          />
            
        </h3>
      </div>
      <div className='row'>
        <div className='col-md-12 col-lg-12'>
          <div className='panel'>
            <div className='panel-body'>
              <input className='filter'
                type='text'
                placeholder='Search'
                onChange={(e) => handleSearchInputChange(e.target.value)}
                value={searchQuery}
              />
              <DataTable
                columns={columns}
                data={filteredEmployees}
                //progressPending={loading}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default EmployeeList

