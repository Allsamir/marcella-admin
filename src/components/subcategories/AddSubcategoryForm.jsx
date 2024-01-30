/* eslint-disable react/prop-types */
import { cilPlus, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useGetAllCategoryQuery } from "src/redux/category/categoryApi";
import CancelButton from "src/ui/button/CancelButton";

const AddSubcategoryForm = ({
  data,
  onSubmit,
  addSubCategoryLoading,
  updateSubCategoryLoading,
}) => {
  const { data: categories } = useGetAllCategoryQuery();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    if (data) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data]);

  return (
    <CForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <label>
            Category <span className="text-danger">*</span>
          </label>
          <select
            className="form-select mt-2"
            aria-label="Default select example"
            {...register("parent", { required: true })}
          >
            {categories?.result.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </CCol>
        <CCol xs={12}>
          <label>
            Title <span className="text-danger">*</span>
          </label>
          <CFormInput
            type="text"
            id="subcategoryTitleInputField"
            placeholder="Enter Subcategory Title"
            aria-describedby="subcategoryTitleInputField"
            {...register("title", { required: true })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="subcategoryDescriptionTextareaField"
            label="Description"
            placeholder="Enter Description"
            aria-describedby="subcategoryDescriptionTextareaField"
            rows="3"
            {...register("description")}
          ></CFormTextarea>
        </CCol>
      </CRow>
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="success" className="mt-3 text-white">
          {addSubCategoryLoading || updateSubCategoryLoading ? (
            "Loading"
          ) : (
            <>
              {" "}
              <CIcon icon={cilSave} className="me-2" />
              {data ? "Update" : "Save"}
            </>
          )}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddSubcategoryForm;

AddSubcategoryForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
