/* eslint-disable prettier/prettier */
import { cilCheckCircle, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { useState } from "react";
import Countdown from "react-countdown";
import DeleteButton from "src/ui/button/DeleteButton";
import CreateOfferModal from "src/ui/CreateOfferModal";
import DeleteModal from "src/ui/DeleteModal";

const ShowOfferTableRowParent = ({
  offer,
  index,
  deleteThis,
  inActiveThis,
  deleteLoading,

  // update modal props
  updateLoading,
  handleUpdateFunction,
  title,
  offerPropsData,
  defaultOfferData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  // when time duration is finished then call this function
  const handleInActiveStatus = (status, timeStamps) => {
    // in active status hook call
    const id = offer?._id;
    const data = {
      status,
      timeStamps,
    };

    inActiveThis({ id, data });
  };

  let time = "";
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // when time duration is completed then call a function which will be disabled status
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

  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{offer?.name}</CTableDataCell>
      <CTableDataCell>{offer?.discountType}</CTableDataCell>
      <CTableDataCell>{offer?.discount}</CTableDataCell>
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
              onClick={() => handleInActiveStatus("in-active", offer?.timeStamps)}
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
              disabled={updateLoading}
              variant="outline"
              className="ms-2"
              onClick={() => handleInActiveStatus("active", offer?.timeStamps)}
              style={{ height: "30px", width: "32px", position: "relative" }}
            >
              <CIcon
                icon={cilCheckCircle}
                style={{ position: "absolute", top: "25%", left: "25%" }}
              />
            </CButton>
          </CTooltip>
        )}
        <CTooltip content="Edit">
          <CButton
            color="success"
            variant="outline"
            className="ms-2"
            onClick={() => setEditShowModal(true)}
            style={{
              height: "30px",
              width: "32px",
              position: "relative",
            }}
          >
            <CIcon icon={cilPencil} style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </CTooltip>

        <DeleteButton setShowModal={setShowModal} />
      </CTableDataCell>

      <DeleteModal
        deleteThis={deleteThis}
        showModal={showModal}
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
      <CreateOfferModal
        setShowModal={setEditShowModal}
        showModal={editShowModal}
        offerPropsData={offerPropsData}
        title={title}
        handleUpdateFunction={handleUpdateFunction}
        isLoading={updateLoading}
        isUpdate={true}
        defaultOfferData={defaultOfferData}
      />
    </CTableRow>
  );
};

export default ShowOfferTableRowParent;
