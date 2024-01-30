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
import { useLocation } from "react-router-dom";
import CardHeaderButton from "src/ui/CardHeaderButton";
import PaginationButton from "src/ui/pagination/Pagination";
import { useGetAllReportsQuery } from "src/redux/report/orderReportApi";
import ReportTableRow from "./ReportTableRow";

const ManageOrderReports = () => {
  // get all reviews hook -> admin
  const location = useLocation();
  const { data: allReports, isLoading, isError } = useGetAllReportsQuery(location.search);
  // checking loading/error/data
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!isLoading && !isError && allReports?.result?.data?.length === 0) {
    content = <p className="fw-4">There is no reports</p>;
  }
  if (!isLoading && !isError && allReports?.result?.data?.length > 0) {
    content = allReports?.result?.data?.map((report, index) => (
      <ReportTableRow key={report?._id} report={report} index={index} />
    ));
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton title={"All reports"} to={"/report"} />
          <CCardBody>
            <span>Here is all reports</span>
            <CTable align="middle" className="mb-0 border" bordered hover responsive>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col">Sl. No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Reason</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Requested For</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{
                      width: "50px",
                      minWidth: "100px",
                    }}
                  >
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{content}</CTableBody>
            </CTable>
            <PaginationButton
              searchUrl={location.search}
              totalPageNumber={allReports?.result?.totalPageNumber}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ManageOrderReports;
