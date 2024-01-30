/* eslint-disable prettier/prettier */
import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useGetAllStoreLocationQuery } from "src/redux/storeLocation/storeLocationApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import StoreTableRowData from "./StoreTableRowData";

const ManageStoreLocation = () => {
  const { data, isLoading, isError } = useGetAllStoreLocationQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && data?.data?.length === 0) {
    content = <p>There is no Store Location</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data.map((store, index) => (
      <StoreTableRowData key={store?._id} blog={store} index={index} />
    ));
  }

  return (
    <CCard>
      <CardHeaderButton title={"All Store Location"} to="/pages/store-location/add" />
      <CCardBody>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
              <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                Sl. No.
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ width: "10rem" }}>
                Added Dated
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
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
  );
};

export default ManageStoreLocation;
