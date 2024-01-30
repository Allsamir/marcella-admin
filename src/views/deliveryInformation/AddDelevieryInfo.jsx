/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm } from "@coreui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewDeliveryInfoMutation,
  useGetSingleDeliveryInfoQuery,
  useUpdateSingleDeliveryInfoMutation,
} from "src/redux/deliveryInfo/deliveryInfoApi";

import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import Loading from "src/ui/Loading";
import { getModels } from "src/utils/getReactQuilModel";

const AddDelevieryInfo = () => {
  const modules = getModels();
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const [blogDescription, setBlogDescription] = useState();
  const [banglaDescription, setBanglaDescription] = useState();

  const navigate = useNavigate();

  const {
    data: storeLocationData,
    isLoading: getLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleDeliveryInfoQuery(id, { skip: haveId });

  const [
    addNewDeliveryInfo,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewDeliveryInfoMutation();

  const [
    updateSingleDeliveryInfo,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleDeliveryInfoMutation();

  // update or add new term conditions
  const onSubmit = () => {
    const data  = {};
    if(blogDescription)   data.description = blogDescription;
    if(banglaDescription)   data.banglaDescription = banglaDescription;

    if (id) {
     
      updateSingleDeliveryInfo({ id, data });
    } else {
      addNewDeliveryInfo(data);
      
    }
  };

  //default data set
  useEffect(() => {
    if (id) {
      setBlogDescription(storeLocationData?.data?.description);
      setBanglaDescription(storeLocationData?.data?.banglaDescription);

    }
  }, [id, storeLocationData?.data]);

  useEffect(() => {
    addError && toast.error(addError?.data?.message);
    updateError && toast.error(updateError?.data?.message);
  }, [addError, updateError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <HeaderBackButton title={id ? "Update delivery info" : "Add delivery info"} />

        {getLoading ? (
          <Loading />
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Delivery Info (English)</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter delivery info"
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

export default AddDelevieryInfo;
