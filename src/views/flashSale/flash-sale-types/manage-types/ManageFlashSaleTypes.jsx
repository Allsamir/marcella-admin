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
import { useGetAllTypesQuery } from "src/redux/flashSaleType/flashSaleTypeApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import Error from "src/ui/error/Error";
import FlashTableRowData from "./FlashTableRowData";

const ManageFlashSaleType = () => {
  const { data, isLoading, isError } = useGetAllTypesQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <Error>There is something wrong!</Error>;
  }
  if (!isLoading && !isError && data?.data?.length === 0) {
    content = <Error>There is now types added!</Error>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data.map((type, index) => (
      <FlashTableRowData key={type?._id} type={type} index={index} />
    ));
  }
  return (
    <CCard>
      <CardHeaderButton title={"All Types"} to="/flashSale-types/add" />
      <CCardBody>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
              <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                Sl. No.
              </CTableHeaderCell>

              <CTableHeaderCell scope="col">Types Name</CTableHeaderCell>
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

export default ManageFlashSaleType;
