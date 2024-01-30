/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ImageLabel from "src/ui/ImageLabel";
import CancelButton from "src/ui/button/CancelButton";

const AddCategoryForm = ({ data, onSubmit, updateCategoryLoading, addCategoryLoading, error }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setError] = useState(null);

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
    <CForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <label>
            Category title <span className="text-danger">*</span>
          </label>
          <CFormInput
            type="text"
            id="titleInputField"
            placeholder="Enter Category"
            aria-describedby="titleInputField"
            {...register("title", {
              required: { value: !data ? true : false, message: "Category Name is required" },
            })}
          />
          {errors?.title?.type === "required" && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </CCol>
        <CCol xs={12}>
          <label>Description</label>
          <CFormTextarea
            id="categoryDescriptionTextareaField"
            placeholder="Enter Description"
            aria-describedby="categoryDescriptionTextareaField"
            rows="3"
            {...register("description", {})}
          ></CFormTextarea>
          {errors?.description?.type === "required" && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </CCol>
        <CCol xs={12}>
          <label>
            Sorting number <span className="text-danger">*</span>
          </label>
          <CFormInput
            type="number"
            id="sortInputField"
            placeholder="Enter number to sort"
            aria-describedby="sortInputField"
            {...register("sortOrder", {
              required: { value: !data ? true : false, message: "Sort Order is required" },
              min: { value: 0, message: "Number can't negative" },
            })}
          />
          {errors?.sortOrder?.type === "required" && (
            <p className="text-danger">{errors.sortOrder.message}</p>
          )}
          {errors?.sortOrder?.type === "min" && (
            <p className="text-danger">{errors.sortOrder.message}</p>
          )}
        </CCol>

        {/* <CCol xs={12}>
          <label>
            Category Image <span className="text-danger">*</span>
          </label>
          <ImageLabel sizes={"128 x 128"} />
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
              required: { value: !data ? true : false, message: "Image is required" },
            })}
            onChange={(e) => handleFileChange(e)}
          />

          {errors?.title?.type === "required" && (
            <p className="text-danger">{errors.title.message}</p>
          )}

          {imageError && <p style={{ color: "red" }}>{imageError}</p>}
          {imagePreview && (
            <CCol className="mt-2" md={3} xs={1}>
              <Image className="my-2" src={imagePreview} alt="Preview Image" />
            </CCol>
          )}

          {data?.image && (
            <CCol className="mt-2" md={3} xs={1}>
              <Image src={data?.image} alt={`Product Img`} fluid />
            </CCol>
          )}
        </CCol> */}
      </CRow>
      {error && <p className="text-danger mt-2 text-end">{error?.data?.message}</p>}
      <div className="text-end">
        <CancelButton />
        <CButton
          type={imageError ? "button" : "submit"}
          color="success"
          className="mt-3 text-white"
        >
          {updateCategoryLoading || addCategoryLoading ? (
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

export default memo(AddCategoryForm);

AddCategoryForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
