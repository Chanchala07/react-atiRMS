import React, { useEffect, useState } from 'react'
import Loader from '../constants/loader/Loader';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectDataById } from '../../Reducers/getDataListSlice';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addProject } from '../../Reducers/postDataSlice';
import Swal from 'sweetalert2';

interface FormValues {
  id?: number;
  employeeId: number;
  titleandLocation: string;
  role: string;
  projectChecked?: boolean;
  professionalService: string;
  ongoingCheckedPS?: boolean;
  nACheckedPS?: boolean;
  agePS?: number;
  construction: string;
  ongoingCheckedCS?: boolean;
  nACheckedCS?: boolean;
  ageCS?: number;
  projectValue?: string;
  projectPosition?: number;
  description: string;
  keyword1?: string;
  keyword2?: string;
  keyword3?: string;
  keyword4?: string;
  keyword5?: string;
  keyword6?: string;
  keyword7?: string;
  keyword8?: string;
  keyword9?: string;
  keyword10?: string;
}
const schema = yup.object().shape({
  employeeId: yup
    .number()
    .required("Employee Id is required"),
  titleandLocation: yup
    .string()
    .required("Title and Location (city and state) is required."),
  role: yup
    .string()
    .required("Role is required."),
  professionalService: yup
    .string()
    .required("Professional Services Year is required"),
  construction: yup
    .string()
    .required("Construction Year is required."),
  description: yup
    .string()
    .required("Description and Specific Role is required.")
});

const AddEditProject = ({ projectId }: { projectId: number | null }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),

  });
  const onSubmit = (values: FormValues) => {
    setLoading(true);
    console.log("form values for project", values);
    const data = {
      ...values,
      EmployeeId: employeeId,
      Id: projectId
    };
    console.log(" form data before api call", data)
    dispatch(addProject(data))
      .then((res: any) => {
        console.log("res project", res);
        Swal.fire({
          icon: "success",
          title: "Project updated successfully.",
        })
      })
      .catch((error: any) => {
        console.log("Error response", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error in project  saved"
        })
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          setLoading(true);
          const response = await dispatch(projectDataById(projectId));
          console.log(response, "response of project popup");
          setValue("employeeId", response.payload.EmployeeId);
          setValue("titleandLocation", response.payload.TitleandLocation);
          setValue("role", response.payload.Role);
          setValue("projectChecked", response.payload.Checked);
          setValue("professionalService", response.payload.ProfessionalService);
          setValue("ongoingCheckedPS", response.payload.OngoingCheckedPS);
          setValue("nACheckedPS", response.payload.NACheckedPS);
          setValue("agePS", response.payload.AgePS);
          setValue("construction", response.payload.Construction);
          setValue("ongoingCheckedCS", response.payload.OngoingCheckedCS);
          setValue("nACheckedCS", response.payload.NACheckedCS);
          setValue("ageCS", response.payload.AgeCS);
          setValue("projectValue", response.payload.ProjectValue);
          setValue("description", response.payload.Description);
          setValue("keyword1", response.payload.Keyword1);
          setValue("keyword2", response.payload.Keyword2);
          setValue("keyword3", response.payload.Keyword3);
          setValue("keyword4", response.payload.Keyword4);
          setValue("keyword5", response.payload.Keyword5);
          setValue("keyword6", response.payload.Keyword6);
          setValue("keyword7", response.payload.Keyword7);
          setValue("keyword8", response.payload.Keyword8);
          setValue("keyword9", response.payload.Keyword9);
          setValue("keyword10", response.payload.Keyword10);
          setLoading(false);
        }
        catch (error) {
          console.log(error, "error")
          setLoading(false);
        }
      }
    }
    fetchData()
  }, [projectId]);
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
                  <input
                    className='form-control hidden'
                    type='number'
                    {...register("employeeId")}
                  />
                  <div className='col-md-4'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Title and Location (city and state) <span className='text-danger'>*</span></label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("titleandLocation")}
                      />
                      {errors.titleandLocation && (
                        <p className='error error-text'>
                          {errors.titleandLocation?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Role <span className='text-danger'>*</span></label>
                      <input className='form-control'
                        type='text'
                        {...register("role")}
                      />
                      {errors.role && (
                        <p className='error error-text'>
                          {errors.role?.message}
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
                          {...register("projectChecked")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Professional Services Year Completed<span className='text-danger'>*</span></label>
                      <input className='form-control'
                        type='text'
                        {...register("professionalService")}
                      />
                      {errors.professionalService && (
                        <p className='error error-text'>
                          {errors.professionalService?.message}
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
                          {...register("ongoingCheckedPS")}
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
                          {...register("nACheckedPS")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Age PS</label>
                      <input className='form-control'
                        type='text'
                        {...register("agePS")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Construction Year Completed<span className='text-danger'>*</span></label>
                      <input className='form-control'
                        type='text'
                        {...register("construction")}
                      />
                      {errors.construction && (
                        <p className='error error-text'>
                          {errors.construction?.message}
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
                          {...register("ongoingCheckedCS")}
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
                          {...register("nACheckedCS")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Age CS</label>
                      <input className='form-control'
                        type='text'
                        {...register("ageCS")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Project Value</label>
                      <input className='form-control'
                        type='string'
                        {...register("projectValue")}
                      />
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Description and Specific Role <span className='text-danger'>*</span></label>
                      <textarea className='form-control'
                        rows={4}
                        style={{ resize: "none" }}
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className='error error-text'>
                          {errors.description?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 1</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword1")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 2</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword2")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 3</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword3")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 4</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword4")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 5</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword5")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 6</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword6")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 7</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword7")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 8</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword8")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 9</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword9")}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='mb-3'>
                      <label className='form-label fw-bold fs-12'>Keyword 10</label>
                      <input className='form-control'
                        type='text'
                        {...register("keyword10")}
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
