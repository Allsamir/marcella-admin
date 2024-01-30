import { CButton, CTooltip } from "@coreui/react";
import { BsEye } from "react-icons/bs";

const EyeButton = ({ handleClick }) => {
  return (
    <CTooltip content="View">
      <CButton
        onClick={handleClick}
        className="mb-1  ms-2"
        style={{ height: "30px", width: "32px", position: "relative" }}
        color="info"
        variant="outline"
      >
        <BsEye style={{ position: "absolute", top: "25%", left: "25%" }} />
      </CButton>
    </CTooltip>
  );
};

export default EyeButton;
