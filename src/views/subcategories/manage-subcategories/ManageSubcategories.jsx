/* eslint-disable prettier/prettier */
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
import { useGetAllSubCategoryQuery } from "src/redux/subCategory/subCategoryApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import SubcategoryTableRow from "./SubcategoryTableRow";

const ManageSubcategories = () => {
  const {
    data: subcategories,
    isLoading: getSubCategoryLoading,
    isError: getSubCategoryError,
  } = useGetAllSubCategoryQuery();

  let content = null;
  if (getSubCategoryLoading) {
    content = <p className="px-2 my-2 fs-5 text-primary">Loading..</p>;
  }
  if (!getSubCategoryLoading && getSubCategoryError) {
    content = <p className="text-danger">There was an error</p>;
  }
  if (!getSubCategoryLoading && !getSubCategoryError && subcategories?.result?.length === 0) {
    content = <p>There is no category</p>;
  }
  //
  if (!getSubCategoryLoading && !getSubCategoryError && subcategories?.result?.length > 0) {
    content = subcategories?.result?.map((subcategory, index) => (
      <SubcategoryTableRow key={subcategory?._id} subcategory={subcategory} index={index} />
    ));
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Subcategories"} to={"/subcategory/add"} />
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all subcategories.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                      Sl. No.
                      {/* <Form.Check inline type="checkbox" /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sub Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Parent Category</CTableHeaderCell>
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
        </CCol>
      </CRow>
    </>
  );
};

export default ManageSubcategories;
