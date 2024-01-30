/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddCustomerGroupsForm = ({ onSubmit, data, addLoading, updateLoading }) => {
  const [selectedCheckValue, setCheckedValue] = useState(data?.discountType);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setCheckedValue(data?.discountType);
  }, [data?.discountType]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="CustomerGroupNameInputField"
            label="Customer group name"
            placeholder="Enter Customer Group Name"
            defaultValue={data?.groupName}
            aria-describedby="CustomerGroupNameInputField"
            {...register("groupName", { required: !data ? true : false })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="customerGroupDescriptionTextareaField"
            label="Description"
            placeholder="Enter Customer Group Description"
            defaultValue={data?.description}
            aria-describedby="customerGroupDescriptionTextareaField"
            rows="3"
            {...register("description", { required: !data ? true : false })}
          ></CFormTextarea>
        </CCol>
        <CCol xs={12}>
          <label className="mb-2">Discount Type</label>
          <br />
          <CFormCheck
            inline
            type="radio"
            checked={"percentage" === selectedCheckValue}
            name="discountTypeOptions"
            id="discountTypePercentage"
            value="percentage"
            label="Percentage"
            {...register("discountType", { required: !data ? true : false })}
            onChange={(e) => setCheckedValue(e.target.value)}
          />
          <CFormCheck
            inline
            type="radio"
            checked={"fixedAmount" === selectedCheckValue}
            name="discountTypeOptions"
            id="discountTypeFixedAmount"
            value="fixedAmount"
            label="Fixed Amount"
            {...register("discountType", { required: !data ? true : false })}
            onChange={(e) => setCheckedValue(e.target.value)}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            type="number"
            id="discountInputField"
            label="Discount amount"
            placeholder="Enter Discount"
            defaultValue={data?.discount}
            aria-describedby="discountInputField"
            {...register("discount", { required: !data ? true : false })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            type="number"
            id="discountInputField"
            label="Total price for get discount"
            placeholder="Enter Discount"
            defaultValue={data?.totalAmount}
            aria-describedby="discountInputField"
            {...register("totalAmount", { required: !data ? true : false })}
          />
        </CCol>
      </CRow>

      <div className="text-end">
        <CancelButton />
        <CButton
          disabled={addLoading || updateLoading}
          type="submit"
          color="primary"
          className="mt-3"
        >
          <CIcon icon={cilPlus} className="me-2" />
          {addLoading || updateLoading ? "Loading..." : data ? "Update" : "Save"}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddCustomerGroupsForm;

AddCustomerGroupsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
