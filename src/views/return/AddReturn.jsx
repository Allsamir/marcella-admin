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
  useAddNewReturnMutation,
  useGetSingleReturnQuery,
  useUpdateSingleReturnMutation,
} from "src/redux/return/returnApi";

import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import Loading from "src/ui/Loading";
import { getModels } from "src/utils/getReactQuilModel";

const AddReturn = () => {
  const modules = getModels();
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const [blogDescription, setBlogDescription] = useState();
  const [banglaDescription, setBanglaDescription] = useState();

  const navigate = useNavigate();

  const {
    data: data,
    isLoading: getLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleReturnQuery(id, { skip: haveId });

  const [
    addNewReturn,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewReturnMutation();

  const [
    updateSingleReturn,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleReturnMutation();

  // update or add new term conditions
  const onSubmit = () => {
    const data  = {};
    if(blogDescription)   data.description = blogDescription;
    if(banglaDescription)   data.banglaDescription = banglaDescription;
    
    if (id) {
      updateSingleReturn({ id, data });
    } else {
      addNewReturn(data);
    }
  };

  //default data set
  useMemo(() => {
    if (id) {
      setBlogDescription(data?.data?.description);
      setBanglaDescription(data?.data?.banglaDescription);
    }
  }, [id, data?.data]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  useEffect(() => {
    addError && toast.error(addError?.data?.message);
    updateError && toast.error(updateError?.data?.message);
  }, [addError, updateError]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
      <HeaderBackButton title={id ? "Update return policy" : "Add return policy"} />

        {getLoading ? (
          <Loading />
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Return policy (English)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter return policy"
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

export default AddReturn;