/* eslint-disable prettier/prettier */
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../../redux/category/categoryApi";
import { CgMenuGridO } from "react-icons/cg";
import { Form } from "react-bootstrap";
import CategoryTableRow from "./CategoryTableRow";
import CardHeaderButton from "src/ui/CardHeaderButton";

const ManageCategories = () => {
  const {
    data: categories,
    isLoading: getCategoryLoading,
    isError: getCategoryError,
  } = useGetAllCategoryQuery();

  let content = null;
  if (getCategoryLoading) {
    content = <p className="px-2  my-2 fs-5 text-primary">Loading..</p>;
  }
  if (!getCategoryLoading && getCategoryError) {
    content = <p className="text-danger">There was an error</p>;
  }
  if (!getCategoryLoading && !getCategoryError && categories?.result?.length === 0) {
    content = <p>There is no category</p>;
  }

  if (!getCategoryLoading && !getCategoryError && categories?.result?.length > 0) {
    content = categories?.result?.map((category, index) => (
      <CategoryTableRow key={category?._id} category={category} index={index} />
    ));
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Categories"} to={"/category/add"} />
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all categories.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                      Sl. No.
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" style={{ width: "5rem" }}>
                                            Icon
                                        </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "8rem" }}>
                      Sort Order
                    </CTableHeaderCell>
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

export default ManageCategories;
