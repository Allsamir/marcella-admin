/* eslint-disable react/prop-types */
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormCheck, CFormInput, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddCouponForm = ({
  onSubmit,
  data,
  addLoading,
  updateLoading,
  setSelectedDate,
  selectedDate,
}) => {
  const [selectedCheckValue, setCheckedValue] = useState(data?.discountType);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    setCheckedValue(data?.discountType);
    setSelectedDate(data?.expireDate);
  }, [data?.discountType]);

  const { register, handleSubmit } = useForm();

  const handleChangeCheck = (e) => {
    setCheckedValue(e.target.value);
  };

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="CouponNameInputField"
            label="Coupon Name"
            placeholder="Enter Coupon Name"
            defaultValue={data?.couponName}
            aria-describedby="CouponNameInputField"
            {...register("couponName", { required: data ? false : true })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="couponCodeInputField"
            label="Coupon Code"
            placeholder="Enter Coupon Code"
            defaultValue={data?.couponCode}
            aria-describedby="couponCodeInputField"
            {...register("couponCode", { required: data ? false : true })}
          />
        </CCol>

        <CCol xs={12}>
          <label className="mb-2">Expire date:  {data && <span className="text-primary">{new Date(selectedDate)?.toDateString()}</span>}</label>
          <CFormInput
            type="text"
            id="expireDate"
            placeholder="Enter Expire Date"
            aria-describedby="expireDate"
            defaultValue={selectedDate}
            onChange={handleDateChange}
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
          // {...register("expireDate")}
          />
        </CCol>
        <CCol xs={12}>
          <label className="mb-2">Discount Type</label>
          <br />
          <CFormCheck
            inline
            type="radio"
            name="discountTypeOptions"
            id="discountTypePercentage"
            checked={"percentage" === selectedCheckValue}
            value="percentage"
            label="Percentage"
            {...register("discountType", { required: data ? false : true })}
            onChange={(e) => handleChangeCheck(e)}
          />
          <CFormCheck
            inline
            type="radio"
            name="discountTypeOptions"
            id="discountTypeFixedAmount"
            checked={"fixedAmount" === selectedCheckValue}
            value="fixedAmount"
            label="Fixed Amount"
            {...register("discountType", { required: data ? false : true })}
            onChange={(e) => handleChangeCheck(e)}
          />
        </CCol>

        <CCol xs={12}>
          <CFormInput
            type="number"
            id="discountInputField"
            label="Discount"
            placeholder="Enter Discount"
            defaultValue={data?.discount}
            aria-describedby="discountInputField"
            {...register("discount", { required: data ? false : true })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            type="number"
            id="totalAmountInputField"
            label="Total Amount (for activate coupon)"
            placeholder="Enter Total Amount"
            defaultValue={data?.totalAmount}
            aria-describedby="totalAmountInputField"
            {...register("totalAmount", { required: data ? false : true })}
          />
        </CCol>
      </CRow>
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="primary" className="mt-3">
          <CIcon icon={cilPlus} className="me-2" />
          {addLoading || updateLoading ? "Loading.." : "Save"}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddCouponForm;

AddCouponForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
