import React, {useContext} from 'react'
import './Login.scss'

import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

// Context 
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Login = (props) => {

  const {setUser} = useContext(AuthContext)
  const {setBalance} = useContext(ProfileContext)

  return (
    <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={ (values, {setSubmitting}) => {
          axios.post('/api/login', values).then(res => {
            setUser(res.data[0])
            setBalance(res.data[1].balance)
            props.history.push(`/user/${res.data[0].id}`)
          })
      }}

      validationSchema = { Yup.object().shape({
        email: Yup.string()
        .email()
        .required('Required'),
        password: Yup.string()
        .required('Required')
        .min(8, "Password is too short. Should be 8 character minimum")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
      })}
      >

        {props => {
            const {
              values, 
              touched, 
              errors, 
              isSubmitting, 
              handleChange, 
              handleBlur, 
              handleSubmit
          } = props

          return (

            <form className="LoginForm" onSubmit={handleSubmit}>

              <input 
                type='text' 
                placeholder="Email" 
                value={values.email} 
                onChange={handleChange} 
                name='email' 
                onBlur={handleBlur}
                className={errors.email && touched.email && 'error'} 
              />
              {errors.email && touched.email ? (
                <div className="input-feedback">{errors.email}</div>
              ) : <div className="no-error"></div>}
    
              <input 
                type='password' 
                placeholder="Password" 
                value={values.password} 
                onChange={handleChange} 
                name='password'
                onBlur={handleBlur}
                className={errors.password && touched.password && 'error'}  
              />
              {errors.password && touched.password ? (
                <div className="input-feedback">{errors.password}</div>
              ) : <div className="no-error"></div>}
              
              <section className="SubmitLogin">
      
                <button type="submit" disabled={isSubmitting}>Login</button>
              </section>

            </form>
          )
        }}
      </Formik>
    )
  }

export default withRouter(Login)