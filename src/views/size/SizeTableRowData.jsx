/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleStoreMutation } from "src/redux/storeLocation/storeLocationApi";
import { useDeleteSingleSizeMutation } from "src/redux/variants/variantsApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const SizeTableRowData = ({ index, size }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleSize,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleSizeMutation();

  // delete size
  const handleDeleteSize = () => {
    deleteSingleSize(size?._id);
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
        <p>{size?.name}</p>
      </CTableHeaderCell>

      <CTableDataCell>
        <div className="">
          <Link to={`/size/edit/${size?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteSize}
        showModal={showModal}
        setShowModal={setShowModal}
        id={size?._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default SizeTableRowData;
