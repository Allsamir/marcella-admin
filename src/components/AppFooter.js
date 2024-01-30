import { CFooter } from "@coreui/react";
import React from "react";

const AppFooter = () => {
  return (
    <CFooter>
      <span className="ms-1">{new Date().getFullYear()} &copy; Bengal Software.</span>
    </CFooter>
  );
};

export default React.memo(AppFooter);
