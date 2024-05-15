/* eslint-disable prettier/prettier */
import { cilSettings } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,

  CRow,
} from "@coreui/react";
import DynamicCode from "src/components/dynamicCode/DynamicCode";

const Settings = () => {


  return (
    <>
      {/* <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilSettings} className="nav-icon" /> <strong>Settings</strong>
            </CCardHeader>
            <CCardBody> */}
              <DynamicCode />
            {/* </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};

export default Settings;
