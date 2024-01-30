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
import { useGetAllFooterQuery } from "src/redux/footer/footerApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import FooterTableRow from "./FooterTableRow";
import Loading from "src/ui/Loading";

const ManageFooter = () => {
  const { data: allFooter, isLoading: adminLoading, isError: adminError } = useGetAllFooterQuery();

  let content = null;
  if (adminLoading) {
    content = <Loading />
  }
  if (!adminLoading && adminError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!adminLoading && !adminError && allFooter?.data?.length === 0) {
    content = <p className="text-danger">There is no admin</p>;
  }
  if (!adminLoading && !adminError && allFooter?.data?.length > 0) {
    content = allFooter?.data?.map((footer, index) => (
      <FooterTableRow key={footer?._id} index={index} footer={footer} />
    ));
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CardHeaderButton to="/footer/add" title="Footer Text" />
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive bordered>
              <CTableHead color="light">
                <CTableRow className="text-start">
                  <CTableHeaderCell scope="col" style={{ width: "3.75rem" }}>
                    Sl. No.
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Text</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{width:"100px"}}>Actions</CTableHeaderCell>
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

export default ManageFooter;
