import { cilCheckCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteSingleFlashSaleOfferByIdMutation,
  useUpdateSingleFlashSaleOfferMutation,
} from "src/redux/flashSaleOffer/flashSaleOfferApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const OfferTableRowData = ({ offer, index }) => {
  const [modal, setShowModal] = useState(false);
  const [
    updateSingleFlashSaleOffer,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleFlashSaleOfferMutation();

  const [
    deleteSingleFlashSaleOfferById,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess, error: dError },
  ] = useDeleteSingleFlashSaleOfferByIdMutation();

  // handle status update active or inactive
  const handleStatusUpdate = (status, timeStamps) => {
    // in active status hook call
    const id = offer?._id;
    const data = {
      status,
      timeStamps,
    };
    updateSingleFlashSaleOffer({ id, data });
  };

  let time = "";
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // when time duration is completed then call a function which will be disabled status
      // ::::::::: ISSUES ISSUES -> maximum update depth ::::::://
      // return handleStatusUpdate();
    } else {
      // Render a countdown
      return (time = (
        <span
          style={{
            backgroundColor: "#251B37",
            color: "#38E54D",
            letterSpacing: "1px",
            fontFamily: "digital-clock-font",
            fontWeight: "700",
          }}
          className=" p-1 rounded"
        >
          {days}:{hours}:{minutes}:{seconds}
        </span>
      ));
    }
  };

  useEffect(() => {
    toast.dismiss();
    deleteError && toast.error(dError?.data.message, { id: "dError" });
    deleteSuccess && toast.success("Delete Success", { id: "dSuccess" });
    updateError && toast.error(updateMsg?.data.message, { id: "uError" });
    updateSuccess && toast.success("Offer Updated Success", { id: "uSuccess" });
  }, [deleteSuccess, deleteError, updateSuccess, updateError]);

  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{offer?.name}</CTableDataCell>
      <CTableDataCell style={{ backgroundColor: offer?.color }}>{offer?.color}</CTableDataCell>
      <CTableDataCell>
        {offer?.timeStamps && offer?.status === "active" ? (
          <Countdown date={offer?.timeStamps} renderer={renderer}>
            {time}
          </Countdown>
        ) : (
          ""
        )}
      </CTableDataCell>
      {/* {"00 days : 00 hours : 00 minutues : 00 seconds"} */}
      {offer?.status === "active" ? (
        <CTableDataCell>
          <span className=" bg-success text-white rounded px-2 py-1">{offer?.status}</span>
        </CTableDataCell>
      ) : (
        <CTableDataCell>
          <span className=" bg-danger text-white rounded px-2 py-1">{offer?.status}</span>
        </CTableDataCell>
      )}

      <CTableDataCell>
        {offer?.status === "active" ? (
          <CTooltip content="De Active Offer">
            <CButton
              color="info"
              variant="outline"
              disabled={updateLoading}
              className="ms-2"
              onClick={() => handleStatusUpdate("in-active", offer?.timeStamps)}
              style={{ height: "30px", width: "32px", position: "relative" }}
            >
              <CIcon
                icon={cilCheckCircle}
                style={{ position: "absolute", top: "25%", left: "25%" }}
              />
            </CButton>
          </CTooltip>
        ) : (
          <CTooltip content="Active">
            <CButton
              color="info"
              variant="outline"
              disabled={updateLoading}
              className="ms-2"
              onClick={() => handleStatusUpdate("active", offer?.timeStamps)}
              style={{ height: "30px", width: "32px", position: "relative" }}
            >
              <CIcon
                icon={cilCheckCircle}
                style={{ position: "absolute", top: "25%", left: "25%" }}
              />
            </CButton>
          </CTooltip>
        )}
        {/* <Link to={`/flashSale-offer/edit/${offer?._id}`}> */}
        <Link to={`/flashSale-offer/edit/${offer?._id}`}>
          <EditButton />
        </Link>

        <DeleteButton setShowModal={setShowModal} />
      </CTableDataCell>

      <DeleteModal
        deleteThis={deleteSingleFlashSaleOfferById}
        showModal={modal}
        setShowModal={setShowModal}
        id={offer._id}
        deleteLoading={deleteLoading}
      />

      {/* This modal use for active or in-active  offer*/}
      {/* <UpdateOfferStatusModal
      showModal={updateShowModal}
      setShowModal={setUpdateShowModal}
      handleActiveOffer={handleActiveStatus}
    /> */}

      {/* this modal use for edit/update offer */}
    </CTableRow>
  );
};

export default OfferTableRowData;
