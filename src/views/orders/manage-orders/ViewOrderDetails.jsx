/* eslint-disable react/prop-types */
import { cilPrint } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CRow, CTooltip } from "@coreui/react";
import { useRef } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useGetSingleOrderByIdQuery } from "src/redux/order/orderApi";
import AddressDetails from "./AddressDetails";
import OrderDetails from "./OrderDetails";
import "./OrderDetails.scss";
import OrderHistory from "./OrderHistory";
import CompanyInfo from "./CompanyInfo";
import Loading from "src/ui/Loading";
import back from "../../../assets/brand/back.png";

const ViewOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: orderData, isLoading } = useGetSingleOrderByIdQuery(id);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <CRow className="g-4">
      <div className="d-flex justify-content-end">
        <CTooltip content="Print Invoice">
          <CButton
            color="primary"
            style={{ marginRight: "2rem" }}
            className="ms-2 mb-1 "
            onClick={handlePrint}
          >
            Print
            <CIcon className="ms-2" icon={cilPrint} />
          </CButton>
        </CTooltip>
        <CTooltip content="Back">
          <div
            style={{ cursor: "pointer" }}
            className="d-flex border py-1 px-2"
            onClick={() => navigate(-1)}
          >
            <Image src={back} style={{ width: "30px" }} />
          </div>
        </CTooltip>
      </div>

      {!isLoading ? (
        <CRow ref={componentRef} className="g-4 px-2">
          <CompanyInfo orderData={orderData?.result} />
          <AddressDetails orderData={orderData?.result} />
          <OrderDetails orderData={orderData?.result} />
        </CRow>
      ) : (
        <Loading />
      )}
      <OrderHistory orderData={orderData?.result} />
    </CRow>
  );
};

export default ViewOrderDetails;
