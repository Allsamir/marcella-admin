import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useDeleteManagerMutation } from "src/redux/admin/AdminApi";
import DeleteModal from "src/ui/DeleteModal";
import EditButton from "src/ui/button/EditButton";

const MangerTableRowData = ({ manager, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteManager, { isLoading, isError, isSuccess }] = useDeleteManagerMutation();
  const { email } = useSelector((state) => state.auth) || {};

  useEffect(() => {
    isSuccess && toast.success("Delete  Success");
    isError && toast.error("Delete  Failed");
  }, [isSuccess, isError]);

  const handleDelete = () => {
    deleteManager({ id: manager?._id, currentUserEmail: email });
  };

  return (
    <CTableRow key={manager?._id}>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>

      <CTableDataCell>{manager?.name}</CTableDataCell>
      <CTableDataCell>{manager?.email}</CTableDataCell>
      <CTableDataCell>
        {" "}
        <span className={` ${manager?.role === "admin" ? "bg-success" : "bg-warning"} p-1 rounded text-white`}>
          {manager?.role}
        </span>
      </CTableDataCell>

      <CTableDataCell>{new Date(manager?.createdAt).toLocaleDateString()}</CTableDataCell>

      <CTableDataCell>
        <Link to={`/admin/edit/${manager?._id}`}>
          <EditButton />
        </Link>

        <CTooltip content="Delete">
          <CButton
            color="danger"
            variant="outline"
            style={{ height: "30px", width: "32px", position: "relative" }}
            className="ms-2 mb-1"
            onClick={() => setShowModal(true)}
          >
            <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </CTooltip>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDelete}
        showModal={showModal}
        setShowModal={setShowModal}
        id={manager?._id}
        deleteLoading={isLoading}
      />
    </CTableRow>
  );
};

export default MangerTableRowData;
