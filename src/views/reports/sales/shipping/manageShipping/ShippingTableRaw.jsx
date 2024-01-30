/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteShippingByIdMutation } from "src/redux/shipping/shippingApi";
import DeleteModal from "src/ui/DeleteModal";
const ShippingTableRaw = ({ data, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteShippingById, { isLoading: deleteLoading, isError, isSuccess }] =
    useDeleteShippingByIdMutation();

  const handleDeleteShipping = () => {
    deleteShippingById(data._id);
  };
  useEffect(() => {
    isSuccess && toast.success(`This shipping deleted successFully`, { id: "dSuccess" });
    isError && toast.error(`Failed to delete shipping`);
  }, [isError, isSuccess]);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{data?.name}</CTableDataCell>
      <CTableDataCell className="d-flex gap-2 flex-wrap">
        {data?.upazila &&
          data?.upazila.map((up, index) => (
            <span
              style={{
                backgroundColor: "green",

                padding: "4px",
                borderRadius: "2px",
                color: "white",
              }}
              key={index + 1}
            >
              {up}
            </span>
          ))}
      </CTableDataCell>
      <CTableDataCell>{data?.price}</CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/shipping/edit/${data?._id}`}>
            <CButton
              color="success"
              variant="outline"
              style={{ height: "30px", width: "32px", position: "relative" }}
            >
              <CIcon icon={cilPencil} style={{ position: "absolute", top: "25%", left: "25%" }} />
            </CButton>
          </Link>
          <CButton
            color="danger"
            variant="outline"
            style={{ height: "30px", width: "32px", position: "relative" }}
            onClick={() => setShowModal(true)}
            className="ms-2"
          >
            <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteShipping}
        showModal={showModal}
        setShowModal={setShowModal}
        id={data._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default ShippingTableRaw;
