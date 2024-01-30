/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { CButton } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddNewCustomerDiscountMutation } from "src/redux/newUserDiscount/newUserDiscountApi";
import CreateOfferModal from "src/ui/CreateOfferModal";

const NewCustomerButton = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // ::::::::: add new customer discount offer hook  ::::::::://
  const [
    addNewCustomerDiscount,
    {
      isLoading: newUserDiscountLoading,
      isError: newUserDiscountError,
      isSuccess: newUserDiscountSuccess,
      error: addErrorMsg,
    },
  ] = useAddNewCustomerDiscountMutation();

  // ::::::::: handle click to open new customer offer form and props pass ::::::::://
  const handleNewCustomer = () => {
    setShowModal(true);
  };

  useEffect(() => {
    {
      newUserDiscountSuccess && toast.success("Offer created successfully");
    }
    {
      newUserDiscountError &&
        toast.error(addErrorMsg?.data?.message || "could not create the offer");
    }
  }, [newUserDiscountSuccess, newUserDiscountError]);

  useEffect(() => {
    newUserDiscountSuccess && navigate(-1);
  }, [newUserDiscountSuccess]);

  return (
    <>
      <CButton onClick={handleNewCustomer}>New Customer Offer</CButton>
      <CreateOfferModal
        setShowModal={setShowModal}
        showModal={showModal}
        offerPropsData={[]}
        title={"New customer offer"}
        handlePostOrderFunction={addNewCustomerDiscount}
        isLoading={newUserDiscountLoading}
      />

      {/* error and success message */}
    </>
  );
};

export default NewCustomerButton;
