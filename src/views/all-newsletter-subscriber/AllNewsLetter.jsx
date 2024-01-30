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
import NewsLetterTableRow from "./NewsLetterTableRow";
import { useGetAllNewsLetterQuery } from "src/redux/all-newsletter/newsLetterApi";

const AllNewsLetter = () => {
  // get all reviews hook -> admin
  const location = useLocation();
  const { data: AllNewsLetter, isLoading, isError } = useGetAllNewsLetterQuery(location.search);
  // checking loading/error/data
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!isLoading && !isError && AllNewsLetter?.result?.data?.length === 0) {
    content = <p className="fw-4">There is no reviews</p>;
  }
  if (!isLoading && !isError && AllNewsLetter?.result?.data?.length > 0) {
    content = AllNewsLetter?.result?.data?.map((review, index) => (
      <NewsLetterTableRow key={review?._id} review={review} index={index} />
    ));
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton title={"All subscriber"} />
          <CCardBody>
            <span>Here is all subscribers</span>
            <CTable align="middle" className="mb-0 border" bordered hover responsive>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                    Sl. No.
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col">email</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{
                      width: "50px",
                      minWidth: "50px",
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
              totalPageNumber={AllNewsLetter?.result?.totalPageNumber}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AllNewsLetter;
