import React from "react";
import logo from "../../../assets/brand/logo.png";
import { Col, Image, Row } from "react-bootstrap";
import { CCard, CCardBody } from "@coreui/react";

const CompanyInfo = ({ orderData }) => {
  return (
    <CCard className="">
      {/* <h1 style={{ fontWeight: "bold", color: "#0B0B0B" }}>Marcella</h1> */}
      <CCardBody className="p-o" style={{ paddingBottom: "0px" }}>
        <Row className="pb-0">
          <div className="d-flex justify-content-between">
            <Image src={logo} width={200} />
            <h1 style={{ fontWeight: "900", color: "#1489bf", fontSize: "4rem" }}>Invoice</h1>
          </div>
          <Col xs={8} className="mt-2">
            <p className="fw-bold ">
              Road No: 04, Baridhara DOHS, Dhaka. <br />
              Dhaka-1206, Bangladesh. <br />
              Phone: +88 01894-961361
            </p>
          </Col>
          <Col xs={4} className="mt-2 text-end">
            <p className="mb-0">
              <span className="fw-bold"> Invoice number :</span> {orderData?.orderId}
            </p>

            {/* <p className="mb-0">
              <span className="fw-bold"> Customer number:</span> marcella-521312
            </p>
            <p className="mb-0">
              <span className="fw-bold"> Invoice number:</span> marcella-521312
            </p> */}
            <p className="mb-0">
              <span className="fw-bold"> Invoice date :</span> {new Date().toLocaleDateString()}
            </p>
          </Col>
        </Row>
      </CCardBody>
    </CCard>
  );
};

export default CompanyInfo;
