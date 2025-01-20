import { useEffect, useState } from 'react';
import './employeeList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import ExpandableText from '../Exapnd/ExpandableText';

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
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Name: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    TitleRole: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    CompanyLocation: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    WorkStartYear: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    WorkEndYear: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    ATIStartYear: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    ATIEndYear: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Education: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    CertificatesLicenses: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    OtherQualification: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    ProjectDetails: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

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
      } )
      .catch(error =>{
        console.log(error,"error")
      })
}, []);

// console.log(employees,"employees  ")
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
const formateDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${(date.getMonth()+1).toString().padStart(2,"0")} / ${date.getFullYear()}`
}
const parseJsonDate=(dateString : string | number | Date) => {
  return dateString ? new Date(dateString) : null;
}
const calculateYearExperience =(rowData:any,start:string,end:string,present:string) => {
  const workStartYear = parseJsonDate(rowData[start])
  const workEndDate = rowData[present] ? new Date() : parseJsonDate(rowData[end])
  
  if(!workStartYear || !workEndDate) return '-';
  let years = workEndDate.getFullYear() - workStartYear.getFullYear();
  let months = workEndDate.getMonth() - workStartYear.getMonth();

  if(months < 0){
    years -= 1;
    months += 12;
  }
  const yearText = years === 1 ? 'year': 'years';
  const monthText = months === 1 ? 'month': 'months';
  const printYear = years > 0 ? `${years} ${yearText}` : '';
  const printMonth = months > 0 ? `${months} ${monthText}` : '';
  const sep = printMonth && printYear ? ',' : '';
  return `${printYear}${sep} ${printMonth}`
}
  const dateOngoing = (rowData: any,present: string, end:string) => {
    if (rowData[present]) {

      if (rowData[end]) {
          // If it's a valid date, format it to MM/YYYY
          const timestamp = parseInt(rowData[end].match(/\d+/)[0]);
          var date = new Date(timestamp);
          return (date.getMonth() + 1).toString().padStart(2, '0') + ' / ' + date.getFullYear();
      } else {
          return 'Ongoing';
      }
  } else { 
      if (rowData[end]) {
          const timestamp = parseInt(rowData[end].match(/\d+/)[0]);
          var date = new Date(timestamp);
          return (date.getMonth() + 1).toString().padStart(2, '0') + ' / ' + date.getFullYear();
      } else {
          return '-';
      }
  }
}
const header = renderHeader();
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
             <DataTable value={employees} paginator showGridlines rows={10} header={header} filters={filters}
              globalFilterFields={['Name', 'TitleRole', 'CompanyLocation','Education','CertificatesLicenses','OtherQualification','WorkStartYear','WorkEndYear','ATIStartYear','ATIEndYear']}
              emptyMessage="No matching records found" onFilter={(e) => setFilters(e.filters)}>
                <Column
                  header="Actions"
                  body={(rowData: Employee) => (
                    <Link
                      to={`/home-page/add-employee/${rowData.Id}`}
                      className="btn btn-primary btn-sm bg-blue"                     
                    >
                      View or Edit
                    </Link>
                  )}
                />
              <Column header="Name" field='Name' sortable style={{ width: '20%' }}
               body={(rowData) => <ExpandableText content={rowData.Name} maxLength ={30}></ExpandableText>}/>

              <Column header="Title/Role" field='TitleRole' sortable 
              body={(rowData) => <ExpandableText content={rowData.TitleRole} maxLength ={30}></ExpandableText>}/>

              <Column header="Years of Experience" field='' sortable style={{ width: '20%' }}
              body={(rowData) => calculateYearExperience(rowData,'WorkStartYear','WorkEndYear','WorkEndPresent')}/>

              <Column header="Years with Employer" field='' sortable style={{ width: '20%' }}
              body={(rowData) => calculateYearExperience(rowData,'ATIStartYear','ATIEndYear','ATiEndPresent')}/>

              <Column header="Firm Name and Location (city and state)" sortable field='CompanyLocation' style={{ width: '20%' }}
              body={(rowData) => <ExpandableText content={rowData.CompanyLocation} maxLength ={30}></ExpandableText>}/>

              <Column header="Education/Degrees" field='Education' sortable style={{ width: '20%' }}
              body={(rowData) => <ExpandableText content={rowData.Education} maxLength ={30}></ExpandableText>}/>

              <Column header="Certifications and Licenses" field='CertificatesLicenses' sortable style={{ width: '20%' }}
              body={(rowData) => <ExpandableText content={rowData.CertificatesLicenses} maxLength ={30}></ExpandableText>}/>

              <Column header="Other Professional Qualifications" field='OtherQualification' sortable style={{ width: '20%' }}
              body={(rowData) => <ExpandableText content={rowData.OtherQualification} maxLength ={30}></ExpandableText>}/>

              <Column header="Career Start Year" field='WorkStartYear' sortable style={{ width: '20%' }}
              body={(rowData) => formateDate(rowData.WorkStartYear)}/>

              <Column header="Career End Year" field='WorkEndYear' sortable style={{ width: '20%' }}
              body={(rowData) => dateOngoing(rowData, 'WorkEndPresent', 'WorkEndYear')} />

              <Column header="ATI/DGI Start Year" field='ATIStartYear' sortable style={{ width: '20%' }}
              body={(rowData) => formateDate(rowData.ATIStartYear)}/>

              <Column header="ATI/DGI End Year" field='ATIEndYear' sortable style={{ width: '20%' }}
              body={(rowData) => dateOngoing(rowData,'ATiEndPresent','ATIEndYear')}/>

             </DataTable>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default EmployeeList

