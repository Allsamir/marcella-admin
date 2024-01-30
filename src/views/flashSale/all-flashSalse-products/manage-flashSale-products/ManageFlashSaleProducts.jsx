/* eslint-disable prettier/prettier */

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllTypesQuery } from "src/redux/flashSaleType/flashSaleTypeApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import Loading from "src/ui/Loading";
import PaginationButton from "src/ui/pagination/Pagination";
import SearchFieldForm from "src/ui/SearchFieldForm";
import { setUrlParams } from "src/utils/setUrlParam";
import FlashSaleProductTableRowData from "./FlashSaleProductTableRowData";
import { useGetAllFlashProductQuery, useGetAllProductQuery } from "src/redux/products/productsApi";

const MangeFlashSaleProducts = () => {
  const location = useLocation();
  // location.search+"flashProduct=true"
  const { data: products, isLoading, isError } = useGetAllFlashProductQuery(location.search);
  const { data: allTypes, isLoading: typeLoading, isError: typeError } = useGetAllTypesQuery();
  const navigate = useNavigate();

  let content = null;
  let loadingContent = null;
  if (isLoading) {
    loadingContent = <Loading />;
  }
  if (!isLoading && isError) {
    loadingContent = <p className="text-danger">Something was wrong!</p>;
  }
  if (!isLoading && !isError && products?.result?.data?.length === 0) {
    content = <p className="text-danger">No user here</p>;
  }
  if (!isLoading && !isError) {
    content = allTypes?.data?.map((type, index) => (
      <Tab key={index} eventKey={type?.name} title={type?.name}>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
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
              <CTableHeaderCell scope="col">Model</CTableHeaderCell>
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
          {products?.result?.data?.length > 0 ? (
            products?.result?.data
              ?.filter((pro) => {
                return pro?.flashSaleOfferType?.toLowerCase() === type?.name?.toLowerCase();
              })
              ?.map((product, index) => (
                <CTableBody key={index}>
                  <FlashSaleProductTableRowData index={index} product={product} />
                </CTableBody>
              ))
          ) : (
            <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
              No products found
            </CTableDataCell>
          )}
        </CTable>
        <PaginationButton
          searchUrl={location.search}
          totalPageNumber={products?.result?.totalPageNumber}
        />
      </Tab>
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

  const handleTabSelect = (tabName) => {
    const url = setUrlParams("?", "page", 1);
    // status means tab name value variable
    navigate(setUrlParams(url, "flashStatus", tabName));
  };
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* Header start*/}
            <CardHeaderButton to={"/flashSale-product/add"} title={"All FlashSale Product"} />
            {/* Header start*/}

            {/* search field start*/}
            <SearchFieldForm onSubmit={handleSearch} tableData={tableData} isNavigate={true} />
            {/* search field end*/}

            {/* Card main body*/}
            <CCardBody>
              <p className="text-medium-emphasis small">
                Here is the list of all flash sale products
              </p>
              {loadingContent ? (
                loadingContent
              ) : (
                <Tabs
                  defaultActiveKey={allTypes?.data?.[0]?.groupName}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={(e) => handleTabSelect(e)}
                >
                  {content}
                </Tabs>
              )}
            </CCardBody>
            {/* Card main end*/}
            {/* <PaginationButton
              search={location?.search}
              totalPageNumber={products?.result?.totalPageNumber}
            /> */}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default MangeFlashSaleProducts;
