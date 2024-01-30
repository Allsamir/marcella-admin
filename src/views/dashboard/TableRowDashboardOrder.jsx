import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Link } from "react-router-dom";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import EyeButton from "src/ui/button/EyeButton";

const TableRowDashboardOrder = ({ order, index }) => {
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{order?.address?.shippingName}</CTableDataCell>
      <CTableDataCell>{order?.totalAmount}</CTableDataCell>
      <CTableDataCell>{order?.paymentType}</CTableDataCell>
      <CTableDataCell>{new Date(order?.createdAt).toLocaleDateString()}</CTableDataCell>
      <CTableDataCell>{new Date(order?.updatedAt).toLocaleDateString()}</CTableDataCell>
      <CTableDataCell>{order?.status}</CTableDataCell>
      <div className="">
        <Link to={`/order/details/${order?._id}`}>
          <EyeButton />
        </Link>
        <Link to={`/order/details/${order?._id}`}>
          <EditButton />
        </Link>
        {/* <DeleteButton setShowModal={setShowModal}/> */}
        <DeleteButton />
      </div>
    </CTableRow>
  );
};

export default TableRowDashboardOrder;
