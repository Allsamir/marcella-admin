/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { memo } from "react";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddRulesForm = ({ data, onSubmit, updateLoading, addLoading, error }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  return (
    <CForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="titleInputField"
            label="Title"
            placeholder="Enter Title"
            aria-describedby="titleInputField"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          {errors?.title?.type === "required" && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="rulesDescriptionTextareaField"
            label="Description"
            placeholder="Enter Description"
            aria-describedby="rulesDescriptionTextareaField"
            rows="3"
            {...register("description", {
              required: {
                value: false,
                message: "Rules description is required",
              },
            })}
          ></CFormTextarea>
          {errors?.description?.type === "required" && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </CCol>

        <CCol xs={12}>
          <CFormInput
            type="file"
            id="fileInputField"
            name="image"
            label="Rules Image"
            placeholder="Enter image"
            aria-describedby="imageInputField"
            {...register("image", {
              required: { value: true, message: "Image is required" },
            })}
          />

          {errors?.title?.type === "required" && (
            <p className="text-danger">{errors.title.message}</p>
          )}
          {data?.image && (
            <CCol className="mt-2" md={3} xs={1}>
              <Image src={data?.image} alt={`Rules Img`} fluid />
            </CCol>
          )}
        </CCol>
      </CRow>
      {error && <p className="text-danger mt-2 text-end">{error?.data?.message}</p>}
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="success" className="mt-3 text-white">
          {updateLoading || addLoading ? (
            "Loading"
          ) : (
            <>
              <CIcon icon={cilSave} className="me-2" />
              {data ? "Update" : "Save"}
            </>
          )}
        </CButton>
      </div>
    </CForm>
  );
};

export default memo(AddRulesForm);

AddRulesForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
