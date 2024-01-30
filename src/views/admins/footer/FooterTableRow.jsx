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
import { useDeleteSingleFooterMutation } from "src/redux/footer/footerApi";
import EditButton from "src/ui/button/EditButton";

const FooterTableRow = ({ footer, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleFooter,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteSingleFooterMutation();

  useEffect(() => {
    toast.dismiss();
    deleteError && toast.error("Delete failed", { id: "dError" });
    deleteSuccess && toast.success("Delete success", { id: "dSuccess" });
  }, [deleteError, deleteSuccess]);
  return (
    <>
      <CTableRow>
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell>{footer?.text}</CTableDataCell>
        <CTableDataCell>
          <div className="">
            <Link to={`/footer/edit/${footer?._id}`}>
              <EditButton />
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
        deleteThis={deleteSingleFooter}
        showModal={showModal}
        setShowModal={setShowModal}
        id={footer?._id}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default FooterTableRow;
