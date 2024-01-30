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
import { useGetAllSizeQuery } from "src/redux/variants/variantsApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import SizeTableRowData from "./SizeTableRowData";

const ManageSize = () => {
  const { data, isLoading, isError } = useGetAllSizeQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && data?.data?.length === 0) {
    content = <p>There is no Size added</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data.map((size, index) => (
      <SizeTableRowData key={size?._id} size={size} index={index} />
    ));
  }
  return (
    <CCard>
      <CardHeaderButton title={"All Size"} to="/size/add" />
      <CCardBody>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
              <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                Sl. No.
              </CTableHeaderCell>

              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
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

export default ManageSize;
