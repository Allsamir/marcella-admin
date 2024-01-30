import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const CancelButton = () => {
  const navigate = useNavigate();

  return (
    <CButton onClick={() => navigate(-1)} color="primary" className="mt-3 me-2">
      Cancel
    </CButton>
  );
};

export default CancelButton;
