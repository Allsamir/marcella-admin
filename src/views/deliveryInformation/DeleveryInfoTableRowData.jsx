/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleDeliveryInfoMutation } from "src/redux/deliveryInfo/deliveryInfoApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const DeliveryInfoTableRowData = ({ index, delivery }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleDeliveryInfo,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleDeliveryInfoMutation();

  // delete blog
  const handleDeleteBlog = () => {
    deleteSingleDeliveryInfo(delivery?._id);
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
        <p>{new Date(delivery?.createdAt).toDateString()}</p>
      </CTableHeaderCell>
      <CTableDataCell>
        {<div dangerouslySetInnerHTML={{ __html: delivery?.description }} />}
      </CTableDataCell>
      <CTableDataCell>
        {<div dangerouslySetInnerHTML={{ __html: delivery?.banglaDescription }} />}
      </CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/pages/delivery-info/edit/${delivery?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteBlog}
        showModal={showModal}
        setShowModal={setShowModal}
        id={delivery?._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default DeliveryInfoTableRowData;
