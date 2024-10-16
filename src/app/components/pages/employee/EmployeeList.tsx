import { useEffect, useState } from 'react';
import './employeeList.css';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
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

console.log(employees,"employees  ")
const columns = [
  { name: 'ID', sortable: true },
  { name: 'Title/Role', sortable: true },
  { name: 'Year of Experience', sortable: true },
  { name: 'Year with Employeer', sortable: true },
  { name: 'Company & Location', sortable: true },
  { name: 'Education/Degrees', sortable: true },
  { name: '', sortable: true },
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

