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
import { useGetAllAdminsQuery } from "src/redux/admin/AdminApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import AdminTableRow from "./AdminTableRow";
import Manager from "src/views/settings/manger/Manager";

const ManageAdmins = () => {
  const { data: allAdmins, isLoading: adminLoading, isError: adminError } = useGetAllAdminsQuery();

  let content = null;
  if (adminLoading) {
    content = <p>Loading...</p>;
  }
  if (!adminLoading && adminError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!adminLoading && !adminError && allAdmins?.length === 0) {
    content = <p className="text-danger">There is no admin</p>;
  }
  if (!adminLoading && !adminError && allAdmins?.length > 0) {
    content = allAdmins?.map((admin, index) => (
      <AdminTableRow key={admin?._id} index={index} admin={admin} />
    ));
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton to="." title="Super Admin" />
            <CCardBody>
              <span className="text-medium-emphasis small">
                Here is the list of all admin & mangers
              </span>

              <CTable align="middle" className="mb-0 border" hover responsive bordered>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                      Sl. No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{content}</CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <Manager />
        </CCol>
      </CRow>
    </>
  );
};

export default ManageAdmins;
