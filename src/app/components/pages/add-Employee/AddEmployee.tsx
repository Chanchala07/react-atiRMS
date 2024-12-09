import { useEffect, useState } from 'react';
import './addEmployee.css';
import { json } from 'stream/consumers';
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';

const AddEmployee = () => {
  const [value, setValue] = useState({
    Name: '',
    TitleRole: '',
    CompanyLocation: '',
    Education: '',
    CertificatesLicenses : '',
    OtherQualification: '',
    WorkStartYear: '',
    WorkEndYear: '',
    WorkEndPresent: '',
    ATIStartYear: '',
    ATIEndYear: '',
    ATiEndPresent: '', 
  
  });
  const [projectList, setProjectList] = useState<any[]>([]); 
  const {id} = useParams<{id: string}>();
  const [showModal, setShowModal ] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProjectByEmployees, setFilteredProjectByEmployees] = useState<any[]>([]);

  useEffect(() => {
    if(id){
      const getEmployee = `http://ati.eastus.cloudapp.azure.com:5001/api/employee/${id}`;
    fetch(getEmployee)
      .then(response => {
          if(!response.ok){
            throw new Error("Failed to fetch api");
          }
          return response.json();
      })
      .then(data => {
        if (data && data.Response) {
          const formattedWorkStartYear = data.Response.WorkStartYear ? data.Response.WorkStartYear.split('T')[0]: ''
          const formattedWorkEndYear = data.Response.WorkEndYear ? data.Response.WorkEndYear.split('T')[0]: ''
          const formattedATIStartYear = data.Response.ATIStartYear ? data.Response.ATIStartYear.split('T')[0]: ''
          const formattedATIEndYear = data.Response.ATIEndYear ? data.Response.ATIEndYear.split('T')[0]: ''
          setValue((prev) => ({
            ...prev,         
            ...data.Response, // Merge API response into the state object
            WorkStartYear : formattedWorkStartYear,
            WorkEndYear: formattedWorkEndYear,
            ATIStartYear: formattedATIStartYear,
            ATIEndYear: formattedATIEndYear
          }));
          const pro_list = data.Response.proejctList || [];
          setProjectList(pro_list);
          setFilteredProjectByEmployees(pro_list);
          console.log("project for filter",pro_list)
          
        }
      })
      .catch(error => {
        console.log("error",error);
      });
    }
    
  }, []);

  useEffect(() => {
    const filtered = projectList.filter((project) => {
      return (
        (project.TitleandLocation?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.ProfessionalService?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (String(project.Checked).toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
        (project.Role?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (String(project.OngoingCheckedPS).toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (String(project.NACheckedPS).toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.AgePS?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Construction?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (String(project.OngoingCheckedCS).toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (String(project.NACheckedCS).toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.AgeCS?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.ProjectValue?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Description?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword1?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword2?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword3?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword4?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword5?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword6?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword7?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword8?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword9?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (project.Keyword10?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
    });
    setFilteredProjectByEmployees(filtered);
  }, [searchQuery, projectList])

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };
  const handleSearch = (e:any) =>{
    setSearchQuery(e.target.value);
  }
  const columns = [
    {
      name: 'Actions',
      cell: (row: any) => <>
        <div className='flex flex-column'>
          <Link to='' className='btn btn-primary btn-sm m-1' style={{ background: "#6357ae", border: "none",padding: "6px 16px" }}> Edit </Link>
          <Link to='' className='btn btn-primary btn-sm m-1' style={{ background: "#f05050", border: "none" }}> Delete </Link>
        </div>
      </>
    },
    {
      name: 'Title and Location (city and state)',
      selector: (row:any) => row.TitleandLocation,
      sortable: true, width: '250px' 
    },
    {
      name : 'Professional Services Year Completed',
      selector: (row:any) => row.ProfessionalService,
      sortable: true, width: '270px' 
    },
    {
      name : 'Age PS',
      selector: (row:any) => row.AgePS,
      sortable: true, width: '100px' 
    },
    {
      name : 'Ongoing (Age PS)',
      sortable: true, width: '150px' ,
      cell: (row: any) => (
        <span style={{ color: row.OngoingCheckedPS ? 'green' : 'red' }}>
          {row.OngoingCheckedPS ? 'Y' : 'N'}
        </span>
      ),
    },
    {
      name : 'N/A (Age PS)',
      sortable: true, width: '150px' ,
      cell: (row: any) => (
        <span style={{ color: row.NACheckedPS ? 'green' : 'red' }}>
          {row.NACheckedPS ? 'Y' : 'N'}
        </span>
      ),
    },
    {
      name : 'Construction Year Completed',
      selector: (row:any) => row.Construction,
      sortable: true, width: '270px' 
    },
    {
      name : 'Age CS',
      selector: (row:any) => row.AgeCS,
      sortable: true, width: '100px' 
    },
    {
      name : 'Ongoing (Age CS)',
      sortable: true, width: '150px' ,
      cell: (row: any) => (
        <span style={{ color: row.OngoingCheckedCS ? 'green' : 'red' }}>
          {row.OngoingCheckedCS ? 'Y' : 'N'}
        </span>
      ),
    },
    {
      name : 'N/A (Age CS)',
      sortable: true, width: '150px' ,
      cell: (row: any) => (
        <span style={{ color: row.NACheckedCS ? 'green' : 'red' }}>
          {row.NACheckedCS ? 'Y' : 'N'}
        </span>
      ),
    },
    {
      name: 'Role',
      selector: (row:any) => row.Role,
      sortable: true, width: '200px' ,
    },
    {
      name: 'Description and Specific Role',
      selector: (row:any) => row.Description,
      sortable: true, width: '420px' ,
    },
    {
      name: 'Project Value',
      selector: (row:any) => row.ProjectValue,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Performed with Current Firm',
      sortable: true, width: '200px' ,
      cell: (row:any)=>(
        <span style={{color: row.Checked ? 'green': 'red'}}>
          {row.Checked? 'Y': 'N'}
        </span>
      ),
    },
    {
      name: 'Keyword 1',
      selector: (row:any) => row.Keyword1,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 2',
      selector: (row:any) => row.Keyword2,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 3',
      selector: (row:any) => row.Keyword3,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 4',
      selector: (row:any) => row.Keyword4,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 5',
      selector: (row:any) => row.Keyword5,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 6',
      selector: (row:any) => row.Keyword6,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 7',
      selector: (row:any) => row.Keyword7,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 8',
      selector: (row:any) => row.Keyword8,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 9',
      selector: (row:any) => row.Keyword9,
      sortable: true, width: '150px' ,
    },
    {
      name: 'Keyword 10',
      selector: (row:any) => row.Keyword10,
      sortable: true, width: '150px' ,
    },
  ];
return (
  <>
    <div className='content-wrapper'>
      <div className='heading'>
        <h3>Add Employee</h3>
      </div>
      <form className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className='row'> 
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Name <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='userName'
                      name='userName'
                      required
                      aria-label='Employee Name'
                      value={value.Name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Title/Role <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='titleRole'
                      name='titleRole'
                      required
                      aria-label='Employee Title or Role'
                      value={value.TitleRole}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Company & Location <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='companyLocation'
                      name='companyLocation'
                      required
                      aria-label='Company and Location'
                      value={value.CompanyLocation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Education/Degrees <span className='text-danger'>*</span></label>
                    <textarea
                      className='form-control'
                      id='educationDegree'
                      name='educationDegree'
                      rows= {3}
                      style={{ resize: 'none' }}
                      required
                      aria-label='Education or Degree '
                      value={value.Education}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Certifications and Licenses <span className='text-danger'>*</span></label>
                    <textarea                     
                      className='form-control'
                      id='certificationLicenses'
                      name='certificationLicenses'
                      rows= {3}
                      style={{ resize: 'none' }}
                      required
                      aria-label='Certifications and Licenses'
                      value={value.CertificatesLicenses}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Other Professional Qualifications <span className='text-danger'>*</span></label>
                    <textarea                     
                      className='form-control'
                      id='otherProfessional'
                      name='otherProfessional'
                      rows= {3}
                      style={{ resize: 'none' }}
                      required
                      aria-label='Other Professional Qualifications'
                      value={value.OtherQualification}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Work Start Year <span className='text-danger'>*</span></label>
                    <input      
                      type='date'               
                      className='form-control'
                      id='workStartYear'
                      name='workStartYear'
                      required
                      aria-label='work StartYear'
                      value={value.WorkStartYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-3 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Work End Year</label>
                    <input      
                      type='date'               
                      className='form-control'
                      id='workEndYear'
                      name='workEndYear'
                      aria-label='work endYear'
                      value={value.WorkEndYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-1 px-2'>
                  <div className="mb-3">
                    <label className='form-label'>Is Present</label>
                    <div className="form-check">
                      <input
                        className='form-check-input'
                        width={"10px"}
                        type='checkbox'
                        id='isPresent'
                        aria-label='Is Present'
                        style={{ width: '25px', height: '25px' }} 
                        value={value.WorkEndPresent}
                        onChange={handleChange}
                      />
                     
                    </div>
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Years of Experience</label>
                    <input
                      type='text'
                      className='form-control'
                      id='yearExperience'
                      name='yearExperience'
                      required
                      aria-label='Years of Experience'
                      disabled
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>ATI Start Year <span className='text-danger'>*</span></label>
                    <input      
                      type='date'               
                      className='form-control'
                      id='atiStartYear'
                      name='atiStartYear'
                      required
                      aria-label='ati StartYear'
                      value={value.ATIStartYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-3 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>ATI End Year</label>
                    <input      
                      type='date'               
                      className='form-control'
                      id='atiEndYear'
                      name='atiEndYear'
                      aria-label='ati endYear  '
                      placeholder='' 
                      value={value.ATIEndYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-1 px-2'>
                  <div className="mb-3">
                    <label className='form-label'>Is Present</label>
                    <div className="form-check">
                      <input
                        className='form-check-input'
                        width={"10px"}
                        type='checkbox'
                        id='atiIsPresent'
                        aria-label='Is Present'
                        style={{ width: '25px', height: '25px' }} 
                      />
                     
                    </div>
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Years with Employer</label>
                    <input
                      type='text'
                      className='form-control'
                      id='yearEmployer'
                      name='yearEmployer'
                      required
                      aria-label='Years with Employer'
                      disabled
                    />
                  </div>
                </div>
                {/* <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Client Name <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='clientName'
                      name='clientName'
                      required
                      aria-label='Client Name'
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>RFP Name <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='RFPName'
                      name='RFPName'
                      required
                      aria-label='RFP Name'
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>RFP Number <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='RFPNumber'
                      name='RFPNumber'
                      required
                      aria-label='RFP Number'
                    />
                  </div>
                </div>
                <div className='col-md-4 px-2'>
                  <div className='mb-3'>
                    <label className='form-label'>Upload Image <span className='text-danger'>*</span></label>
                    <input
                      type='file'
                      className='form-control'
                      id='image'
                      name='image'
                      accept='image/*' 
                    />
                  </div>
                </div> */}
              </div>          
            </div>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mt-2 color-grey'>Projects</h3>
            <a type='button' className='btn btn-primary btn-user' data-toggle="modal" data-target="#addProjectModal" onClick={handleShow}>Add Project</a>
          </div>         
          <div className='panel panel-default'>
            <input className='filter'
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearch}
            /> 
          <DataTable
              columns={columns}
              data={filteredProjectByEmployees}
              // progressPending={loading}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </form>
    </div>

    {/*Add Project */}
    <div className={`modal fade ${showModal ? 'show': ''}`} style={{display:showModal ? 'block': 'none'}} id="addProjectModal" role="dialog" aria-labelledby="addProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
            <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
          </div>
          <div className="modal-body">
            <div className='row'>           
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Title and Location (city and state) <span className='text-danger'>*</span></label>
                  <input
                    className='form-control'
                    type='text'
                    id='proejctList_TitleandLocation'
                    name='TitleandLocation'
                    required
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Role <span className='text-danger'>*</span></label>
                  <input className='form-control'
                    type='text'
                    id='proejctList_role'
                    name='Role'
                  />
                </div>
              </div>     
              <div className='col-md-4 px-0'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Check if project performed with current firm</label>
                  <div className="form-check">
                      <input
                        className='form-check-input'
                        width={"10px"}
                        type='checkbox'
                        id='proejctList_checked'                       
                        style={{ width: '25px', height: '25px' }} 
                      />                   
                    </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Professional Services Year Completed<span className='text-danger'>*</span></label>
                  <input className='form-control'
                    type='text'
                    id='proejctList_professionalService'
                    name = 'ProfessionalService'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Ongoing (Age PS)</label>
                  <div className='form-check'>
                    <input 
                      className='form-check-input'
                      width={"10px"}
                      type='checkbox'
                      id='proejctList_ongoingPS'
                      style={{ width: '25px', height: '25px' }} 
                    />
                  </div>
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>N/A (Age PS)</label>
                  <div className='form-check'>
                    <input 
                      className='form-check-input'
                      width={"10px"}
                      type='checkbox'
                      id='proejctList_naPS'
                      style={{ width: '25px', height: '25px' }} 
                    />
                  </div>
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Age PS</label>
                  <input className='form-control'
                    type='text'
                    id='proejctList_agePS'
                    name = 'AgePS'
                    disabled
                  />
                </div>
              </div>  
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Construction Year Completed<span className='text-danger'>*</span></label>
                  <input className='form-control'
                    type='text'
                    id='proejctList_construction'
                    name='Construction'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Ongoing (Age CS)</label>
                  <div className='form-check'>
                    <input className='form-check-input'
                     width={"10px"}
                     type='checkbox'
                     id='proejctList_ongoingCS'
                     style={{ width: '25px', height: '25px' }} 
                    />                   
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>N/A (Age CS)</label>
                  <div className='form-check'>
                    <input className='form-check-input'
                      width={"10px"}
                      type='checkbox'
                      id='proejctList_naCS'
                      style={{ width: '25px', height: '25px' }} 
                    />                   
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Age CS</label>
                  <input className='form-control'
                  type='text'
                  id='proejctList_ageCS'
                  disabled
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Project Value</label>
                  <input className='form-control'
                    type='number'
                    id='proejctList_ProjectValue'
                  />
                </div>
              </div>
              <div className='col-md-12'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Description and Specific Role <span className='text-danger'>*</span></label>
                  <textarea className='form-control'
                    id='proejctList_description'
                    rows={4}
                    style={{resize:"none"}}
                  />              
                </div>
              </div>   
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 1</label>
                  <input className='form-control'
                    id='proejctList_Keyword1'
                    type='text'
                    name='Keyword1'
                  />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 2</label>
                  <input className='form-control'
                    id='proejctList_Keyword2'
                    type='text'
                    name='Keyword2'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 3</label>
                  <input className='form-control'
                    id='proejctList_Keyword3'
                    type='text'
                    name='Keyword3'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 4</label>
                  <input className='form-control'
                    id='proejctList_Keyword4'
                    type='text'
                    name='Keyword4'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 5</label>
                  <input className='form-control'
                    id='proejctList_Keyword5'
                    type='text'
                    name='Keyword5'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 6</label>
                  <input className='form-control'
                    id='proejctList_Keyword6'
                    type='text'
                    name='Keyword6'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 7</label>
                  <input className='form-control'
                    id='proejctList_Keyword7'
                    type='text'
                    name='Keyword7'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 8</label>
                  <input className='form-control'
                    id='proejctList_Keyword8'
                    type='text'
                    name='Keyword8'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 9</label>
                  <input className='form-control'
                    id='proejctList_Keyword9'
                    type='text'
                    name='Keyword9'
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Keyword 10</label>
                  <input className='form-control'
                    id='proejctList_Keyword10'
                    type='text'
                    name='Keyword10'
                  />
                </div>
              </div>  
            </div>            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleHide}>Close</button>
            <button type="button" className="btn btn-primary bg-purple">Save </button>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default AddEmployee

