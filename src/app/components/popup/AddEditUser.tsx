import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from '../constants/loader/Loader';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createUser } from '../../Reducers/postDataSlice';
import Swal from 'sweetalert2';

interface FormValues {
    firstName: string;
    userName: string;
    password: string;
    confirmPassword: string
}
const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("Full name is required."),
    userName: yup
        .string()
        .required("User Name is required.")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid e-mail"),

    password: yup
        .string()
        .required("Password is required.")
        .min(6, "Password should be at least 6 characters.")
        .max(16, "Password should not exceed 16 characters."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match.")
        .required("Confirm Password is required."),

});

const AddEditUser = () => {
    const [loading, setLoading] = useState(false);
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
        const { firstName, userName, password, confirmPassword } = values;
        const body: any = {
            FirstName: firstName,
            UserName: userName,
            UserPassword: password,
            UserRoleId: 10,
        }
        setLoading(true);
        dispatch(createUser(body))
            .unwrap()
            .then((res: any) => {
                const message = res.data.Response;
                reset();
                if (res) {
                    Swal.fire({
                        icon: "success",
                        title: message,
                    })
                }
            }).
            catch((error: any) => {
                console.log("error response",error)
                Swal.fire({
                    icon: "error",
                    title: "Error occurred",
                    text: error
                })
            })
            .finally(() => {
                setLoading(false);
            })

    }
    return (
        <>
            {loading ? <Loader /> : ""}
            <div className="modal fade " id="addUserModal" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="addUserLabel">Add User</h5>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=> reset()}>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">                               
                                <div className='col-md-12'>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>Name</label>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='Name'
                                            {...register("firstName")}
                                        />
                                        {errors.firstName && (
                                            <p className='error error-text'>
                                                {errors.firstName?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>Username <span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='someone@nowhere.com'
                                            {...register("userName")}
                                        />
                                        {errors.userName && (
                                            <p className='error error-text'>
                                                {errors.userName?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>New Password <span className='text-danger'>*</span></label>
                                        <input type='password'
                                            className='form-control'
                                            placeholder='Password'
                                            {...register("password")}
                                        />
                                        {errors.password && (
                                            <p className='error error-text'>
                                                {errors.password?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='mb-2'>
                                        <label className='form-label fw-bold fs-12'>Confirm Password <span className='text-danger'>*</span></label>
                                        <input type='password'
                                            className='form-control'
                                            placeholder='re-enter Password'
                                            {...register("confirmPassword")}
                                        />
                                        {errors.confirmPassword && (
                                            <p className='error error-text'>
                                                {errors.confirmPassword?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center pt-3">
                                    <button type="submit"
                                        className="btn btn-primary btn-change-pwd bg-purple">
                                        Save
                                    </button>

                                    <button type="button"
                                        className="btn btn-secondary btn-change-pwd"
                                        data-bs-dismiss="modal" onClick={()=> reset()}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditUser


