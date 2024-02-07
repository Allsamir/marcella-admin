import React from "react";
import logo from "../../../assets/brand/logo.png";
import { Col, Image, Row } from "react-bootstrap";
import { CCard, CCardBody } from "@coreui/react";

const CompanyInfo = ({ orderData }) => {
  return (
    <CCard className="">
      {/* <h1 style={{ fontWeight: "bold", color: "#0B0B0B" }}>Bd Beponi</h1> */}
      <CCardBody className="p-o" style={{ paddingBottom: "0px" }}>
        <Row className="pb-0">
          <div className="d-flex justify-content-between">
            <Image src={logo} width={200} />
            <h1 style={{ fontWeight: "900", color: "#1489bf", fontSize: "4rem" }}>Invoice</h1>
          </div>
          <Col xs={8} className="mt-2">
            <p className="fw-bold ">
              6/A, Nigar Plaza (Near Rajlaxmi Complex), Level: 06,<br />
              House: 32-B, Road: 2, Sector: 3, Uttara, Dhaka 1230 <br />
              Phone: +88 01810-077844
            </p>
          </Col>
          <Col xs={4} className="mt-2 text-end">
            <p className="mb-0">
              <span className="fw-bold"> Invoice number :</span> {orderData?.orderId}
            </p>

            {/* <p className="mb-0">
              <span className="fw-bold"> Customer number:</span> bdbeponi-521312
            </p>
            <p className="mb-0">
              <span className="fw-bold"> Invoice number:</span> bdbeponi-521312
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
