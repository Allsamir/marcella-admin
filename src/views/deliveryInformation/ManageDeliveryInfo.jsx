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
import { useGetAllDeliverInfoQuery } from "src/redux/deliveryInfo/deliveryInfoApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import DeliveryInfoTableRowData from "./DeleveryInfoTableRowData";

const ManageDeliveryInfo = () => {
  const { data, isLoading, isError } = useGetAllDeliverInfoQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && data?.data?.length === 0) {
    content = <p>There is no Delivery Information</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data.map((delivery, index) => (
      <DeliveryInfoTableRowData key={delivery?._id} delivery={delivery} index={index} />
    ));
  }

  return (
    <CCard>
      <CardHeaderButton title={"All Delivery Info"} to="/pages/delivery-info/add" />
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
              <CTableHeaderCell scope="col">Bangla description</CTableHeaderCell>
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

export default ManageDeliveryInfo;
