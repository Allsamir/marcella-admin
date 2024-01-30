import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTooltip } from "@coreui/react";

const DeleteButton = ({ setShowModal }) => {
  return (
    <CTooltip content="Delete">
      <CButton
        color="danger"
        variant="outline"
        style={{ height: "30px", width: "32px", position: "relative" }}
        className="ms-2 mb-1"
        onClick={() => setShowModal(true)}
      >
        <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
      </CButton>
    </CTooltip>
  );
};

export default DeleteButton;
