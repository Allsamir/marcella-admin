/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { useState } from "react";

const DeleteModal = ({ showModal, setShowModal, deleteThis, id, deleteLoading }) => {
  const [matched, setMatched] = useState(true);
  let secret = null;
  const handleChange = (e) => {
    secret = e;

    if (secret === "marcella") {
      setMatched(false);
    } else {
      setMatched(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    secret = "";
    setMatched(true);
    setShowModal(false);
    deleteThis(id);
  };
  return (
    <CModal
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <CModalHeader closeButton>Are you delete this?</CModalHeader>
      <CModalBody>
        <CForm id="deleteProduct" onSubmit={handleSubmit}>
          <label htmlFor="">Enter secret key</label>
          <CCol xs={12}>
            <CFormInput
              type="password"
              onChange={(e) => {
                secret = e.target.value;
                handleChange(e.target.value);
              }}
            />
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            secret = "";
            setMatched(true);
            setShowModal(false);
          }}
        >
          Cancel
        </CButton>
        <CButton
          type="submit"
          form="deleteProduct"
          disabled={matched}
          color="danger"
          //   onClick={() => {
          //     secret = "";
          //     setMatched(true);
          //     deleteThis(id);
          //     setShowModal(false);
          //   }}
        >
          {deleteLoading ? "Loading.." : "Delete"}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteModal;
