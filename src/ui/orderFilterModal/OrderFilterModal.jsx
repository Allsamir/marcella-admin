/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import "./modal.scss";
import { useForm } from "react-hook-form";
import { useDeleteOrderByIdMutation, useGetAllOrdersByFilterQuery } from "src/redux/order/orderApi";
import PaginationButton from "../pagination/Pagination";
import Loading from "../Loading";
import TableRowData from "src/views/orders/manage-orders/TableRowData";
import UserInfo from "./UserInfo";

const OrderStatusModal = ({ showModal, setShowModal, query, showUserInfo }) => {
  const [isQuery, setIsQuery] = useState(true);

  const {
    data: filterData,
    isLoading: getLoading,
    isError: getError,
  } = useGetAllOrdersByFilterQuery(query, { skip: isQuery });

  const [
    deleteOrderById,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteOrderByIdMutation();

  useEffect(() => {
    if (query?.length > 2) {
      setIsQuery(false);
    }
  }, [query]);

  const handleDeleteOrder = (id) => {
    deleteOrderById(id);
  };

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
  if (!getLoading && !getError && filterData?.data?.length === 0) {
    content = (
      <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
        No data found
      </CTableDataCell>
    );
  }
  if (!getLoading && !getError && filterData?.data?.length > 0) {
    content = filterData?.data?.map((order, index) => (
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
    <CModal
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      className="orderModal"
      style={{ minHeight: "50vh" }}
    >
      <CModalHeader closeButton className="fw-bold fs-5">
        Your searching results
      </CModalHeader>
      <CModalBody>
        <>
          {/* user info */}
          {showUserInfo && <UserInfo filterData={filterData?.orderInfo} />}
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
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
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
          {/* <PaginationButton searchUrl={location.search} totalPageNumber={pages} /> */}
        </>
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  );
};

export default OrderStatusModal;
