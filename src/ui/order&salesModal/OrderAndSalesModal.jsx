/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";
import { useState } from "react";
import "./salsesModal.scss";
import { useForm } from "react-hook-form";
import {
  useDeleteOrderByIdMutation,
  useGetTotalSalesByDateMutation,
} from "src/redux/order/orderApi";
import TableRowData from "src/views/orders/manage-orders/TableRowData";
import Loading from "../Loading";

const OrderAndSalesModal = ({ showModal, setShowModal }) => {
  const { register, errors, handleSubmit, reset } = useForm();

  const [getTotalSalesByDae, { data, isLoading: getLoading, isError: getError }] =
    useGetTotalSalesByDateMutation();

  const handleSearch = (data) => {
    const data2 = {
      fromDate: data.fromDate,
      toDate: data.toDate,
    };
    getTotalSalesByDae({ data: data2 });
    // reset();
  };

  const [
    deleteOrderById,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteOrderByIdMutation();

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
  if (!getLoading && !getError && data?.orders?.length === 0) {
    content = (
      <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
        No data found
      </CTableDataCell>
    );
  }
  if (!getLoading && !getError && data?.orders?.length > 0) {
    content = (
      <CTable
        style={{ overflowY: "scroll" }}
        align="middle"
        className="my-3 border"
        bordered
        hover
        responsive
      >
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
        {data?.orders?.map((order, index) => (
          <CTableBody key={order?._id}>
            <TableRowData
              handleDeleteOrder={handleDeleteOrder}
              deleteLoading={deleteLoading}
              index={index}
              order={order}
            />
          </CTableBody>
        ))}
      </CTable>
    );
  }
  let numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <CModal
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      className="salesModal"
    >
      <CModalHeader closeButton>Search Here</CModalHeader>
      <CModalBody>
        <CForm id="filter" onSubmit={handleSubmit(handleSearch)}>
          <div className="d-flex gap-2 justify-content-between">
            <div style={{ width: "45%" }}>
              <label htmlFor="">From</label>
              <div>
                <CFormInput
                  type="date"
                  {...register("fromDate", {
                    required: {
                      value: true,
                    },
                  })}
                />
                {errors?.fromDate && <p className="text-danger">From date required</p>}
              </div>
            </div>
            <div style={{ width: "45%" }}>
              <label htmlFor="">To</label>
              <div>
                <CFormInput
                  type="date"
                  {...register("toDate", {
                    required: {
                      value: true,
                      message: "To date required",
                    },
                  })}
                />
                {errors?.toDate && <p className="text-danger">To date required</p>}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <CButton type="submit" form="filter" color="success">
              {getLoading ? "Loading.." : "Search"}
            </CButton>
          </div>
        </CForm>
        {data && (
          <div className="d-flex justify-content-between my-4">
            <div className="salesCard sales">
              <p className="fs-5 fw-bold">{numberWithCommas(data?.totalSales)}</p>
              <p>Total sales</p>
            </div>
            <div className="salesCard shipping">
              <p className="fs-5 fw-bold">{numberWithCommas(data?.totalShipping)}</p>
              <p>Total shipping</p>
            </div>
            <div className="salesCard orders">
              <p className="fs-5 fw-bold">{numberWithCommas(data?.totalOrders)}</p>
              <p>Total orders</p>
            </div>
          </div>
        )}

        {content}
        {/* <PaginationButton searchUrl={location.search} totalPageNumber={pages} /> */}
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  );
};

export default OrderAndSalesModal;
