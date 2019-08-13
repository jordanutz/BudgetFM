import React, {useContext} from 'react'
import '../Login/Login.scss'

import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

// Context 
import {AuthContext} from '../../Context/AuthContext'

const Register = (props) => {

  const {setUser} = useContext(AuthContext)

  return (

    <Formik
          initialValues={{name: '', email: '', password: ''}}
          onSubmit={ (values, {setSubmitting}) => {
            axios.post('/api/register', values).then(res => {
              setUser(res.data)
              props.history.push(`/user/${res.data.id}`)
            })
        }}

    validationSchema = { Yup.object().shape({
      name: Yup.string()
      .required('Required'),
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
              placeholder="Full Name" 
              value={values.name} 
              onChange={handleChange} 
              name='name' 
              onBlur={handleBlur}
              className={errors.name && touched.name && 'error'} 
            />
            {errors.name && touched.name ? (
              <div className="input-feedback">{errors.name}</div>
            ) : <div className="no-error"></div>}

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
            
            <section id="RegisterButton" className="SubmitLogin">
              <button type="submit" disabled={isSubmitting}>Register</button>
            </section>

          </form>
        )
      }}
    </Formik> 
  )
}

export default withRouter(Register)