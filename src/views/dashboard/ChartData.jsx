import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OrderAndSalesModal from "src/ui/order&salesModal/OrderAndSalesModal";

const ChartData = ({
  selectedSalesData,
  selectedOrderData,
  selectedLabel,
  selectValue,
  handleButtonValueChanges,
}) => {
  const [showOrderFilterModal, setShowOrderFilter] = useState(false);

  return (
    <Row>
      <Col>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  Orders & Sales
                </h4>
                <div className="small text-medium-emphasis">{new Date().toDateString()}</div>
              </CCol>
              <CCol sm={7} className="d-none d-md-block">
                <CButtonGroup className="float-end me-3">
                  {["Day", "Month", "Year"].map((value) => (
                    <CButton
                      color="outline-info"
                      key={value}
                      onClick={() => handleButtonValueChanges(value)}
                      className="mx-0 shadow-none"
                      active={value === selectValue}
                    >
                      {value}
                    </CButton>
                  ))}
                  <CButton
                    color="outline-info"
                    onClick={() => setShowOrderFilter(true)}
                    className="mx-0 shadow-none"
                    // active={value === selectValue}
                  >
                    Custom
                  </CButton>
                </CButtonGroup>
              </CCol>
            </CRow>

            <CChart
              style={{ maxHeight: "300px", marginTop: "40px" }}
              type="bar"
              data={{
                labels: selectedLabel,
                datasets: [
                  {
                    label: "Total Orders",
                    backgroundColor: "red",
                    data: selectedOrderData,
                  },
                  {
                    label: "Total Sales",
                    backgroundColor: "#9FC1ED",
                    data: selectedSalesData,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </Col>

      <OrderAndSalesModal showModal={showOrderFilterModal} setShowModal={setShowOrderFilter} />
    </Row>
  );
};

export default ChartData;
