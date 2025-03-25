import React, { useEffect, useState } from 'react'
import Loader from '../constants/loader/Loader';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectDataById } from '../../Reducers/getDataListSlice';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

interface FormValues {
  TitleandLocation: string;
  Role: string;
  ProjectChecked?: boolean;
  ProfessionalService: string;
  OngoingCheckedPS?: boolean;
  NACheckedPS?: boolean;
  AgePS?: number;
  Construction: string;
  OngoingCheckedCS?: boolean;
  NACheckedCS?: boolean;
  AgeCS?: number;
  ProjectValue?: string;
  Description: string;
  Keyword1?: string;
  Keyword2?: string;
  Keyword3?: string;
  Keyword4?: string;
  Keyword5?: string;
  Keyword6?: string;
  Keyword7?: string;
  Keyword8?: string;
  Keyword9?: string;
  Keyword10?: string;
}
const schema = yup.object().shape({
  TitleandLocation: yup
    .string()
    .required("Title and Location (city and state) is required."),
  Role: yup
    .string()
    .required("Role is required."),
  ProfessionalService: yup
    .string()
    .required("Professional Services Year is required"),
  Construction: yup
    .string()
    .required("Construction Year is required."),
  Description: yup
    .string()
    .required("Description and Specific Role is required.")
});

const AddEditProject = ({projectId}:{projectId:number | null}) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),

  });
  const onSubmit = (values: FormValues) => {

  }

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          setLoading(true);
          const response = await dispatch(projectDataById(projectId));
          console.log(response, "response of project popup");
          setLoading(false);
        }
        catch (error) {
          console.log(error,"error")
        }
      }
    }
    fetchData()
  },[projectId]);
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
              <button type="button"
                className="close btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => reset()}>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Title and Location (city and state) <span className='text-danger'>*</span></label>
                      <input
                        className='form-control'
                        type='text'
                       
                        {...register("TitleandLocation")}
                      />
                      {errors.TitleandLocation && (
                        <p className='error error-text'>
                          {errors.TitleandLocation?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Role <span className='text-danger'>*</span></label>
                      <input className='form-control'
                        type='text'
                        name='Role'
                      />
                      {errors.Role && (
                        <p className='error error-text'>
                          {errors.Role?.message}
                        </p>
                      )}
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
                        name='ProfessionalService'
                      />
                      {errors.ProfessionalService && (
                        <p className='error error-text'>
                          {errors.ProfessionalService?.message}
                        </p>
                      )}
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
                        name='AgePS'
                        disabled

                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Construction Year Completed<span className='text-danger'>*</span></label>
                      <input className='form-control'
                        type='text'
                        name='Construction'
                      />
                      {errors.Construction && (
                        <p className='error error-text'>
                          {errors.Construction?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Ongoing (Age CS)</label>
                      <div className='form-check'>
                        <input className='form-check-input'
                          width={"10px"}
                          type='checkbox'
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
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Project Value</label>
                      <input className='form-control'
                        type='string'
                      />
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Description and Specific Role <span className='text-danger'>*</span></label>
                      <textarea className='form-control'
                        rows={4}
                        style={{ resize: "none" }}
                        name='Description'
                      />
                      {errors.Description && (
                        <p className='error error-text'>
                          {errors.Description?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 1</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword1'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 2</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword2'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 3</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword3'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 4</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword4'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 5</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword5'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 6</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword6'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 7</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword7'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 8</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword8'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 9</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword9'
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 10</label>
                      <input className='form-control'
                        type='text'
                        name='Keyword10'
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center pt-3">
                  <button type="submit" className="btn btn-primary bg-purple">Save </button>
                  <button type="button" className="btn btn-secondary ml-2" data-bs-dismiss="modal" onClick={() => reset()}>Close</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEditProject
