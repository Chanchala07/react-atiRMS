import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
const ArchivedEmployees = () => {
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
    const listUrl = 'http://ati.eastus.cloudapp.azure.com:5001/api/myprofile/archivedemployee/';
    fetch(listUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((json) => {setEmployees(json.Response);    
      })
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
        <h3>Archived Employees{" "}
          
        </h3>
      </div>
      <div className='row'>
        <div className='col-md-12 col-lg-12'>
          <div className='panel'>
          <DataTable value={employees} paginator showGridlines rows={10} header={header} filters={filters}
              globalFilterFields={['Name', 'TitleRole', 'CompanyLocation','Education','CertificatesLicenses','OtherQualification','WorkStartYear','WorkEndYear','ATIStartYear','ATIEndYear']}
              emptyMessage="No matching records found" onFilter={(e) => setFilters(e.filters)}>
              <Column
                header="Actions"
                body={(rowData: Employee) => (
                  <Link
                    to={`/home-page/add-employee/${rowData.Id}`}
                    className="btn btn-view bg-blue" style={{minWidth: "95px"}}                
                  >
                    View or Edit
                  </Link>
                )}
              />
              <Column header="Name" field='Name' sortable className='width_desc_name'
              body={(rowData) => <ExpandableText content={rowData.Name} maxLength ={20}></ExpandableText>}/>

              <Column header="Title/Role" field='TitleRole' sortable className='width_desc'
               body={(rowData) => <ExpandableText content={rowData.TitleRole} maxLength ={20}></ExpandableText>}/>

              <Column header="Years of Experience" field='' sortable 
              body={(rowData) => calculateYearExperience(rowData,'WorkStartYear','WorkEndYear','WorkEndPresent')}/>

              <Column header="Years with Employer" field='' sortable 
              body={(rowData) => calculateYearExperience(rowData,'ATIStartYear','ATIEndYear','ATiEndPresent')}/>
              <Column header="Firm Name and Location (city and state)" field='CompanyLocation' sortable  className='width_desc'
               body={(rowData) => <ExpandableText content={rowData.CompanyLocation} maxLength ={20}></ExpandableText>}/>

              <Column header="Education/Degrees" field='Education' sortable  className='width_desc'
               body={(rowData) => <ExpandableText content={rowData.Education} maxLength ={20}></ExpandableText>}/>

              <Column header="Certifications and Licenses" field='CertificatesLicenses' sortable  className='width_desc'
              body={(rowData) => <ExpandableText content={rowData.CertificatesLicenses} maxLength ={20}></ExpandableText>}/>

              <Column header="Other Professional Qualifications" field='OtherQualification'  sortable  className='width_desc'
               body={(rowData) => <ExpandableText content={rowData.OtherQualification} maxLength ={20}></ExpandableText>}/>

              <Column header="Career Start Year" field='WorkStartYear' sortable 
               body={(rowData) => formateDate(rowData.WorkStartYear)}/>

              <Column header="Career End Year" field='WorkEndYear' sortable 
              body={(rowData) => dateOngoing(rowData, 'WorkEndPresent', 'WorkEndYear')} />

              <Column header="ATI/DGI Start Year" field='ATIStartYear' sortable 
               body={(rowData) => formateDate(rowData.ATIStartYear)}/>
               
               <Column header="ATI/DGI End Year" field='ATIEndYear' sortable 
              body={(rowData) => dateOngoing(rowData,'ATiEndPresent','ATIEndYear')}/>

             </DataTable>        
           
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default ArchivedEmployees

