/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteAdminMutation } from "src/redux/admin/AdminApi";
import DeleteModal from "src/ui/DeleteModal";

const AdminTableRow = ({ admin, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteAdmin,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteAdminMutation();

  useEffect(() => {
    toast.dismiss();
    deleteError && toast.error("Admin delete failed", { id: "dError" });
    deleteSuccess && toast.success("Admin delete success", { id: "dSuccess" });
  }, [deleteError, deleteSuccess]);
  return (
    <>
      <CTableRow>
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell>{admin?.name}</CTableDataCell>
        <CTableDataCell>{admin?.email}</CTableDataCell>
        <CTableDataCell>
          <span className="bg-success p-1 rounded">{admin?.role}</span>
        </CTableDataCell>
        <CTableDataCell>
          <div className="">
            <Link to={`/admin/edit/${admin?._id}?superAdmin=true`}>
              <CButton
                color="success"
                variant="outline"
                style={{ height: "30px", width: "32px", position: "relative" }}
              >
                <CIcon icon={cilPencil} style={{ position: "absolute", top: "25%", left: "25%" }} />
              </CButton>
            </Link>
            <CButton
              color="danger"
              variant="outline"
              style={{ height: "30px", width: "32px", position: "relative" }}
              className="ms-2"
              onClick={() => setShowModal(true)}
            >
              <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
            </CButton>
          </div>
        </CTableDataCell>
      </CTableRow>
      <DeleteModal
        deleteThis={deleteAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
        id={admin?._id}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default AdminTableRow;
