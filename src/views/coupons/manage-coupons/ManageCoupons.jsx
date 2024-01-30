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

import { useGetAllCouponsQuery } from "src/redux/coupons/couponsApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import TableRowData from "./TableRowData";

const ManageCoupons = () => {
  const { data: coupons, isLoading: couponLoading, isError: couponError } = useGetAllCouponsQuery();

  let content = null;
  if (couponLoading) {
    content = <p>Loading..</p>;
  }
  if (!couponLoading && couponError) {
    content = <p className="text-danger">There is something wrong!</p>;
  }
  if (!couponLoading && !couponError && coupons?.length === 0) {
    content = <p className="text-danger">There is no coupon.</p>;
  }
  if (!couponLoading && !couponError && coupons?.length > 0) {
    content = coupons?.map((coupon, index) => (
      <TableRowData key={coupon?._id} index={index} coupon={coupon} />
    ));
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Coupons"} to={"/coupon/add"} />
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all coupons.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                      Sl. No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Coupon Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Active amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Expire date</CTableHeaderCell>
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

export default ManageCoupons;
