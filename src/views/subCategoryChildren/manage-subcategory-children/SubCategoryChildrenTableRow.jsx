/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSubCategoryChildrenMutation } from "src/redux/subCategoryChildren/subCategoryChildrenApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const SubCategoryChildrenTableRow = ({ subcategory, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSubCategoryChildren, { isLoading: deleteLoading, isSuccess, isError }] =
    useDeleteSubCategoryChildrenMutation();

  const handleDeleteSubcategory = (id) => {
    deleteSubCategoryChildren(id);
  };

  useEffect(() => {
    toast.dismiss();
    isError && toast.error("Delete failed", { id: "dError" });
    isSuccess && toast.success("Delete successfully", { id: "dSuccess" });
  }, [isError, isSuccess]);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{subcategory?.title}</CTableDataCell>
      <CTableDataCell>{subcategory?.subcategory?.title}</CTableDataCell>
      <CTableDataCell>{subcategory?.subcategory?.parent?.title}</CTableDataCell>
      <CTableDataCell>
        {subcategory?.nicheCategory ? (
          <span className="bg-success p-1 text-white rounded">Yes</span>
        ) : (
          <span className="bg-danger p-1 text-white rounded">No</span>
        )}
      </CTableDataCell>
      <CTableDataCell>
        <div>
          <Link to={`/subcategory-children/edit/${subcategory?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteSubcategory}
        showModal={showModal}
        setShowModal={setShowModal}
        id={subcategory._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default SubCategoryChildrenTableRow;
