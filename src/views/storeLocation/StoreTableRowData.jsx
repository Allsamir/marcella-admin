/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleStoreMutation } from "src/redux/storeLocation/storeLocationApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const StoreTableRowData = ({ index, blog }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleStore,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleStoreMutation();

  // delete blog
  const handleDeleteBlog = () => {
    deleteSingleStore(blog?._id);
  };

  useEffect(() => {
    toast.dismiss();
    isSuccess && toast.success("Delete successfully", { id: "dSuccess" });
    deleteError && toast.error("Delete failed", { id: "dFailed" });
  }, [isSuccess, deleteError]);

  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableHeaderCell scope="row">
        <p>{new Date(blog?.createdAt).toDateString()}</p>
      </CTableHeaderCell>
      <CTableDataCell>
        {<div dangerouslySetInnerHTML={{ __html: blog?.description }} />}
      </CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/pages/store-location/edit/${blog?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteBlog}
        showModal={showModal}
        setShowModal={setShowModal}
        id={blog._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default StoreTableRowData;
