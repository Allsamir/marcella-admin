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
import { toast } from "react-toastify";
import {
  useDeleteBrandMutation,
  useGetAllManufactureQuery,
} from "src/redux/manufacture/manufactureApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import TableRowData from "./TableRowData";
import { useEffect } from "react";

const ManageManufacturers = () => {
  const {
    data: manufacturers,
    isLoading: getManufacturerLoading,
    isError: manuFactureError,
  } = useGetAllManufactureQuery();
  const [
    deleteBrand,
    {
      isSuccess: deleteSuccess, isError: deleteError, isLoading: deleteLoading
    },
  ] = useDeleteBrandMutation();

  const handleDeleteManufacturer = (id) => {
    deleteBrand(id);
  };

  let content = null;
  if (getManufacturerLoading) {
    content = <p>Loading..</p>;
  }
  if (!getManufacturerLoading && manuFactureError) {
    content = <p className="text-danger">There was an error</p>;
  }
  if (!getManufacturerLoading && !manuFactureError && manufacturers?.result?.length === 0) {
    content = <p>There is no brand</p>;
  }
  if (!getManufacturerLoading && !manuFactureError && manufacturers?.result?.length > 0) {
    content = manufacturers?.result?.map((manufacturer, index) => (
      <TableRowData
        key={manufacturer?._id}
        index={index}
        manufacturer={manufacturer}
        handleDeleteManufacturer={handleDeleteManufacturer}
        deleteLoading={deleteLoading}
      />
    ));
  }

  useEffect(() => {

    deleteSuccess && toast.success("Delete successfully", { id: "dS" });
    deleteError && toast.error("Failed to delete", { id: "dF" });

  }, [deleteSuccess, deleteError])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"Brands"} to={"/manufacturer/add"} />

            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all brands.</p>

              <CTable align="middle" className="mb-0 border" bordered hover responsive>
                <CTableHead color="light">
                  <CTableRow className="text-start">
                    <CTableHeaderCell scope="col" style={{ width: "60px", minWidth: "60px" }}>
                      Sl. No.
                      {/* <Form.Check inline type="checkbox" /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
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

export default ManageManufacturers;
