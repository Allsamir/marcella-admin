import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from "@coreui/react";

const UpdateOfferStatusModal = ({ showModal, setShowModal, handleActiveOffer, isLoading }) => {
  // handleUpdate function call
  const handleUpdate = () => {
    const returnObjectData = {
      status: "active",
    };
    handleActiveOffer(returnObjectData);
  };

  return (
    <CModal
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      className="offerModal"
    >
      <CModalHeader closeButton>Update Status</CModalHeader>
      <CModalBody className="my-4"></CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </CButton>
        <CButton disabled={isLoading} color="success" onClick={handleUpdate}>
          {isLoading ? "Loading..." : " Save"}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UpdateOfferStatusModal;
