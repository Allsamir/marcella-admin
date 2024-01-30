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
import { useGetAllReturnsQuery } from "src/redux/return/returnApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import ReturnTableRowData from "./ReturnTableRowData";

const ManageReturn = () => {
  const { data: allReturns, isLoading, isError } = useGetAllReturnsQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && allReturns?.data?.length === 0) {
    content = <p>There is no Return Policy</p>;
  }
  if (!isLoading && !isError && allReturns?.data?.length > 0) {
    content = allReturns?.data.map((blog, index) => (
      <ReturnTableRowData key={blog?._id} blog={blog} index={index} />
    ));
  }
  return (
    <CCard>
      <CardHeaderButton title={"All Return Policy"} to="/pages/return/add" />
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

export default ManageReturn;
