import { cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CgMenuGridO } from "react-icons/cg";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { } from "src/redux/subCategory/subCategoryApi";
import { useGetAllSubCategoryChildrenByPageQuery } from "src/redux/subCategoryChildren/subCategoryChildrenApi";
import SubCategoryChildrenTableRow from "./SubCategoryChildrenTableRow";
import CardHeaderButton from "src/ui/CardHeaderButton";
import { useState } from "react";
import PaginationButton from "src/ui/pagination/Pagination";
import SearchFieldForm from "src/ui/SearchFieldForm";

const ManageSubcategoryChildren = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const {
    data: subcategories,
    isLoading: getSubCategoryLoading,
    isError: getSubCategoryError,
  } = useGetAllSubCategoryChildrenByPageQuery(search);

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
      <SubCategoryChildrenTableRow key={subcategory?._id} subcategory={subcategory} index={index} />
    ));
  }
  // table data for search input fields
  const tableData = [
    { name: "Name / title", register: "title", type: "text" },
    { name: "Subcategory parent", register: "subCategory", type: "text", disabled: true },
    { name: "Category parent", register: "subCategoryChild", type: "text", disabled: true },
  ];

  const handleSearch = (data) => {
    let query = "?";
    if (data.title) query += `${"title"}=${data.title.trim()}`;
    navigate(query);
  };
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Subcategory Children"} to={"/subcategory-children/add"} />
            <SearchFieldForm onSubmit={handleSearch} tableData={tableData} isNavigate={true} />

            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all subcategories.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                      Sl. No.
                      {/* <Form.Check inline type="checkbox" /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sub Children</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Subcategory Parent</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Parent</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Niche Category</CTableHeaderCell>
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
            <PaginationButton searchUrl={search} totalPageNumber={subcategories?.totalPageNumber} />
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ManageSubcategoryChildren;
