import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCouponForm from "src/components/coupons/AddCouponForm";
import {
  useAddSingleCouponByIdMutation,
  useGetSingleCouponQuery,
  useUpdateSingleCouponMutation,
} from "src/redux/coupons/couponsApi";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddCoupons = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState();
  const navigate = useNavigate();

  const {
    data: coupon,
    isLoading: singleCouponLoading,
    isError: singleCouponError,
  } = useGetSingleCouponQuery(id, { skip: !id });

  const [addSingleCouponById, { isLoading: addLoading, isError: addError, isSuccess: addSuccess }] =
    useAddSingleCouponByIdMutation();

  const [
    updateSingleCoupon,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateSingleCouponMutation();

  //handle create coupon function
  const handleCreateCoupon = (data) => {
    const modifiedData = {
      ...data,
      discount: Number(data.discount),
      totalAmount: Number(data.totalAmount),
      expireDate: selectedDate,
    };

    if (id) {
      updateSingleCoupon({ id, data: modifiedData });
    } else {
      addSingleCouponById(modifiedData);
    }
  };

  let content = null;

  if (singleCouponLoading) {
    content = <p>Loading...</p>;
  }
  if (!singleCouponLoading && singleCouponError) {
    content = <p className="text-danger">There is something wrong!</p>;
  }
  if (!singleCouponLoading && !singleCouponError) {
    content = (
      <AddCouponForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        addLoading={addLoading}
        updateLoading={updateLoading}
        onSubmit={handleCreateCoupon}
        data={coupon}
      />
    );
  }

  useEffect(() => {
    toast.dismiss();
    addError && toast.error("Adding Failed", { id: "aFailed" });
    updateError && toast.error("Update Failed", { id: "uFailed" });
  }, [updateError, addError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, navigate, addSuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton title={id ? "Update coupon" : "Add Coupon"} />
            <CCardBody>{content}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddCoupons;
