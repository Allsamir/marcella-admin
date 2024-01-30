/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddRulesForm from "src/components/rules/AddRulesForm";

import {
  useAddRulesMutation,
  useGetSingleRulesQuery,
  useUpdateRulesMutation,
} from "src/redux/rules/rulesApi";
import Loading from "src/ui/Loading";

const AddRules = () => {
  const { id } = useParams();
  const [haveId, setHveId] = useState(true);
  const navigate = useNavigate();

  // get hooks query
  const {
    data: rule,
    isLoading: getLoading,
    isError: getError,
  } = useGetSingleRulesQuery(id, { skip: haveId });

  // add mutation
  const [addRule, { isLoading: addLoading, isSuccess: addSuccess, error: addError }] =
    useAddRulesMutation();
  // update mutation
  const [
    updateRules,
    { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError },
  ] = useUpdateRulesMutation();

  useEffect(() => {
    if (id) {
      setHveId(false);
    }
  }, [id]);

  const handleCreateRule = (data) => {
    const formData = new FormData();
    const image = data.image[0];
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    // update
    if (id) {
      updateRules({ id, data: formData });
    } else {
      // create
      addRule(formData);
    }
  };

  useEffect(() => {
    toast.dismiss();
    addSuccess && toast.success("Added successfully", { id: "aSuccess" });
    updateSuccess && toast.success("Updated successfully", { id: "uSuccess" });

    updateError &&
      toast.error("Update failed", {
        id: "uError",
      });
    addError &&
      toast.error("Added failed", {
        id: "aError",
      });
  }, [updateError, updateSuccess, addSuccess, addError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{id ? "Edit" : "Add"} Rules</strong>
            </CCardHeader>

            <CCardBody>
              {!getLoading ? (
                <AddRulesForm
                  addLoading={addLoading}
                  updateLoading={updateLoading}
                  data={rule?.result}
                  onSubmit={handleCreateRule}
                  error={addError}
                />
              ) : (
                <Loading />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddRules;
