import React, { useState } from "react";
import Logo from "../assets/images/Logo Text.png";
import "../assets/css/RegisterForm.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginForm = () =>{
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const history = useNavigate();

  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }
  const loginHandler = async (e) => {
    e.preventDefault();
    
    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append('email', email);
    formData.append('password', password);

    //send data to server
    await axios.post('http://localhost:8080 /api/auth/login', formData)
    .then((response) => {

        //set token on localStorage
        localStorage.setItem('token', response.data.token);

        //redirect to dashboard
        history('/dashboard');
    })
    .catch((error) => {

        //assign error to state "validation"
        setValidation(error.response.data);
    })
};

  return (
    <div class="">
      <div class="mask py-5 d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Login</h2>
                  <form>
                    <div class="form-outline mb-4">
                      <input type="email" id="form3Example3cg" class="form-control form-control-lg" value={email} onChange={onChangeEmail} />
                      <label class="form-label" for="form3Example3cg">Your Email</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="form3Example4cg" class="form-control form-control-lg" value={password} onChange={onChangePassword} />
                      <label class="form-label" for="form3Example4cg">Password</label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <Link to="/kelas-saya" className="text-decoration-none">
                        <button type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                            Login
                        </button>
                      </Link>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">Don't Have an Account? <Link to="/sign-up"
                        class="fw-bold text-body"><u>Regist here</u></Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
