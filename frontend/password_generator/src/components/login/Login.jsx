import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie';
import { baseURL } from '../../utilis/baseUrl';
import { login } from '../../redux-toolkit/userSlice';

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

function Login() {
    const  [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('');
    const dispatch = useDispatch('')

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values) => {
            const response =  await fetch(`${baseURL}/login`,  {
              method: 'POST',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  'email': values.email,
                  'password': values.password
              })
          });
    
          const content = await response.json();
          console.log(content)
          if (response.status === 200){
            const decode_token = jwt(content.access)
    
            const ACCESS_TOKEN_LIFETIME = 1; // hour
            const accessTokenExpires = new Date(Date.now() + ACCESS_TOKEN_LIFETIME * 60 * 60 * 1000);
    
            Cookies.set('access_token', content.access, { expires: accessTokenExpires});
            Cookies.set('refresh_token', content.refresh, { expires: 90});
    
            dispatch(login(decode_token));
          }
          else{
            setMessage(content.detail)
          }
        },
    });

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="password generator"
            />
          </div>
          <div className="col-md-8 col-lg-8 col-xl-4 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center">
                <h2 className="lead fw-normal mb-0 me-3">Log In</h2>
                
              </div>

              <div className="divider d-flex align-items-center my-4">
              </div>

             
              <p className='text-danger'>{message}</p>
              <div className="form-outline mb-4">
                <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FormControl>
              </div>

              <div className="form-outline mb-3">
                <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
              </div>

              

              <div className="text-center text-lg-center mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <Link to="/sign_up"  className="link-danger">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </section>
      
  )
}

export default Login
