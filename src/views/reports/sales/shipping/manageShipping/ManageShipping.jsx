/* eslint-disable prettier/prettier */

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
import { useGetAllShippingQuery } from "src/redux/shipping/shippingApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import ShippingTableRaw from "./ShippingTableRaw";

const ManageShipping = () => {
  const { data: shippingData, isLoading, isError } = useGetAllShippingQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-danger">There is something wrong!</p>;
  }
  if (!isLoading && !isError && shippingData?.result?.length === 0) {
    content = <p className="text-danger">There is no data</p>;
  }
  if (!isLoading && !isError && shippingData?.result?.length > 0) {
    content = shippingData?.result?.map((data, index) => (
      <ShippingTableRaw key={data?._id} data={data} index={index} />
    ));
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Shipping"} to={"/shipping/add"} />
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all shipping.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                      Sl. No.
                      {/* <Form.Check inline type="checkbox" /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Area</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Charge</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "100px", minWidth: "100px" }}>
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
    </div>
  );
};

export default ManageShipping;
