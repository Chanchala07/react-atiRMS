import React from 'react'
import './loginPage.css'
import { useEffect, useState } from 'react';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from '../../constants/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {userLogin} from '../../../Reducers/authSlice';

interface FormValues {
  userName: string;
  password: string
}
const schema = yup.object().shape({
  userName: yup
    .string()
    .required("User name is required."),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be at least 6 characters long.")
    .max(16, "The password should be no more than 16 characters"),
})

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
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
    const {userName,password} = values;
    const body: any = {
      userName : userName,
      password: password
    };
    setLoading(true);
    dispatch(userLogin(body)) 
    .unwrap()
    .then((res:any)=> {
      console.log(res,"response")
    })
  }

  return (
    <>
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
                          {...register("userName")}/>
                        <FontAwesomeIcon icon={faEnvelope} className='fa-icon' />

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
                          //name='password'
                          placeholder='Password'
                          {...register("password")} />
                        <FontAwesomeIcon icon={faLock}
                          className='fa-icon ' />

                           {errors.password && (
                           <p className='error error-text'>
                           {errors.password?.message}
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
