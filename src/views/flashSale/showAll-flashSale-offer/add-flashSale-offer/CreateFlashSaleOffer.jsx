/* eslint-disable prettier/prettier */

import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "src/ui/Loading";
import {
  useAddFlashSaleOfferMutation,
  useGetSingleFlashSaleOfferQuery,
  useUpdateSingleFlashSaleOfferMutation,
} from "src/redux/flashSaleOffer/flashSaleOfferApi";
import FlashSaleOfferForm from "./FlashSaleOfferForm";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const CreateFlashSaleOffer = () => {
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [color, setColor] = useState("#FFFFFF");


  const {
    data: offer,
    isLoading: getLoading,
    isError: offerError,
    error: offerErrorMsg,
  } = useGetSingleFlashSaleOfferQuery(id, { skip: haveId });

  // flash sale offer types

  const [
    addFlashSaleOffer,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddFlashSaleOfferMutation();

  const [
    updateSingleFlashSaleOffer,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleFlashSaleOfferMutation();

  // update or add new term conditions
  const onSubmit = (data) => {
    const startingDate = new Date(startDate).getTime();
    const endingDate = new Date(endDate).getTime();
    const timeStamps = endingDate - startingDate + (startingDate - Date.now()) + Date.now();
    const defaultData = offer?.result;

    const modifyData = {
      ...defaultData,
      name: data.name || defaultData?.name,
      startDate: startDate || defaultData?.startDate,
      endDate: endDate || defaultData?.startDate,
      timeStamps: timeStamps || defaultData?.timeStamps,
      offerType: data.offerType || defaultData?.offerType,
      status: "active",
      color: color
    };


    if (id) {
      updateSingleFlashSaleOffer({ id, data: modifyData });
    } else {
      addFlashSaleOffer(modifyData);
    }

    console.log(modifyData)
  };

  useEffect(() => {
    addError && toast.error(addMsg?.data?.message || "Added Failed");
    updateError && toast.error(updateMsg?.data?.message || "Updated Failed");
  }, [addError, updateError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  return (
    <CCard>
      <HeaderBackButton title={id ? "Customize flashSale offer" : "Add flashSale offer"} />

      {getLoading ? (
        <Loading />
      ) : (
        <CCardBody>
          <FlashSaleOfferForm
            loading={updateLoading || addLoading}
            data={offer?.result}
            onSubmit={onSubmit}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            color={color}
            setColor={setColor}
          />
        </CCardBody>
      )}
    </CCard>
  );
};

export default CreateFlashSaleOffer;
