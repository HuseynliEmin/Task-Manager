import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { Form, ErrorMessage, Field, Formik } from 'formik'
import { registerValidationSchema } from '../validationSchema/validationSchema '

const Register = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  //registration form
  
  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === values.email)

    if (userExists) {
      alert("This email is already registered!")
      return
    }

    const newUser = { sureName: values.sureName, lastName: values.lastName, email: values.email, password: values.password }

    users.push(newUser)

    localStorage.setItem("users", JSON.stringify(users));


    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))


    navigate("/")
  }

  return (
    <div className="container mt-5 w-50">
      <h2 className='text-primary fs-2'>Register</h2>

      <Formik
        initialValues={{ sureName: "", lastName: "", email: "", password: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label className="form-label">Surename</label>
            <Field type="text" name="sureName" className="form-control" />
            <ErrorMessage name="sureName" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label">Lastname</label>
            <Field type="text" name="lastName" className="form-control" />
            <ErrorMessage name="lastName" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register