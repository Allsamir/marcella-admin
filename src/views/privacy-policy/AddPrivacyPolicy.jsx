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
  useAddNewPrivacyMutation,
  useGetSinglePrivacyQuery,
  useUpdateSinglePrivacyMutation,
} from "src/redux/privacyPolicy/privacyPolicyApi";

import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import { getModels } from "src/utils/getReactQuilModel";

const AddPrivacyPolicy = () => {
  const modules = getModels();
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const [blogDescription, setBlogDescription] = useState();
  const [privacyBangla, setPrivacyBangla] = useState();
  const navigate = useNavigate();

  const {
    data: privacyData,
    isLoading: termLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSinglePrivacyQuery(id, { skip: haveId });

  const [
    addNewPrivacy,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewPrivacyMutation();

  const [
    updateSinglePrivacy,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSinglePrivacyMutation();

  // update or add new term conditions
  const onSubmit = () => {
    const data = {}

    if(blogDescription)   data.description = blogDescription;
    if(privacyBangla)   data.banglaDescription = privacyBangla;

    if (id) {
      updateSinglePrivacy({ id, data });
    } else {
      addNewPrivacy(data);
    }
  };

  //default data set
  useMemo(() => {
    if (id) {
      setBlogDescription(privacyData?.data?.description);
      setPrivacyBangla(privacyData?.data?.banglaDescription);
    }
  }, [id, privacyData?.data]);

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
        <HeaderBackButton title={id ? "Update privacy policy" : "Add privacy policy"} />

        {termLoading ? (
          <p>Loading..</p>
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Privacy policy (English)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter privacy policy"
                modules={modules}
                value={blogDescription}
                onChange={setBlogDescription}
              />
            </CCol>
            <CCol className="mt-2" xs={12}>
              <label className="w-100">Privacy policy (Bangla)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter privacy policy"
                modules={modules}
                value={privacyBangla}
                onChange={setPrivacyBangla}
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

export default AddPrivacyPolicy;
