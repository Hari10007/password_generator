import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../utilis/useAxios';
import { FormHelperText } from '@mui/material';
import { baseURL } from '../../utilis/baseUrl';




const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.lazy((value) =>
        value ? Yup.string().required('Password is required') : Yup.string()
    ),
    confirm_password: Yup.lazy((value) =>
        value ? Yup.string().required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match') : Yup.string()
    )
  });

function SignUp() {
    const  [showPassword, setShowPassword] = useState(false)
    const  [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const api = useAxios();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
  };
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
              const formData = new FormData();
              formData.append('email', values.email);
              formData.append('password', values.password);
              formData.append('password2', values.confirm_password);
              

              const response = await fetch(`${baseURL}/register`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
              });

              if (response.status === 201) {
                  navigate('/login');
              }
          } 
          catch (error) {
              console.log(error.response.data.error)
          }
      }
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
                <h2 className="lead fw-normal mb-0 me-3">Sign Up</h2>
                
              </div>

              <div className="divider d-flex align-items-center my-4">
              </div>

             
            
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

              <div className="form-outline mb-3">
                <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                    <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                      helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {formik.touched.confirm_password && formik.errors.confirm_password && (
                    <h4>{formik.errors.confirm_password}</h4>
                  )}
              </div>


              

              <div className="text-center text-lg-center mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account? <Link to="/login"  className="link-danger">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </section>
      
  )
}

export default SignUp
