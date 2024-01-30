/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewFooterMutation,
  useGetSingleFooterQuery,
  useUpdateSingleFooterMutation,
} from "src/redux/footer/footerApi";

import CancelButton from "src/ui/button/CancelButton";
import Loading from "src/ui/Loading";

const AddFooter = () => {
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();

  const {
    data: footerData,
    isLoading: getLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleFooterQuery(id, { skip: haveId });

  const [
    addNewFooter,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewFooterMutation();

  const [
    updateSingleFooter,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleFooterMutation();

  // update or add new term conditions
  const onSubmit = (data) => {
    const data2 = {
      text: data.text,
    };
    if (id) {
      updateSingleFooter({ id, data: data2 });
    } else {
      addNewFooter(data2);
    }
  };

  useEffect(() => {
    addSuccess && toast.success("Successfully Added");
    addError && toast.error(addMsg?.data?.message);
    updateSuccess && toast.success("Successfully Updated");
    updateError && toast.error(updateMsg?.data?.message);
  }, [addSuccess, addError, updateSuccess, updateError]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  useEffect(() => {
    if (footerData?.data) {
      for (const key in footerData?.data) {
        setValue(key, footerData?.data[key]);
      }
    }
  }, [footerData?.data, setValue]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <CCardHeader className="text-center fs-5   fw-bold">
          {id ? "Customize your footer" : "Add your footer"}
        </CCardHeader>
        {getLoading ? (
          <Loading />
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Footer text</label>
              <CFormTextarea
                type="text"
                id="FooterText"
                placeholder="Enter text"
                defaultValue={footerData?.data?.text}
                aria-describedby="FooterText"
                {...register("text", { required: true })}
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

export default AddFooter;
