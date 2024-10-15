import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import CardHeaderButton from 'src/ui/CardHeaderButton';
import HeaderIndexTable from './HeaderIndexTable';
import BodyIndexTable from './BodyIndexTable';

const DynamicCode = () => {
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CardHeaderButton title={"Headers"} to={"/settings/header/add"} />

                        <CCardBody>
                            <p className="text-medium-emphasis small">Here is the list of all Header Scripts.</p>

                            <CTable align="middle" className="mb-0 border" bordered hover responsive>
                                <CTableHead color="light">
                                    <CTableRow className="text-start">
                                        <CTableHeaderCell scope="col" style={{ width: "60px", minWidth: "60px" }}>
                                            Sl. No.
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
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
                                <CTableBody>
                                    <HeaderIndexTable />
                                </CTableBody>
                            </CTable>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CardHeaderButton title={"Body"} to={"/settings/body/add"} />
                        <CCardBody>
                            <p className="text-medium-emphasis small">Here is the list of all Body Scripts.</p>

                            <CTable align="middle" className="mb-0 border" bordered hover responsive>
                                <CTableHead color="light">
                                    <CTableRow className="text-start">
                                        <CTableHeaderCell scope="col" style={{ width: "60px", minWidth: "60px" }}>
                                            Sl. No.
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
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
                                <CTableBody>
                                    <BodyIndexTable />
                                </CTableBody>
                            </CTable>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default DynamicCode;