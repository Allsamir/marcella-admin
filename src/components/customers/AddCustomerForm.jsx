import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddCustomerForm = ({ data, onSubmit, customersGroup, isLoading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  const customerGroupOptions = customersGroup?.map((c) => {
    return { value: c.groupName, label: c.groupName };
  });

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="manufacturerNameInputField"
            label="Name"
            placeholder="Enter Manufacturer Name"
            // defaultValue={data?.name}
            aria-describedby="manufacturerNameInputField"
            {...register("name", { required: true })}
          />
        </CCol>
        <CCol xs={12}>
          <span className="rounded  bg-primary text-white px-2">{data && data.groupName}</span>
          <CFormSelect
            style={{ width: "150px" }}
            aria-label="Product Select Selection Field"
            options={customerGroupOptions}
            {...register("group", { required: true })}
          />
        </CCol>
      </CRow>
      <div className="text-end">
        <CancelButton />
        <CButton disabled={isLoading} type="submit" color="primary" className="mt-3">
          <CIcon icon={cilPlus} className="me-2" />
          {isLoading ? "Loading.." : "Update"}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddCustomerForm;

AddCustomerForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
