/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput } from "@coreui/react";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
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
import ImageLabel from "src/ui/ImageLabel";
import Loading from "src/ui/Loading";

const AddFlashSaleTypes = () => {
  const [sizeInput, setSizeInput] = useState("");
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

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
  const onSubmit = (data) => {
    const image = data?.image[0];
    const newData = {
      name: sizeInput,
      image
    }
    if (id) {
      updateSingleType({ id, newData });
    } else {
      addSingleType(newData);
    }
    console.log(newData)
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


  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      setImagePreview(null);
    } else {
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  }


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
            <CCol xs={12}>
              <label>Flash Image</label>
              <ImageLabel sizes={'bannerSize'} />
              <CFormInput
                type="file"
                id="file-upload"
                accept=".jpg, .png, .jpeg, .gif"
                aria-describedby="file-upload"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "transparent",
                  width: "0.1px",
                  height: "0.1px",
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1",
                }}
                {...register("image", {
                  required: {
                    value: 'bannerData' ? false : true,
                    // value: false,
                    message: "Image is required",
                  },
                })}
                onChange={(e) => handleFileChange(e)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              {imagePreview && (
                <Image
                  fluid
                  className="my-2"
                  height={300}
                  src={imagePreview}
                  alt="Preview Image"
                />
              )}

              <br />
              {'bannerData?.image' && (
                <Image fluid className="my-2" height={300} src={'bannerData?.image'} />
              )}
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
