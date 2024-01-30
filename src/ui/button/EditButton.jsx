import { cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTooltip } from "@coreui/react";
import React from "react";

const EditButton = () => {
  return (
    <CTooltip content="Update">
      <CButton
        className="ms-2 mb-1"
        style={{ height: "30px", width: "32px", position: "relative" }}
        color="success"
        variant="outline"
      >
        <CIcon icon={cilPencil} style={{ position: "absolute", top: "25%", left: "25%" }} />
      </CButton>
    </CTooltip>
  );
};

export default EditButton;
