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
import { useGetAllReviewsQuery } from "src/redux/reviews/reviewsApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import PaginationButton from "src/ui/pagination/Pagination";
import ReviewTableRow from "./ReviewTableRow";

const AllReviews = () => {
  // get all reviews hook -> admin
  const location = useLocation();
  const { data: allReviews, isLoading, isError } = useGetAllReviewsQuery(location.search);
  // checking loading/error/data
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!isLoading && !isError && allReviews?.result?.data?.length === 0) {
    content = <p className="fw-4">There is no reviews</p>;
  }
  if (!isLoading && !isError && allReviews?.result?.data?.length > 0) {
    content = allReviews?.result?.data?.map((review, index) => (
      <ReviewTableRow key={review?._id} review={review} index={index} />
    ));
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton title={"All reviews"} to={"/all-reviews"} />
          <CCardBody>
            <span>Here is all reviews</span>
            <CTable align="middle" className="mb-0 border" bordered hover responsive>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                    Sl. No.
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ minWidth: "500px", maxWidth: "500px" }}>
                    Comment
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Reviews by</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
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
              totalPageNumber={allReviews?.result?.totalPageNumber}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AllReviews;
