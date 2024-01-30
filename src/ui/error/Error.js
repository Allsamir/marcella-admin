import { CTableDataCell } from "@coreui/react";

const Error = ({ children }) => {
  return (
    <CTableDataCell colSpan={"100%"} className="text-danger text-center py-2">
      {children}
    </CTableDataCell>
  );
};

export default Error;
