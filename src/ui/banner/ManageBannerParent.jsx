import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CardHeaderButton from "../CardHeaderButton";

const ManageBannerParent = ({ title, to, content }) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton title={title} to={to} />
          <CCardBody>
            <p className="text-medium-emphasis small">Here is the list of all banners.</p>

            <CTable align="middle" className="mb-0 border" bordered hover responsive>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                    Sl. No.
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{
                      width: "100px",
                      minWidth: "100px",
                    }}
                  >
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{content}</CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ManageBannerParent;
