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
import { useGetAllPrivacyQuery } from "src/redux/privacyPolicy/privacyPolicyApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import PrivacyTableRowData from "./PrivacyTableRowData";

const ManagePrivacyPolicy = () => {
  const { data: allPrivacy, isLoading, isError } = useGetAllPrivacyQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p>There is something wrong!</p>;
  }
  if (!isLoading && !isError && allPrivacy?.data?.length === 0) {
    content = <p>There is no Privacy policy</p>;
  }
  if (!isLoading && !isError && allPrivacy?.data?.length > 0) {
    content = allPrivacy?.data.map((blog, index) => (
      <PrivacyTableRowData key={blog?._id} blog={blog} index={index} />
    ));
  }
  return (
    <CCard>
      <CardHeaderButton title={"All Privacy Policy"} to="/pages/privacy-policy/add" />
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

export default ManagePrivacyPolicy;
