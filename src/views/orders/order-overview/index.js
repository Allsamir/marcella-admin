import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import { useGetAllOrdersQuery } from 'src/redux/order/orderApi';
import CardHeaderButton from 'src/ui/CardHeaderButton';
import OrderOverviewTable from './OrderOverviewTable';

const OrderOverviewPage = () => {
    const { data: allOrders } = useGetAllOrdersQuery('?page=1&status=Delivered')
    console.log(allOrders?.data)
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CardHeaderButton title={"Order Overview"} to={"/order-overview"} />
                    <CCardBody>
                        <span>Here is all Delivery Order</span>
                        <CTable align="middle" className="mb-0 border" bordered hover responsive>
                            <CTableHead color="light">
                                <CTableRow className="text-start">
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Order Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Order Item</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"> Seller SKU</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Unit Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Operational Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
                                    <CTableHeaderCell
                                        scope="col"
                                        style={{
                                            width: "50px",
                                            minWidth: "100px",
                                        }}
                                    >
                                        Actions
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    allOrders?.data?.map((order, idx) =>
                                        <OrderOverviewTable
                                            key={order?._id}
                                            order={order}
                                            index={idx}
                                        />
                                    )
                                }
                            </CTableBody>
                        </CTable>
                        {/* <PaginationButton
              searchUrl={location.search}
              totalPageNumber={allReports?.result?.totalPageNumber}
            /> */}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default OrderOverviewPage;