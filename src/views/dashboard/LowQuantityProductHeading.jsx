/* eslint-disable prettier/prettier */
import {
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
import { useGetAllLowQuantityProductQuery } from "src/redux/products/productsApi";
import { stagingContent } from "src/utils/dataLoadStaging";
import ProductTableRow from "../products/manage-products/ProductTableRow";

const LowQuantityProductHeading = () => {
  const { data, isLoading, isError } = useGetAllLowQuantityProductQuery();

  let content = stagingContent(isLoading, isError, data?.data);
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product, index) => (
      <ProductTableRow
        key={product?._id}
        // handleDeleteProduct={handleDeleteProduct}
        product={product}
        index={index}
        // deleteLoading={deleteLoading}
      />
    ));
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Low Quantity Products</CCardHeader>
          <CCardBody style={{ maxHeight: "350px", overflowY: "scroll" }}>
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
                    {/* <Form.Check inline type="checkbox" /> */}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default LowQuantityProductHeading;
