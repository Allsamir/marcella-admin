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
import CardHeaderButton from "src/ui/CardHeaderButton";
import RulesTableRow from "./RulesTableRow";
import { useGetAllRulesQuery } from "src/redux/rules/rulesApi";
import Error from "src/ui/error/Error";
import Loading from "src/ui/Loading";

const ManageRules = () => {
  const { data: rules, isLoading: getLoading, isError: getError } = useGetAllRulesQuery();

  let content = null;
  if (getLoading) {
    content = <Loading />
  }
  if (!getLoading && getError) {
    content = <Error>There was an error </Error>;
  }
  if (!getLoading && !getError && rules?.result?.length === 0) {
    content = <Error>There is no rules</Error>;
  }

  if (!getLoading && !getError && rules?.result?.length > 0) {
    content = rules?.result?.map((category, index) => (
      <RulesTableRow key={category?._id} category={category} index={index} />
    ));
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Rules"} to={"/rules/add"} />
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all rules.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                      Sl. No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: "5rem" }}>
                      Icon
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
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

export default ManageRules;
