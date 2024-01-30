/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleTypesMutation } from "src/redux/flashSaleType/flashSaleTypeApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const FlashTableRowData = ({ index, type }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleTypes,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleTypesMutation();

  // delete size
  const handleDeleteSize = () => {
    deleteSingleTypes(type?._id);
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
        <p>{type?.name}</p>
      </CTableHeaderCell>

      <CTableDataCell>
        <div className="">
          <Link to={`/flashSale-types/edit/${type?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteSize}
        showModal={showModal}
        setShowModal={setShowModal}
        id={type?._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default FlashTableRowData;
