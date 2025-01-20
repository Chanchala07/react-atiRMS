import React from 'react'
interface  AddEditProjectProps {
  data:any;
  onClose:() => void;
  show: boolean
}
const AddEditProject: React.FC<AddEditProjectProps> = ({ data, onClose, show }) => {
  console.log(data,"project datas")
  if (!show) return null; // Return null if modal is not visible
  return (
<>

    <div className= {`modal fade ${show ? 'show': ''}`}  style={{ display: show ? 'block' : 'none' }}  id="addProjectModal" role="dialog" aria-labelledby="addProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
            <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
            
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
                    value={data.TitleandLocation}
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
                    value={data.Role}
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
                        checked={data.Checked}
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
                    value={data.ProfessionalService}
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
                      checked = {data.OngoingCheckedPS}
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
                      checked = {data.NACheckedPS}
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
                    value={data.AgePS}
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
                    value={data.Construction}
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
                     checked={data.OngoingCheckedCS}
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
                      checked={data.NACheckedCS} 
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
                  value={data.AgeCS}
                  disabled
                  />
                </div>
              </div> 
              <div className='col-md-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold fs-12'>Project Value</label>
                  <input className='form-control'
                    type='string'
                    id='proejctList_ProjectValue'
                    value={data.ProjectValue}
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
                    value={data.Description}
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
                    value={data.Keyword1}
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
                    value={data.Keyword2}
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
                    value={data.Keyword3}
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
                    value={data.Keyword4}
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
                    value={data.Keyword5}
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
                    value={data.Keyword6}
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
                    value={data.Keyword7}
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
                    value={data.Keyword8}
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
                    value={data.Keyword9}
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
                    value={data.Keyword10}
                  />
                </div>
              </div>  
            </div>            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary bg-purple">Save </button>
          </div>
        </div>
      </div>
    </div>
</>
  )
}

export default AddEditProject
