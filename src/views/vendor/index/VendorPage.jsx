import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import CardHeaderButton from 'src/ui/CardHeaderButton';
import VendorTable from '../vendorTable/VendorTable';

const VendorPage = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CardHeaderButton title={"All Vendors"} to={"/vendor"} />
                    <CCardBody>
                        <span>Here is all vendors</span>
                        <CTable align="middle" className="mb-0 border" bordered hover responsive>
                            <CTableHead color="light">
                                <CTableRow className="text-start">
                                    <CTableHeaderCell scope="col">Sl. No.</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Shop Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"> Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
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
                                <VendorTable />
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

export default VendorPage;