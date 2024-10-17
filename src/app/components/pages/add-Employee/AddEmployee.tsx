import './addEmployee.css';

const AddEmployee = () => {

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
          <div className='heading'></div>
          <h3 className=''>Projects</h3>
          <div className='panel panel-default'></div>
        </div>
      </form>
    </div>


  </>
)
}

export default AddEmployee

