/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm } from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useAddNewTermConditionMutation,
  useGetSingleTermsConditionQuery,
  useUpdateSingleTermConditionMutation,
} from "src/redux/terms&condition/termsConditionApi";
import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import { getModels } from "src/utils/getReactQuilModel";

const AddTermsConditions = () => {
  const modules = getModels();
  const navigate = useNavigate();
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit, setValue } = useForm();
  const [blogDescription, setBlogDescription] = useState();
  const [banglaDescription, setBanglaDescription] = useState();


  const {
    data: termData,
    isLoading: termLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleTermsConditionQuery(id, { skip: haveId });

  const [
    addNewTermCondition,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewTermConditionMutation();

  const [
    updateSingleTermCondition,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleTermConditionMutation();

  // update or add new term conditions
  const onSubmit = () => {
    const data  = {};
    if(blogDescription)   data.description = blogDescription;
    if(banglaDescription)   data.banglaDescription = banglaDescription;

    if (id) {
      updateSingleTermCondition({ id, data });
    } else {
      addNewTermCondition(data);
    }
  };

  //default data set
  useMemo(() => {
    if (id) {
      setBlogDescription(termData?.data?.description);
      setBanglaDescription(termData?.data?.banglaDescription);
    }
  }, [id, termData?.data]);

  useEffect(() => {
    addError && toast.error(addError?.data?.message);
    updateError && toast.error(updateError?.data?.message);
  }, [addError, updateError]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);
  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);
  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <HeaderBackButton title={id ? "Update terms and condition" : "Add terms and condition"} />

        {termLoading ? (
          <p>Loading..</p>
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Terms & Condition (English)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter terms & condition"
                modules={modules}
                value={blogDescription}
                onChange={setBlogDescription}
              />
            </CCol>
            <CCol className="mt-2" xs={12}>
              <label className="w-100">Return policy (Bangla)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter return policy"
                modules={modules}
                value={banglaDescription}
                onChange={setBanglaDescription}
              />
            </CCol>
            <div className="text-end  ">
              <CancelButton />
              <CButton type="submit" color="success" className="mt-3 text-white">
                <CIcon icon={cilSave} className="me-2" />
                {updateLoading || addLoading ? "Loading..." : id ? "Update" : "Save"}
              </CButton>
            </div>
          </CCardBody>
        )}
      </CCard>
    </CForm>
  );
};

export default AddTermsConditions;
