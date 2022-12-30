
import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import {ColorBox} from '../../Context/ColorboxContext';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  let Navigate = useNavigate()
  const {userData,saveUser} = useContext(ColorBox)  ;

  let [user, setUser] = useState({
    email: "",
    password: ""
  })

  function getDataUser(e) {
    console.log(e.target.name);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }

  async function register(e) {
    e.preventDefault();
    if (vaildation()) {
      setisLoading(true)
      let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signin`, user);
      console.log(data);

      if (data.message == "success") {
        localStorage.setItem("token",data.token);
         saveUser();
        setisLoading(false);
         setapiError(null);
        Navigate("/home");
      } else {
        setapiError(data.message)
        setisLoading(false)

      }
    }
  }

  function vaildation() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
      password: Joi
        .string()
        .required()
    });
    let res = schema.validate(user, { abortEarly: false });
    console.log(res);

    if (res.error) {
      setvalidationError(res.error.details)
      return false
    } else {
      return true
    }
  };
  return (
    <>
     <div className="width-form m-auto mt-5  ">

      <div className="container height-form  ">
        <div className="row ">
      
       
          {apiError && <div className='alert alert-danger'>{apiError}</div>}
          <form onSubmit={(e) => register(e)} >

       
            <div className="input-data ">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control my-1"
                onChange={(e) => getDataUser(e)}
                name="email"
              />
            </div>
            <div className={validationError.filter(ele => ele.context.label == "email")[0] ? "text-danger width-danger" : "width-danger"}>
              {validationError.filter(ele => ele.context.label == "email")[0]?.message}

            </div>
            <div className="input-data ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control my-1"
                onChange={(e) => getDataUser(e)}
                name="password"
              />
            </div>
            <div className={validationError.filter(ele => ele.context.label == "password")[0] ? "text-danger width-danger" : "width-danger"}>
              {validationError.filter(ele => ele.context.label == "password")[0]?.message}

            </div>
            <button className="btn login my-1 ">
              {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "signup"}
            </button>
            <div className="clear-fix"></div>
          </form>
        </div>
        </div>
      </div>
    </>
  )
}
