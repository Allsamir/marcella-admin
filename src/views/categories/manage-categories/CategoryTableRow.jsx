/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteCategoryMutation } from "src/redux/category/categoryApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const CategoryTableRow = ({ category, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteCategory, { isLoading: deleteLoading, isError, isSuccess }] =
    useDeleteCategoryMutation();

  const handleDeleteCategory = (id) => {
    deleteCategory(id);
  };
  useEffect(() => {
    isSuccess && toast.success(`This category is deleted successFully`, { id: "dSuccess" });
    isError && toast.error(`There are something wrong`);
  }, [isSuccess, isError]);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      {/* <CTableHeaderCell scope="row">
                <Image width={50} src={category?.image} alt={category?.title} />
            </CTableHeaderCell> */}
      <CTableDataCell>{category?.title}</CTableDataCell>
      <CTableDataCell>{category?.sortOrder}</CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/category/edit/${category?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteCategory}
        showModal={showModal}
        setShowModal={setShowModal}
        id={category._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default CategoryTableRow;
