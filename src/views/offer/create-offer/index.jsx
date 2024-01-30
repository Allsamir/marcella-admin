import { CCol, CRow } from "@coreui/react";

import NewCustomerButton from "./NewCustomerButton";

const CreateOffer = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <div className="mb-4 d-flex gap-2 justify-content-center align-items-center mt-4 flex-wrap">
          <NewCustomerButton />
        </div>
      </CCol>
    </CRow>
  );
};

export default CreateOffer;
