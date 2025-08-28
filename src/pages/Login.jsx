import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserContext } from '../context/UserContext'
import { loginValidationSchema } from '../validationSchema/validationSchema ';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()


  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!foundUser) {
      alert("Email or password is incorrect!");
      return;
    }
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    navigate("/");

  };

  return (
    <div className="container mt-5 w-50">
      <h2 className='text-primary fs-2'>Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label className='mb-2'>Email:</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className='mb-2'>Password:</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
