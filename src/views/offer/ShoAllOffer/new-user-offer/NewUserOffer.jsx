/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useDeleteSingleNewUserDiscountByIdMutation,
  useGetAllNewUserDiscountQuery,
  useUpdateSingleNewUserDiscountByIdMutation,
} from "src/redux/newUserDiscount/newUserDiscountApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import ShowOfferTableParent from "../ShowOfferTableParent";
import ShowOfferTableRowParent from "../ShowOfferTableRowParent";

const NewUserOffer = () => {
  // ::::::::: inactive brand discount hook ::::::::: //

  // ::::::::: update new user discount hook ::::::::: //
  const [
    updateSingleNewUserDiscountById,
    {
      loading: updateLoading,
      isSuccess: updateSuccess,
      error: updateErrorMessage,
      isError: updateError,
    },
  ] = useUpdateSingleNewUserDiscountByIdMutation();

  // ::::::::: delete new user discount hook ::::::::: //
  const [
    deleteSingleNewUserDiscountById,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      error: deleteErrorMessage,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteSingleNewUserDiscountByIdMutation();

  // ::::::::: all user discount data ::::::::: //
  const {
    data: allNewUserDiscountData,
    isLoading: allNewUserDiscountLoading,
    isError: allNewUserDiscountError,
  } = useGetAllNewUserDiscountQuery();

  let content = null;
  if (allNewUserDiscountLoading) {
    content = <p>Loading...</p>;
  }
  if (!allNewUserDiscountLoading && allNewUserDiscountError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (
    !allNewUserDiscountLoading &&
    !allNewUserDiscountError &&
    allNewUserDiscountData?.result?.length > 0
  ) {
    content = allNewUserDiscountData?.result?.map((offer, index) => (
      <ShowOfferTableRowParent
        key={offer?._id}
        offer={offer}
        index={index}
        deleteLoading={deleteLoading}
        inActiveThis={updateSingleNewUserDiscountById}
        deleteThis={deleteSingleNewUserDiscountById}
        //for update modal below props
        offerPropsData={[]}
        title={"New customer offer"}
        handleUpdateFunction={updateSingleNewUserDiscountById}
        updateLoading={updateLoading}
        defaultOfferData={offer}
      />
    ));
  }
  useEffect(() => {
    toast.dismiss();

    deleteError && toast.error(deleteErrorMessage?.data.message, { id: "DError1" });
    deleteSuccess && toast.success("Delete offer the successfully", { id: "dSuccess1" });
    updateError && toast.error(updateErrorMessage?.data.message, { id: "UError1" });
    updateSuccess && toast.success("Update offer the successfully", { id: "USuccess1" });
  }, [updateSuccess, updateError, deleteSuccess, deleteError]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton title={"New user offers"} to={"/create-offer"} />
          <CCardBody>
            <p className="text-medium-emphasis small">Here is the list of new user discount</p>
            <ShowOfferTableParent content={content} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default NewUserOffer;
