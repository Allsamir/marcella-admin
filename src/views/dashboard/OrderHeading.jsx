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
import { stagingContent } from "src/utils/dataLoadStaging";
import { useGetRecentOrderQuery } from "src/redux/order/orderApi";
import TableRowDashboardOrder from "./TableRowDashboardOrder";

const OrderHeading = () => {
    const { data, isLoading, isError } = useGetRecentOrderQuery();
    let content = stagingContent(isLoading, isError, data);
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.map((order, index) => (
            <TableRowDashboardOrder key={order?._id} order={order} index={index} />
        ));
    }

    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>Recent Five Orders</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" bordered hover responsive>
                            <CTableHead color="light">
                                <CTableRow className="text-start">
                                    <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                                        Sl. No.
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Order Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Modify Date</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell
                                        scope="col"
                                        style={{
                                            width: "150px",
                                            minWidth: "150px",
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

export default OrderHeading;
