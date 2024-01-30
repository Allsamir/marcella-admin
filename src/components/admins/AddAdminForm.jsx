import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import CancelButton from "src/ui/button/CancelButton";
import Select from "react-select";

const AddAdminForm = ({ data, isLoading, onSubmit, setRole }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const location = useLocation().search;

  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
  ];

  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    // Simulating fetching the default value from the server
    const defaultValueFromServer = data?.role;
    // Find the option object that matches the defaultValueFromServer
    const selectedOption = roleOptions.find((option) => option.value === defaultValueFromServer);
    setDefaultValue(selectedOption);
  }, [data]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CFormLabel htmlFor="oldPassword">
          Name {!data && <span className="text-danger">*</span>}
        </CFormLabel>

        <CCol xs={12}>
          <CFormInput
            type="text"
            id="firstNameInputField"
            placeholder="Enter Name"
            defaultValue={data?.name}
            aria-describedby="adminName"
            {...register("name", { required: data ? false : true })}
          />

          {errors?.name && <div className="text-danger form-error">Name is required</div>}
        </CCol>
        <CCol xs={12}>
          <CFormLabel htmlFor="oldPassword">
            Email {!data && <span className="text-danger">*</span>}
          </CFormLabel>

          <CFormInput
            type="text"
            id="emailInputField"
            placeholder="Enter Email"
            disabled={data ? true : false}
            defaultValue={data?.email}
            aria-describedby="emailInputField"
            {...register("email", { required: data ? false : true })}
          />

          {errors?.email && <div className="text-danger form-error">Email is required </div>}
        </CCol>

        {data && (
          <CCol xs={12}>
            <CFormLabel htmlFor="Password">Enter old password</CFormLabel>
            <CInputGroup>
              <CFormInput
                type={isShowOldPassword ? "text" : "password"}
                id="Password"
                placeholder="Enter old password"
                aria-describedby="Password"
                className="border-end-0"
                {...register("oldPassword", { required: false })}
              />
              <CInputGroupText
                className="border-start-0 bg-transparent"
                style={{ cursor: "pointer" }}
                onClick={() => setIsShowOldPassword((prevState) => !prevState)}
              >
                {isShowOldPassword ? <BsEye /> : <BsEyeSlash />}
              </CInputGroupText>
            </CInputGroup>
          </CCol>
        )}

        <CCol xs={12}>
          <CFormLabel htmlFor="Password">
            {data ? "Enter new password" : "Password"}{" "}
            {!data && <span className="text-danger">*</span>}
          </CFormLabel>
          <CInputGroup>
            <CFormInput
              type={isShowNewPassword ? "text" : "password"}
              id="Password"
              placeholder="Enter password"
              aria-describedby="Password"
              className="border-end-0"
              {...register("password", {
                required: data ? false : true,
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
          {errors?.password && <div className="text-danger form-error">Password is required</div>}
        </CCol>
      </CRow>

      {!location.includes("superAdmin") && defaultValue && (
        <CCol xs={12}>
          <label className="mb-2">
            Role <span className="text-danger">*</span>
          </label>
          <Select
            aria-label="Selection Field"
            defaultValue={defaultValue}
            options={roleOptions}
            onChange={(e) => setRole(e.value)}
            name="role"
          />
        </CCol>
      )}
      {!data && (
        <CCol xs={12}>
          <label className="mb-2">
            Role <span className="text-danger">*</span>{" "}
          </label>
          <Select
            aria-label="Selection Field"
            defaultValue={defaultValue}
            options={roleOptions}
            // {...register("role", {
            //   required: data ? false : true,
            // })}
            onChange={(e) => setRole(e.value)}
            name="role"
          />
        </CCol>
      )}

      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="primary" className="mt-3">
          <CIcon icon={cilPlus} className="me-2" />
          {isLoading ? "Loading.." : "Save"}
        </CButton>
      </div>
    </CForm>
  );
};

export default memo(AddAdminForm);

AddAdminForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
