/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
import { CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateSingleOrderByIdMutation } from "src/redux/order/orderApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import EyeButton from "src/ui/button/EyeButton";
import DeleteModal from "src/ui/DeleteModal";

// eslint-disable-next-line react/prop-types
const TableRowData = ({ index, order, handleDeleteOrder, deleteLoading }) => {
  const [showModal, setShowModal] = useState(false);

  const { totalAmount, createdAt, updatedAt, paymentType, status, userName, userPhone, orderId, report } =
    order || {};
  const [selectedStatus, setSelectedStatus] = useState(status);

  const [updateSingleOrderById, { isLoading: updateLoading, updateError }] =
    useUpdateSingleOrderByIdMutation();

  const orderStatus = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "shipped" },
    { value: "cancelled", label: "Cancelled" },
    { value: "returned", label: "Returned" },
    { value: "delivered", label: "Delivered" },
    { value: "expired", label: "Expired" },
  ];
  const handleUpdate = (e, id) => {
    const value = e.target.value;
    setSelectedStatus(value);
    const data = { status: value };

    updateSingleOrderById({ id, data });
  };
  return (
    <>
      <DeleteModal
        deleteThis={handleDeleteOrder}
        showModal={showModal}
        setShowModal={setShowModal}
        id={order?._id}
        deleteLoading={deleteLoading}
      />
      <CTableRow>
        <CTableHeaderCell scope="row">
          {index + 1}
          {/* <Form.Check inline type="checkbox" id={index + 1} /> */}
        </CTableHeaderCell>
        <CTableDataCell>{userName}</CTableDataCell>
        <CTableDataCell>{orderId}</CTableDataCell>
        <CTableDataCell>{userPhone}</CTableDataCell>
        <CTableDataCell>{totalAmount}</CTableDataCell>
        <CTableDataCell>{paymentType} {report && <span className="text-danger text-uppercase">REQ: {report?.requestedFor}</span>}</CTableDataCell>
        <CTableDataCell>{new Date(createdAt).toLocaleDateString()}</CTableDataCell>
        <CTableDataCell>{new Date(updatedAt).toLocaleDateString()}</CTableDataCell>
        <CTableDataCell>
          {updateLoading && <small>Loading..</small>}
          {updateError && <small className="text-danger">Error occured</small>}
          <CFormSelect
            style={{ width: "150px" }}
            aria-label="Product Select Selection Field"
            options={orderStatus}
            value={selectedStatus}
            disabled={updateLoading}
            onChange={(e) => {
              // setSelectedStatus(e.target.value);
              handleUpdate(e, order?._id);
              // eslint-disable-next-line prettier/prettier
            }}
          />
        </CTableDataCell>
        <CTableDataCell>
          <div className="">
            <Link to={`/order/details/${order?._id}`}>
              <EyeButton />
            </Link>
            <Link to={`/order/details/${order?._id}`}>
              <EditButton />
            </Link>
            {/* <Link to={`/order/edit/${order?._id}`}>
              <EditButton />
            </Link> */}
            <DeleteButton setShowModal={setShowModal} />
          </div>
        </CTableDataCell>
      </CTableRow>
    </>
  );
};

export default TableRowData;
