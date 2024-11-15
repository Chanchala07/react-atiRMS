import { useState } from 'react';
import './addEmployee.css';

const AddEmployee = () => {
  const [showModal, setShowModal ] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);
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
              <div className='row'> {/* Use row to wrap the input fields */}
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
                      aria-label='Certifications and Licenses  '
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
                      aria-label='Other Professional Qualifications  '
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
                      aria-label='work StartYear  '
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
                      aria-label='work endYear  '
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
                      aria-label='ati StartYear  '
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
                <div className='col-md-4 px-2'>
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
                </div>
              </div>          
            </div>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className=''>Projects</h3>
            <a type='button' className='btn btn-primary btn-user' data-toggle="modal" data-target="#addProjectModal" onClick={handleShow}>Add Project</a>
          </div>         
          <div className='panel panel-default'></div>
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

