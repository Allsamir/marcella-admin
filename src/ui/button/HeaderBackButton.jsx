import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCardHeader, CTooltip } from "@coreui/react";
import { Image } from "react-bootstrap";
import { CgMenuGridO } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import back from "../../assets/brand/back.png";

const HeaderBackButton = ({ to, title }) => {
  const navigate = useNavigate();
  return (
    <CCardHeader className="d-flex align-items-center justify-content-between">
      <strong className="d-flex align-items-center gap-2">
        {" "}
        <CgMenuGridO />
        {title}
      </strong>
      <CTooltip content="Back">
        <div
          style={{ cursor: "pointer" }}
          className="d-flex border py-1 px-2"
          onClick={() => navigate(-1)}
        >
          <Image src={back} style={{ width: "20px" }} />
        </div>
      </CTooltip>
    </CCardHeader>
  );
};

export default HeaderBackButton;
