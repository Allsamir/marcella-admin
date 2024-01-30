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
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllProductQuery } from "src/redux/products/productsApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import Error from "src/ui/error/Error";
import Loading from "src/ui/Loading";
import PaginationButton from "src/ui/pagination/Pagination";
import SearchFieldForm from "src/ui/SearchFieldForm";
import ProductTableRow from "./ProductTableRow";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductQuery(location.search);

  let content = null;
  if (productsLoading) {
    content = <Loading />;
  }
  if (!productsLoading && productsError) {
    content = <Error>There is something wrong</Error>;
  }
  if (!productsLoading && !productsError && products?.result?.data?.length === 0) {
    content = <Error error={"There is no products"} />;
  }

  if (!productsLoading && !productsError && products?.result?.data?.length > 0) {
    content = products?.result?.data?.map((product, index) => (
      <ProductTableRow key={product?._id} product={product} index={index} />
    ));
  }

  // table data for search input fields
  const tableData = [
    { name: "Product Name", register: "name", type: "text" },
    { name: "Price", register: "price", type: "text" },
    { name: "Status", register: "status", type: "text" },
    { name: "Model", register: "model", type: "text" },
    { name: "Quantity", register: "quantity", type: "text" },
    { name: "Date Added", register: "date", type: "date" },
  ];

  // handle search
  const handleSearch = (data) => {
    let query = "?";
    if (data.name) query += `search=${data.name.trim()}`;
    if (data.price) query += `&price=${data.price.trim()}`;
    if (data.status) query += `&status=${data.status.trim()}`;
    if (data.model) query += `&model=${data.model.trim()}`;
    if (data.quantity) query += `&quantity=${data.quantity.trim()}`;
    if (data.date) query += `&date=${data.date.trim()}`;

    navigate(query);
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Products"} to={"/product/add"} />
            {/* search field */}
            <SearchFieldForm onSubmit={handleSearch} tableData={tableData} isNavigate={true} />
            <CCardBody>
              <div>
                <p className="text-medium-emphasis small">Here is the list of all product.</p>
              </div>
              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-center">
                    <CTableHeaderCell
                      scope="col"
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    >
                      Sl. No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "3rem" }}>
                      Photo
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "30rem" }}>
                      Name
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Model</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Stock Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
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
              <PaginationButton
                search={location?.search}
                totalPageNumber={products?.result?.totalPageNumber}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ManageProducts;
