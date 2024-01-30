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
import { useGetAllManagerQuery } from "src/redux/admin/AdminApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import Loading from "src/ui/Loading";
import Error from "src/ui/error/Error";
import ManagerTableRowData from "./MangerTableRowData";
const Manager = () => {
  const { data, isLoading, isError } = useGetAllManagerQuery();
  let content = null;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <Error>There was en error</Error>;
  }
  if (!isLoading && !isError && data.length === 0) {
    content = <Error>There is no admin or manger</Error>;
  }
  if (!isLoading && !isError && data.length > 0) {
    content = data?.map((manager, index) => (
      <ManagerTableRowData key={manager?._id} manager={manager} index={index} />
    ));
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton to={"/admin/add"} title={"All admin & managers"} />
          <CCardBody>
            <span>Super Admin</span>
            <CTable align="middle" className="mb-0 border" bordered hover responsive>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                    Sl. No.
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Added Date</CTableHeaderCell>

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
            {/* <PaginationButton
            searchUrl={location.search}
            totalPageNumber={AllNewsLetter?.result?.totalPageNumber}
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Manager;
