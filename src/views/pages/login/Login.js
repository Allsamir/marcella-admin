import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLoginMutation } from "src/redux/auth/authApi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState();
  const [login, { isLoading, data: loginData, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let errorMessage = null;
  const onSubmit = (data) => {
    errorMessage = null;
    login(data);
  };

  if (!isLoading && loginData) {
    errorMessage = null;

    navigate("/dashboard");
  }

  if (!isLoading && isError) {
    errorMessage = (
      <p className="text-center text-danger">Authentication Failed</p>
    );
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={4} md={4} xs={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email Address"
                        // autoComplete="username"
                        {...register("email", { required: true })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Password"
                        className="border-end-0"
                        // autoComplete="current-password"
                        {...register("password", { required: true })}
                      />
                      <CInputGroupText
                        className="border-start-0 bg-transparent"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setIsShowPassword((prevState) => !prevState)
                        }
                      >
                        {isShowPassword ? <BsEye /> : <BsEyeSlash />}
                      </CInputGroupText>
                    </CInputGroup>
                    {errorMessage && errorMessage}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading" : " Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
