import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";

const ShowOfferTableParent = ({ content }) => {
  return (
    <CTable align="middle" className="mb-0 border" bordered hover responsive>
      <CTableHead color="light">
        <CTableRow className="text-start">
          <CTableHeaderCell scope="col" style={{ width: "60px" }}>
            Sl. No.
            {/* <Form.Check inline type="checkbox" /> */}
          </CTableHeaderCell>
          <CTableHeaderCell
            scope="col"
            style={{
              width: "300px",
              minWidth: "300px",
            }}
          >
            Name
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
          <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
          <CTableHeaderCell
            scope="col"
            style={{
              width: "150px",
              minWidth: "150px",
            }}
          >
            timer
          </CTableHeaderCell>
          <CTableHeaderCell
            scope="col"
            style={{
              width: "150px",
              minWidth: "150px",
            }}
          >
            Status
          </CTableHeaderCell>
          <CTableHeaderCell
            scope="col"
            style={{
              width: "150px",
              minWidth: "150px",
            }}
          >
            Actions
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>{content}</CTableBody>
    </CTable>
  );
};

export default ShowOfferTableParent;
