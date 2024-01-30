import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleCustomerGroupMutation } from "src/redux/customerGroup/customerGroupApi";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const TableRowData = ({ index, customerGroup }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleCustomerGroup,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteSingleCustomerGroupMutation();

  const handleDeleteCustomerGroup = (id) => {
    deleteSingleCustomerGroup(id);
  };

  useEffect(() => {
    toast.dismiss();
    deleteSuccess && toast.success("Delete successfully", { id: "dSuccess" });
    deleteError && toast.warning("Delete Failed", { id: "dFailed" });
  }, [deleteSuccess, deleteError]);
  return (
    <>
      <DeleteModal
        deleteThis={handleDeleteCustomerGroup}
        showModal={showModal}
        setShowModal={setShowModal}
        id={customerGroup?._id}
        deleteLoading={deleteLoading}
      />
      <CTableRow key={customerGroup?._id}>
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell>{customerGroup?.groupName}</CTableDataCell>
        <CTableDataCell>{`${
          customerGroup?.discountType === "percentage"
            ? `${customerGroup?.discount} %`
            : `${customerGroup?.discount} TK`
        }`}</CTableDataCell>
        <CTableDataCell>{customerGroup?.discountType}</CTableDataCell>
        <CTableDataCell>{customerGroup?.totalAmount}</CTableDataCell>
        <CTableDataCell>
          <div className="">
            <Link to={`/customer-group/edit/${customerGroup?._id}`}>
              <EditButton />
            </Link>
            <CButton
              disabled={deleteLoading}
              type="button"
              color="danger"
              variant="outline"
              className="ms-2 action-btn"
              onClick={() => setShowModal(true)}
            >
              <CIcon icon={cilTrash} />
            </CButton>
          </div>
        </CTableDataCell>
      </CTableRow>
    </>
  );
};

export default TableRowData;
