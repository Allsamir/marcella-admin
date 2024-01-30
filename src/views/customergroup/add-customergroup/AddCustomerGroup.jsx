import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCustomerGroupsForm from "src/components/customer-groups/AddCustomerGroupsForm";
import {
  useAddCustomerGroupMutation,
  useGetSingleCustomerGroupQuery,
  useUpdateSingleCustomerGroupMutation,
} from "src/redux/customerGroup/customerGroupApi";
import Loading from "src/ui/Loading";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddCustomerGroup = () => {
  const { id } = useParams();
  const [haveId, setHaveId] = useState(true);
  const { data, isLoading: getLoading } = useGetSingleCustomerGroupQuery(id, { skip: haveId });
  const navigate = useNavigate();

  const [
    updateSingleCustomerGroup,
    {
      isSuccess: updateSuccess,
      error: updateErrMsg,
      isLoading: updateLoading,
      isError: updateError,
    },
  ] = useUpdateSingleCustomerGroupMutation();
  const [
    addCustomerGroup,
    { isSuccess: addSuccess, error: addErrMsg, isError: addError, isLoading: addLoading },
  ] = useAddCustomerGroupMutation();

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  const handleCreateCustomerGroup = (data) => {
    const modifyData = {};
    if (data.groupName) modifyData.groupName = data.groupName;
    if (data.discount) modifyData.discount = data.discount;
    if (data.discountType) modifyData.discountType = data.discountType;
    if (data.totalAmount) modifyData.totalAmount = data.totalAmount;
    if (data.description) modifyData.description = data.description;

    if (id) {
      updateSingleCustomerGroup({ id, data: modifyData });
    } else {
      addCustomerGroup(modifyData);
    }
  };

  useEffect(() => {
    toast.dismiss();

    addError &&
      toast.error(addErrMsg?.data?.message || "Create customer group failed", { id: "aError" });
    updateError && toast.error(updateErrMsg?.data?.message || "Updated Failed", { id: "uError" });
  }, [addError, updateError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, addSuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton title={id ? "Update customer group" : "Add customer group"} />
            <CCardBody>
              {getLoading ? (
                <Loading />
              ) : (
                <AddCustomerGroupsForm
                  addLoading={addLoading}
                  updateLoading={updateLoading}
                  data={data}
                  onSubmit={handleCreateCustomerGroup}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddCustomerGroup;
