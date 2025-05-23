import React from 'react'
import './loginPage.css'
import { useEffect, useState } from 'react';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from '../../constants/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userLogin } from '../../../Reducers/authSlice';
import Swal from 'sweetalert2'

interface FormValues {
  userName: string;
  userPassword: string
}
const schema = yup.object().shape({
  userName: yup
    .string()
    .required("User name is required."),
  userPassword: yup
    .string()
    .required("Password is required.")
    .min(6, "The Password must be at least 6 characters long.")
    .max(16, "The password should be no more than 16 characters"),
})

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
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
    const { userName, userPassword } = values;
    const body: any = {
      UserName: userName,
      UserPassword: userPassword,
      lastlogin: new Date().toISOString()
    };
    setLoading(true);
    dispatch(userLogin(body))
      .unwrap()
      .then((res: any) => {
        localStorage.setItem("LoggedInUserId", res.Id);
        localStorage.setItem("UserRoleId", res.UserRoleId);
        localStorage.setItem("FirstName", res.FirstName);
        localStorage.setItem("UserRoleName", res.UserRoleName);

        if (res.UserRoleId === 1) {
          navigate("/home-page/dashboard")
        }
        else if (res.UserRoleId === 10 && res.EmployeeId > 0) {
          navigate(`/home-page/add-employee/${res.EmployeeId}`);
        }
        else {
          navigate('/home-page/add-employee');
        }
        Swal.fire({
          icon: "success",
          title: "Login successfully",
        });
      })
      .catch((error: any) => {
        console.log("Error response:", error);

        // const errorMessage = error.message || "Login";
        Swal.fire({
          icon: "error",
          title: "Login failed.",
          text: "Login failed"
        })
      })
      .finally(() => {
        setLoading(false);
      })

  }

  return (
    <>
      {loading ? <Loader /> : ""}
      <Header />
      <div className='Section'>
        <div className='container'>
          <div className='row'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='col-md-5 col-sm-6 col-xs-12'>
                <div className='login-container rounded'>
                  <div className='panel-body'>
                    <div className='mb-3'>
                      <label className='form-label text-white'>User Name</label>
                      <div className='position-relative'>
                        <input className='form-control'
                          type='text'
                          // name='userName'
                          placeholder='someone@nowhere.com'
                          {...register("userName")} />
                        <FontAwesomeIcon icon={faEnvelope} className='fa-icon'
                        />

                        {errors.userName && (
                          <p className='error error-text'>
                            {errors.userName?.message}
                          </p>
                        )}

                      </div>

                    </div>
                    <div className='mb-3'>
                      <label className='form-label text-white'>Password</label>
                      <div className='position-relative'>
                        <input className='form-control'
                          type='password'
                          placeholder='Password'
                          {...register("userPassword")}
                        />
                        <FontAwesomeIcon icon={faLock}
                          className='fa-icon ' />

                        {errors.userPassword && (
                          <p className='error error-text'>
                            {errors.userPassword?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-check mb-3">
                      <input className='form-check-input' type='checkbox' />
                      <label className='text-white'>Remember Me?</label>
                    </div>

                  </div>
                  <div className='login-btn'>
                    <button type='submit'
                      className='btn btn-primary btn-lg w-100 fs-6'
                      style={{
                        background: "#337ab7",
                        border: '#286090'
                      }}>
                      Login
                    </button>

                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LoginPage
