import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { useGetAllCustomerGroupQuery } from "src/redux/customerGroup/customerGroupApi";
import PropTypes from "prop-types";
import TableRowData from "./TableRowData";
import CardHeaderButton from "src/ui/CardHeaderButton";

const ManageCustomerGroup = () => {
  const {
    data: allCustomerGroups,
    isLoading: allGroupLoading,
    isError: allGroupError,
  } = useGetAllCustomerGroupQuery();

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"Customer Group"} to={"/customer-group/add"} />

            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all customer group.</p>

              <CTable align="middle" className="mb-0 border" hover responsive bordered>
                <CTableHead>
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                      Sl. No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Active amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allCustomerGroups?.map((customerGroup, index) => (
                    <TableRowData
                      key={customerGroup?._id}
                      index={index}
                      customerGroup={customerGroup}
                    />
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ManageCustomerGroup;
