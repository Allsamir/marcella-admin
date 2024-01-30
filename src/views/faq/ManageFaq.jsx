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
import CardHeaderButton from "src/ui/CardHeaderButton";
import BlogsTableRow from "./FaqTableRow";
import { useGetAllFaqQuery } from "src/redux/faq/faqApi";

const ManageFaq = () => {
  const { data: allFaq, isLoading, isError } = useGetAllFaqQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && allFaq?.data?.length === 0) {
    content = <p>There is no faq!</p>;
  }
  if (!isLoading && !isError && allFaq?.data?.length > 0) {
    content = allFaq?.data.map((blog, index) => (
      <BlogsTableRow key={blog?._id} blog={blog} index={index} />
    ));
  }
  return (
    <CCard>
      <CardHeaderButton title={"All Faq"} to="/pages/faq/add" />
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

export default ManageFaq;
