/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { memo } from "react";
import { useForm } from "react-hook-form";

import "./OfferModal.scss";
import { useState } from "react";

const CreateOfferModal = ({
  showModal,
  setShowModal,
  offerPropsData,
  title,
  handlePostOrderFunction,
  isLoading,
  isUpdate,
  defaultOfferData,
  handleUpdateFunction,
}) => {
  const { reset, register, handleSubmit, control } = useForm();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ::::::::: handle submit to create  offer ::::::::://
  const handleSubmitForm = (data) => {
    const sDate = new Date(startDate).getTime();
    const eDate = new Date(endDate).getTime();
    let timeStamps = null;
    if (sDate && eDate) timeStamps = eDate - sDate + (sDate - Date.now()) + Date.now();

    const modifyData = {
      ...data,
      discount: parseInt(data.discount),
      startDate: startDate || defaultOfferData.startDate,
      endDate: endDate || defaultOfferData.endDate,
      timeStamps: timeStamps || defaultOfferData?.timeStamps,
      status: "active",
    };
    if (isUpdate) {
      // this hook for update offer

      const id = defaultOfferData?._id;

      handleUpdateFunction({ data: modifyData, id });
    } else {
      // this hook for crate a new offer
      handlePostOrderFunction(modifyData);
      reset();
    }
  };
  return (
    <CModal
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      className="offerModal"
    >
      <CModalHeader closeButton>{title} </CModalHeader>
      <CModalBody>
        <CForm id="handleSubmitForm" onSubmit={handleSubmit(handleSubmitForm)}>
          <CRow className="g-3">
            <CCol xs={12}>
              <CFormInput
                type="text"
                id="discountInputField"
                label="Offer Name"
                defaultValue={defaultOfferData?.name}
                placeholder={"Enter offer name"}
                aria-describedby="discountInputField"
                min={"0"}
                {...register("name", { required: true, min: 0, max: 100 })}
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
                label="Percentage"
                defaultChecked={defaultOfferData?.discountType === "percentage"}
                value="percentage"
                {...register("discountType", { required: true })}
              />
              <CFormCheck
                inline
                type="radio"
                name="discountTypeOptions"
                id="discountTypeFixedAmount"
                defaultChecked={defaultOfferData?.discountType === "fixedAmount"}
                label="Fixed Amount"
                value="fixedAmount"
                {...register("discountType", { required: true })}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="discountInputField"
                label="Discount"
                placeholder="Enter Discount"
                defaultValue={defaultOfferData?.discount}
                aria-describedby="discountInputField"
                min={"0"}
                {...register("discount", { required: true, min: 0, max: 100 })}
              />
            </CCol>

            <CCol xs={6}>
              <label className="text-primary">Start Date</label>
              {defaultOfferData && (
                <label htmlFor="" className=" d-flex justify-content-between mb-1">
                  <span>{new Date(startDate).toLocaleDateString()}</span>
                  <span>{new Date(startDate).toLocaleTimeString()}</span>
                </label>
              )}
              <CFormInput
                placeholder="Enter Start Date"
                aria-describedby="startDate"
                defaultValue={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required={defaultOfferData ? false : true}
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </CCol>

            <CCol xs={6}>
              <label className="text-primary">End Date</label>
              {defaultOfferData && (
                <label htmlFor="" className=" d-flex justify-content-between mb-1">
                  <span>{new Date(endDate).toLocaleDateString()}</span>
                  <span>{new Date(endDate).toLocaleTimeString()}</span>
                </label>
              )}

              <CFormInput
                placeholder="Enter End Date"
                aria-describedby="endDate"
                defaultValue={endDate}
                required={defaultOfferData ? false : true}
                onChange={(e) => setEndDate(e.target.value)}
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </CButton>

        <CButton
          disabled={isLoading}
          form="handleSubmitForm"
          type="submit"
          color="success"
          className="text-white"
        >
          <CIcon icon={cilSave} className="me-2" />{" "}
          {isUpdate ? <>Update</> : <>{isLoading ? "Loading.." : "Save"}</>}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default memo(CreateOfferModal);
