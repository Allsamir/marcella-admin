/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput } from "@coreui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddSingleTypesMutation,
  useGetSingleTypesQuery,
  useUpdateSingleTypesMutation,
} from "src/redux/flashSaleType/flashSaleTypeApi";

import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import Loading from "src/ui/Loading";

const AddFlashSaleTypes = () => {
  const [sizeInput, setSizeInput] = useState("");
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const {
    data: size,
    isLoading: getLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleTypesQuery(id, { skip: haveId });

  const [
    addSingleType,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddSingleTypesMutation();

  const [
    updateSingleType,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleTypesMutation();

  // update or add new term conditions
  const onSubmit = () => {
    if (id) {
      const data = {
        name: sizeInput,
      };
      updateSingleType({ id, data });
    } else {
      addSingleType({ name: sizeInput });
    }
  };

  //default data set
  useEffect(() => {
    if (id) {
      setSizeInput(size?.data?.name);
    }
  }, [id, size?.data]);

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
        <HeaderBackButton title={id ? "Customize types" : "Add types"} />

        {getLoading ? (
          <Loading />
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">FlashSale Types Name</label>
              <CFormInput
                type="text"
                id="titleInputField"
                placeholder="Enter types name"
                aria-describedby="titleInputField"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
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

export default AddFlashSaleTypes;
