import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddAdminForm from "src/components/admins/AddAdminForm";
import {
  useAddManagerMutation,
  useChangeAdminPasswordMutation,
  useGetSingleAdminQuery,
  useUpdateManagerMutation,
} from "src/redux/admin/AdminApi";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddAdmin = () => {
  const { email } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();
  const location = useLocation().search;
  const [role, setRole] = useState("manager");

  const { id } = useParams();
  const [haveId, setHaveId] = useState(true);
  const { data: admin, isLoading, isError } = useGetSingleAdminQuery(id, { skip: haveId });

  const [
    addManager,
    { isLoading: addLoading, error: addErrorMsg, isError: addError, isSuccess: addSuccess },
  ] = useAddManagerMutation();

  const [
    updateManager,
    {
      isLoading: updateLoading,
      error: updateErrorMsg,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateManagerMutation();
  const [
    changeAdminPassword,
    {
      isLoading: adminUpdateLoading,
      error: adminUpdateErrorMsg,
      isError: adminUpdateError,
      isSuccess: adminUpdateSuccess,
    },
  ] = useChangeAdminPasswordMutation();

  useMemo(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id, setHaveId]);

  const handleAddAdmin = (data) => {
    const modifyData = {
      ...data,
      currentUserEmail: email,
      role: role,
    };

    if (!id) {
      addManager(modifyData);
    } else {
      if (location.includes("superAdmin")) {
        changeAdminPassword({ email, data: modifyData });
      } else {
        updateManager({ id, data: modifyData });
      }
    }
  };

  useEffect(() => {
    toast.dismiss();

    addError && toast.error(addErrorMsg?.data?.message || "Added failed", { id: "aError" });
    updateError && toast.error(updateErrorMsg?.data?.message || "Updated failed", { id: "aError" });
    adminUpdateError &&
      toast.error(adminUpdateErrorMsg?.data?.message || "Updated failed", { id: "adminError" });
  }, [addError, updateError, adminUpdateError]);

  useEffect(() => {
    toast.dismiss();
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
    adminUpdateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess, adminUpdateSuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton title={id ? "Update admin" : "Add admin"} />

            <CCardBody>
              <AddAdminForm
                isLoading={updateLoading || addLoading || adminUpdateLoading}
                data={admin}
                setRole={setRole}
                onSubmit={handleAddAdmin}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddAdmin;
