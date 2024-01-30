/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSubCategoryMutation } from "src/redux/subCategory/subCategoryApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const SubcategoryTableRow = ({ subcategory, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSubCategory, { isLoading, isSuccess, isError }] = useDeleteSubCategoryMutation();
  const handleDeleteSubcategory = (id) => {
    deleteSubCategory(id);
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
      <CTableDataCell>{subcategory?.parent?.title}</CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/subcategory/edit/${subcategory?._id}`}>
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
        deleteLoading={isLoading}
      />
    </CTableRow>
  );
};

export default SubcategoryTableRow;
