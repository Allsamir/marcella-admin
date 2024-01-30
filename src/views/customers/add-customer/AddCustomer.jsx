import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCustomerForm from "src/components/customers/AddCustomerForm";
import { useGetAllCustomerGroupQuery } from "src/redux/customerGroup/customerGroupApi";
import { useAssignUserGroupMutation, useGetSingleUserQuery } from "src/redux/users/usersApi";

const AddCustomer = () => {
  const { id } = useParams();
  const { data: customersGroup } = useGetAllCustomerGroupQuery();
  const [assignUserGroup, { isLoading, isError, isSuccess }] = useAssignUserGroupMutation();
  const { data: customerData, isLoading: userLoad, isError: userError } = useGetSingleUserQuery(id);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdateCustomer = (data) => {
    const modifiedData = {
      email: data.email,
      groupName: data.group,
    };

    // assignUserGroup
    assignUserGroup(modifiedData);
  };
  useEffect(() => {
    isSuccess && toast.success("User group updated", { id: "uSuccess" });
    isError && toast.error("User group updated failed", { id: "fError" });
  }, [isSuccess, isError]);
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{id ? "Edit" : "Add"} Customer</strong>
            </CCardHeader>
            <CCardBody>
              <AddCustomerForm
                data={customerData?.result}
                customersGroup={customersGroup}
                onSubmit={handleUpdateCustomer}
                isLoading={isLoading}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddCustomer;
