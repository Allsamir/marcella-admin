/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput } from "@coreui/react";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useAddSingleColorMutation,
  useGetSingleColorQuery,
  useUpdateSingleColorMutation,
} from "src/redux/variants/variantsApi";

import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import Loading from "src/ui/Loading";

const AddColor = () => {
  const [colorInput, setColorInput] = useState("");
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [colorCode, setColorCode] = useState("");

  const {
    data: color,
    isLoading: getLoading,
    isError: termError,
    error: termErrorMsg,
  } = useGetSingleColorQuery(id, { skip: haveId });

  const [
    addSingleColor,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddSingleColorMutation();

  const [
    updateSingleColor,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleColorMutation();

  // update or add new term conditions
  const onSubmit = () => {
    if (id) {
      const data = {
        name: colorInput,
        colorCode: colorCode,
      };
      updateSingleColor({ id, data });
    } else {
      addSingleColor({ name: colorInput, colorCode: colorCode });
    }
  };

  //default data set
  useEffect(() => {
    if (color) {
      setColorInput(color?.data?.name);
      setColorCode(color?.data?.colorCode);
    }
  }, [color?.data]);

  useEffect(() => {
    addSuccess && toast.success("Successfully Added");
    addError && toast.error(addError?.data?.message);
    updateSuccess && toast.success("Successfully Updated");
    updateError && toast.error(updateError?.data?.message);
  }, [addSuccess, addError, updateSuccess, updateError]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, addSuccess]);

  const handleChangeComplete = (newColor) => {
    setColorCode(newColor.hex);
  };

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <HeaderBackButton title={id ? "Update color" : "Add color"} />

        {getLoading ? (
          <Loading />
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Color Name</label>
              <CFormInput
                type="text"
                id="titleInputField"
                placeholder="Enter color"
                aria-describedby="titleInputField"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <label className="mb-2">
                Color Code<span className="text-danger">*</span>
              </label>
              <SketchPicker
                width="350px"
                color={colorCode}
                onChangeComplete={handleChangeComplete}
              />
              <p className="mt-2" style={{ color: `${colorCode}` }}>
                Selected color: {colorCode}
              </p>
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

export default AddColor;
