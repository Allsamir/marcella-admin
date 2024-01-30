import { cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCardHeader, CTooltip } from "@coreui/react";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";

const CardHeaderButton = ({ to, title }) => {
  return (
    <CCardHeader className="d-flex align-items-center justify-content-between">
      <strong className="d-flex align-items-center gap-2">
        {" "}
        <CgMenuGridO />
        {title}
      </strong>

      <div className="d-flex align-items-center">
        <CTooltip content="Create">
          <Link to={to}>
            <CButton
              color="primary"
              style={{
                height: "30px",
                width: "32px",
                position: "relative",
              }}
            >
              <CIcon icon={cilPlus} style={{ position: "absolute", top: "25%", left: "25%" }} />
            </CButton>
          </Link>
        </CTooltip>
        <CButton
          color="danger"
          className="ms-2 "
          style={{
            height: "30px",
            width: "32px",
            position: "relative",
            cursor: "not-allowed",
          }}
        >
          <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
        </CButton>
      </div>
    </CCardHeader>
  );
};

export default CardHeaderButton;
