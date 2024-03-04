import {
  cilCalendar,
  cilCarAlt,
  cilCart,
  cilCheck,
  cilCreditCard,
  cilEnvelopeOpen,
  cilGroup,
  cilItalic,
  cilMediaStop,
  cilMoney,
  cilPhone,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
} from "@coreui/react";
import { BsShop } from "react-icons/bs";

const AddressDetails = ({ orderData }) => {
  const { shippingName, district, city, postCode, shippingEmail, shippingPhone, createdAt } =
    orderData?.address || {};


  return (
    <CRow className="p-0 m-0">
      {/* order details */}
      <CCol
        className="p-0 mt-1"
        xs={orderData?.transactionId ? 4 : 6}
        md={orderData?.transactionId ? 4 : 6}
      >
        <CCard className="">
          <CCardHeader
            className="d-flex align-items-center justify-content-between"
            style={{ background: "#1489bf", color: "white", marginLeft: "1rem" }}
          >
            <strong className="d-flex align-items-center gap-2">
              {" "}
              <CIcon icon={cilCart} className="nav-icon " />
              Order Details
            </strong>
          </CCardHeader>
          <CCardBody className="pb-1 px-0">
            <CListGroup flush>
              <div className="px-4 pb-1 d-flex align-items-center ">
                <div className="  d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <BsShop
                    className="mx-1 text-white"
                    style={{ width: "1.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>
                Marcella
              </div>
              <div className="px-4  d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <CIcon
                    icon={cilCalendar}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>

                {new Date(createdAt).toLocaleDateString()}
              </div>
              <div className="px-4 d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <CIcon
                    icon={cilCreditCard}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>

                {orderData?.paymentType === "COD" ? "Cash on Delivery" : "SSLCOMMERZ"}
              </div>
              <div className="px-4 d-flex align-items-center  pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <CIcon
                    icon={cilCarAlt}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>
                {district}
              </div>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      {/* customer details */}
      <CCol
        className="p-0 mt-1"
        xs={orderData?.transactionId ? 4 : 6}
        md={orderData?.transactionId ? 4 : 6}
      >
        <CCard className="">
          <CCardHeader
            className="d-flex align-items-center justify-content-between"
            style={{ background: "#1489bf", color: "white", marginRight: "1rem" }}
          >
            <strong className="d-flex align-items-center gap-2">
              {" "}
              <CIcon icon={cilUser} className="nav-icon" />
              Customer Details
            </strong>
          </CCardHeader>
          <CCardBody className="pb-1 px-0 ">
            <CListGroup flush>
              <div className="px-4 d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <CIcon
                    icon={cilUser}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>
                {shippingName}
              </div>
              <div className="px-4 d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent icon_parent">
                  <CIcon
                    icon={cilGroup}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>
                {city}, {postCode}
              </div>
              <div className="px-4 d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent icon_parent">
                  <CIcon
                    icon={cilEnvelopeOpen}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>

                {shippingEmail || "No"}
              </div>
              <div className="px-4 d-flex align-items-center pb-1">
                <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                  <CIcon
                    icon={cilPhone}
                    className="mx-1 text-white"
                    style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                  />
                </div>
                {shippingPhone}
              </div>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      {/* ssl details */}
      {orderData?.transactionId && (
        <CCol className="p-0 mt-1" xs={12} md={4}>
          <CCard className="h-100">
            <CCardHeader
              className="d-flex align-items-center justify-content-between"
              style={{ background: "#1489bf", color: "white", marginRight: "1rem" }}
            >
              <strong className="d-flex align-items-center gap-2">
                {" "}
                <CIcon icon={cilItalic} className="nav-icon" />
                Payment Information
              </strong>
            </CCardHeader>
            <CCardBody className="pb-1 px-0">
              <CListGroup flush>
                <div className="px-4 d-flex align-items-center pb-1">
                  <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                    <CIcon
                      icon={cilMediaStop}
                      className="mx-1 text-white"
                      style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                    />
                  </div>
                  TnxId: <span className="text-primary ms-1">{orderData?.transactionId}</span>
                </div>
                <div className="px-4 d-flex align-items-center pb-1">
                  <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                    <CIcon
                      icon={cilMoney}
                      className="mx-1 text-white"
                      style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                    />
                  </div>
                  PayBy: <span className="text-primary ms-1">{orderData?.paymentMethod}</span>
                </div>
                <div className="px-4 d-flex align-items-center pb-1">
                  <div className=" d-flex justify-content-center align-items-center  me-1 rounded-small icon_parent">
                    <CIcon
                      icon={cilCheck}
                      className="mx-1 text-white"
                      style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                    />
                  </div>
                  Status: <span className="bg-success px-1 text-white ms-1">Paid</span>
                </div>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  );
};

export default AddressDetails;
