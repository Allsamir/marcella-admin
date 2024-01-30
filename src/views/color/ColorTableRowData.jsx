/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleColorMutation } from "src/redux/variants/variantsApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const ColorTableRowData = ({ index, color }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleColor,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleColorMutation();

  // delete color
  const handleDeleteColor = () => {
    deleteSingleColor(color?._id);
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
        <p>{color?.name}</p>
      </CTableHeaderCell>

      <CTableDataCell>
        <div className="">
          <Link to={`/color/edit/${color?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteColor}
        showModal={showModal}
        setShowModal={setShowModal}
        id={color?._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default ColorTableRowData;
