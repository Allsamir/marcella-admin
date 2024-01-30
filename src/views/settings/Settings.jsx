/* eslint-disable prettier/prettier */
import { cilSave, cilSettings } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  
  CRow,
} from "@coreui/react";

import ManageFooter from "../admins/footer/ManageFooter";
import ManageRules from "../admins/rules/manage-rules/ManageRules";

const Settings = () => {
  

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilSettings} className="nav-icon" /> <strong>Settings</strong>
            </CCardHeader>
            <CCardBody>
              {/* manage footer text */}
            <ManageFooter />
            {/* rules */}
      <ManageRules />
              {/* <CForm onSubmit={handleSubmit(onSubmit)}>
                <CRow className="g-3">
                  <CCol xs={12}>
                    <CFormInput
                      type="email"
                      id="emailInputField"
                      disabled
                      label="Email"
                      defaultValue={email}
                      placeholder="Enter email address"
                      aria-describedby="emailInputField"
                    />
                  </CCol>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="oldPassword">Old Password</CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type={isShowOldPassword ? "text" : "password"}
                        id="oldPassword"
                        placeholder="Enter old password"
                        aria-describedby="oldPassword"
                        className="border-end-0"
                        {...register("oldPassword", {
                          required: "Old password is required",
                        })}
                      />
                      <CInputGroupText
                        className="border-start-0 bg-transparent"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsShowOldPassword((prevState) => !prevState)}
                      >
                        {isShowOldPassword ? <BsEye /> : <BsEyeSlash />}
                      </CInputGroupText>
                    </CInputGroup>
                    {errors.oldPassword && (
                      <div className="text-danger form-error">{errors.oldPassword.message}</div>
                    )}
                  </CCol>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type={isShowNewPassword ? "text" : "password"}
                        id="newPassword"
                        placeholder="Enter new password"
                        aria-describedby="newPassword"
                        className="border-end-0"
                        {...register("newPassword", {
                          required: "New password is required",
                        })}
                      />
                      <CInputGroupText
                        className="border-start-0 bg-transparent"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsShowNewPassword((prevState) => !prevState)}
                      >
                        {isShowNewPassword ? <BsEye /> : <BsEyeSlash />}
                      </CInputGroupText>
                    </CInputGroup>
                    {errors.newPassword?.type === "required" && (
                      <div className="text-danger form-error">{errors.newPassword.message}</div>
                    )}
                  </CCol>
                </CRow>
                <div className="text-end">
                  <CButton
                    disabled={isLoading}
                    type="submit"
                    color="success"
                    className="mt-3 text-white"
                  >
                    <CIcon icon={cilSave} className="me-2" />
                    {isLoading ? "Loading..." : "Save Changes"}
                  </CButton>
                </div>
              </CForm> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  );
};

export default Settings;
