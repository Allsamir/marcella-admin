import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleCouponMutation } from "src/redux/coupons/couponsApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const TableRowData = ({ index, coupon }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSingleCoupon, { isLoading: deleteLoading, isError, isSuccess }] =
    useDeleteSingleCouponMutation();

  const handleDeleteCoupon = (id) => {
    deleteSingleCoupon(id);
  };

  useEffect(() => {
    toast.dismiss();
    isSuccess && toast.success("Delete Success", { id: "dSuccess" });
    isError && toast.error("Failed to Delete", { id: "dError" });
  }, [isSuccess, isError]);
  return (
    <>
      <DeleteModal
        deleteThis={handleDeleteCoupon}
        showModal={showModal}
        setShowModal={setShowModal}
        id={coupon._id}
        deleteLoading={deleteLoading}
      />
      <CTableRow>
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell>{coupon?.couponName}</CTableDataCell>
        <CTableDataCell>{coupon?.couponCode}</CTableDataCell>
        <CTableDataCell>{`${
          coupon?.discountType === "percentage" ? `${coupon?.discount} %` : `${coupon?.discount} TK`
        }`}</CTableDataCell>
        <CTableDataCell>{coupon?.discountType}</CTableDataCell>
        <CTableDataCell>{coupon?.totalAmount}</CTableDataCell>
        <CTableDataCell>
          {coupon?.expireDate ? (
            <div className="d-flex">
              <span className="me-2">{new Date(coupon?.expireDate).toLocaleDateString()}</span>
              <span>{new Date(coupon?.expireDate).toLocaleTimeString()}</span>
            </div>
          ) : (
            <span className="bg-warning rounded text-white  px-1">Expired</span>
          )}
        </CTableDataCell>

        <CTableDataCell>
          <div className="">
            <Link to={`/coupon/edit/${coupon?._id}`}>
              <EditButton />
            </Link>
            <DeleteButton setShowModal={setShowModal} />
          </div>
        </CTableDataCell>
      </CTableRow>
    </>
  );
};

export default TableRowData;
