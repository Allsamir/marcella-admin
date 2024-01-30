import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteOrderByIdMutation } from "src/redux/order/orderApi";
import PaginationButton from "src/ui/pagination/Pagination";
import TableRowData from "./TableRowData";
import Loading from "src/ui/Loading";

const SingleTab = ({ c, allOrders, getLoading, pages }) => {
  const location = useLocation();

  const [
    deleteOrderById,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, getError, isError: deleteError },
  ] = useDeleteOrderByIdMutation();

  const handleDeleteOrder = (id) => {
    deleteOrderById(id);
  };

  useEffect(() => {
    deleteSuccess && toast.success("Delete successfully");
    deleteError && toast.error("Delete Failed");
  }, [deleteSuccess, deleteError]);

  let content = null;
  if (getLoading) {
    content = <Loading />;
  }
  if (!getLoading && getError) {
    content = (
      <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
        There was an error, try again.
      </CTableDataCell>
    );
  }
  if (!getLoading && !getError && allOrders.length === 0) {
    content = (
      <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
        No data found
      </CTableDataCell>
    );
  }
  if (!getLoading && !getError && allOrders.length > 0) {
    content = allOrders
      ?.filter((ord) => {
        return ord?.status?.toLowerCase() === c?.toLowerCase();
      })
      ?.map((order, index) => (
        <CTableBody key={order?._id}>
          <TableRowData
            handleDeleteOrder={handleDeleteOrder}
            deleteLoading={deleteLoading}
            index={index}
            order={order}
          />
        </CTableBody>
      ));
  }

  return (
    <>
      <CTable align="middle" className="mb-0 border" bordered hover responsive>
        <CTableHead color="light">
          <CTableRow className="text-start">
            <CTableHeaderCell scope="col" style={{ width: "60px" }}>
              Sl. No.
            </CTableHeaderCell>
            <CTableHeaderCell
              scope="col"
              style={{
                width: "200px",
              }}
            >
              Customer
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Order Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Shipping Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Modify Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order Status</CTableHeaderCell>
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
        {content}
      </CTable>
      <PaginationButton searchUrl={location.search} totalPageNumber={pages} />
    </>
  );
};

export default SingleTab;
