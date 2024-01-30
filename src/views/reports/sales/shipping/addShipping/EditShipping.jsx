/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { CCard, CCardBody } from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetSingleShippingQuery } from "src/redux/shipping/shippingApi";
import Loading from "src/ui/Loading";
import ShippingForm from "./ShippingForm";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const EditShipping = () => {
  const { id } = useParams();
  const [haveId, setHveId] = useState(true);

  const {
    data: shippingData,
    isLoading: getShippingLoading,
    isError: getShippingError,
  } = useGetSingleShippingQuery(id, { skip: haveId });

  useEffect(() => {
    if (id) {
      setHveId(false);
    }
  }, [id]);

  return (
    <div>
      <CCard>
        <HeaderBackButton title={id ? "Update Shipping" : "Add Shipping"} />
        <CCardBody>
          {getShippingLoading ? <Loading /> : <ShippingForm shippingData={shippingData?.result} />}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EditShipping;
