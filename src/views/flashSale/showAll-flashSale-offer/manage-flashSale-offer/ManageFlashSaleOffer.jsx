import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CardHeaderButton from "src/ui/CardHeaderButton";
import { useGetFlashSaleOfferQuery } from "src/redux/flashSaleOffer/flashSaleOfferApi";
import Loading from "src/ui/Loading";
import Error from "src/ui/error/Error";
import OfferTableRowData from "./OfferTableRowData";
const ManageFlashSaleOffer = () => {
  const { data, isLoading, isError } = useGetFlashSaleOfferQuery();
  let content = null;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <Error>Something was wrong!</Error>;
  }
  if (!isLoading && !isError && data?.result?.length === 0) {
    content = <Error>No Flash Offer here</Error>;
  }
  if (!isLoading && !isError && data?.result?.length > 0) {
    content = data?.result?.map((offer, index) => (
      <OfferTableRowData key={offer?._id} offer={offer} index={index} />
    ));
  }

  return (
    <CCard>
      <CardHeaderButton title={"All Offers"} to="/flashSale-offer/add" />
      <CCardBody>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
              <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                Sl. No.
                {/* <Form.Check inline type="checkbox" /> */}
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                style={{
                  width: "300px",
                  minWidth: "300px",
                }}
              >
                Name
              </CTableHeaderCell>

              <CTableHeaderCell
                scope="col"
                style={{
                  width: "150px",
                  minWidth: "150px",
                }}
              >
                timer
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                style={{
                  width: "150px",
                  minWidth: "150px",
                }}
              >
                Status
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                style={{
                  width: "150px",
                  minWidth: "150px",
                }}
              >
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>{content}</CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default ManageFlashSaleOffer;
