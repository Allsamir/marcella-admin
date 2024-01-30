import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";

const OrderDetails = ({ orderData }) => {
  const { shippingName, shippingPhone, district, address, city, country, postCode } =
    orderData?.address || {};

  let numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <CCol className="p-0 mt-1" xs={12} md={12}>
      <CCard className="h-100">
        <CCardHeader className="ms-2 fw-bold">Order ID ({orderData?.orderId})</CCardHeader>
        <CCardBody className="px-3 pt-0">
          <CTable bordered>
            <CTableHead>
              <CTableRow style={{ background: "#1489bf", color: "white", letterSpacing: "0.1rem" }}>
                <CTableHeaderCell>
                  <strong>Payment Address</strong>
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <strong>Shipping Address</strong>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="fw-bold">
              <CTableRow>
                <CTableDataCell>
                  <div>{shippingName}</div>
                  <div>{address}</div>
                  <div>
                    {city}, {postCode}
                  </div>

                  <div>
                    {district}, {country}, {shippingPhone}
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{shippingName}</div>
                  <div>{address}</div>
                  <div>
                    {city}, {postCode}
                  </div>

                  <div>
                    {district}, {country}, {shippingPhone}
                  </div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>

          <CTable bordered>
            <CTableHead>
              <CTableRow style={{ background: "#1489bf", color: "white" }}>
                <CTableHeaderCell style={{ width: "40px" }}>SL</CTableHeaderCell>
                <CTableHeaderCell>Product</CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: "80px" }}>
                  Size
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: "80px" }}>
                  Color
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: "20px" }}>
                  Qty
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Unit Price</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Total</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="fw-bold">
              {orderData?.products?.map((item, index) => (
                <CTableRow key={item?.product?._id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <Link
                      className="text-decoration-none text-black"
                      to={`/product?search=${item?.product?.name}`}
                    >
                      {item?.product?.name}
                    </Link>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{item?.size || "No"}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.color || "No"}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.quantity}</CTableDataCell>
                  <CTableDataCell className="text-end">
                    ৳{" "}
                    {item?.product?.price > item?.offerPrice ? (
                      <>
                        <del>{numberWithCommas(item?.product?.price)}</del>
                        <span className="ms-2">{numberWithCommas(item?.offerPrice)}</span>
                      </>
                    ) : (
                      numberWithCommas(item?.product?.price)
                    )}
                  </CTableDataCell>
                  <CTableDataCell className="text-end" style={{ paddingRight: "1rem" }}>
                    ৳{numberWithCommas(item?.offerPrice * item?.quantity)}
                  </CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow>
                <CTableHeaderCell colSpan={"6"} className="text-end">
                  Sub-Total{" "}
                  {orderData?.couponDiscount && (
                    <span>{`(-${orderData?.couponDiscount?.discount}${
                      orderData?.couponDiscount?.discountType === "percentage" ? "%" : "৳"
                    } coupon)`}</span>
                  )}
                </CTableHeaderCell>
                <CTableDataCell className="text-end" style={{ paddingRight: "1rem" }}>
                  ৳ {numberWithCommas(orderData?.totalAmount - orderData?.shippingCharge)}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell colSpan={"6"} className="text-end">
                  Shipping: ({district})
                </CTableHeaderCell>
                <CTableDataCell className="text-end" style={{ paddingRight: "1rem" }}>
                  ৳ {numberWithCommas(orderData?.shippingCharge)}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell style={{ minWidth: "200px" }} colSpan={"6"} className="text-end">
                  Total
                </CTableHeaderCell>
                <CTableDataCell className="text-end" style={{ paddingRight: "1rem" }}>
                  {orderData?.transactionId && (
                    <span className="bg-success text-white px-1 me-1">Paid</span>
                  )}
                  ৳ {numberWithCommas(orderData?.totalAmount)}{" "}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default OrderDetails;
