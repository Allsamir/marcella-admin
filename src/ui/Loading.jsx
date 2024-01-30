import { CTableDataCell } from "@coreui/react";

const Loading = () => {
  return (
    <CTableDataCell colSpan={"100%"} className="text-center d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </CTableDataCell>
  );
};

export default Loading;
