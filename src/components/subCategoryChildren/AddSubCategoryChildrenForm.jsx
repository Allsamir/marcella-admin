/* eslint-disable react/prop-types */
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetAllSubCategoryQuery } from "src/redux/subCategory/subCategoryApi";
import ImageLabel from "src/ui/ImageLabel";
import CancelButton from "src/ui/button/CancelButton";

const AddSubcategoryChildrenForm = ({ data, onSubmit, addLoading, updateSubCategoryLoading }) => {
  const [selectedField, setSelectedFiled] = useState(false);
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const { data: subcategory, isLoading: subcategoryLoading } = useGetAllSubCategoryQuery();

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
      setSelectedFiled(data?.nicheCategory);
    }
  }, [data]);

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
            Sub Category <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("subcategory", { required: data ? false : true })}
          >
            {subcategory?.result?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.parent?.title} &gt; {category?.title}
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
            placeholder="Enter subcategory children title"
            defaultValue={data?.title}
            aria-describedby="subcategoryTitleInputField"
            {...register("title", { required: data ? false : true })}
          />
        </CCol>
        <CCol xs={12}>
          <label>Description</label>
          <CFormTextarea
            id="subcategoryDescriptionTextareaField"
            placeholder="Enter Description"
            defaultValue={data?.description}
            aria-describedby="subcategoryDescriptionTextareaField"
            rows="3"
            {...register("description")}
          ></CFormTextarea>
        </CCol>
        <CCol xs={12}>
          <label className="w-100">Niche Category </label>
          <Form.Check
            inline
            label="No"
            name="group1"
            value={false}
            onClick={() => setSelectedFiled(false)}
            type={"radio"}
            checked
            id={`inline-2`}
            {...register("nicheCategory", { required: data ? false : true })}
          />
          <Form.Check
            inline
            label="Yes"
            name="group1"
            value={true}
            onClick={() => setSelectedFiled(true)}
            type={"radio"}
            checked={selectedField === true}
            id={`inline-1`}
            {...register("nicheCategory", { required: data ? false : true })}
          />
        </CCol>
        {selectedField && (
          <CCol xs={12}>
            <CFormInput
              type="text"
              id="nicheTitleField"
              label="Niche Title"
              placeholder="Enter Niche Title"
              defaultValue={data?.nicheTitle}
              aria-describedby="nicheTitleField"
              {...register("nicheTitle", { required: data ? false : true })}
            />
          </CCol>
        )}
        {selectedField && (
          <CCol xs={12}>
            <label>Niche category image</label>
            <ImageLabel sizes={"400 x 400"} />
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
                required: data
                  ? false
                  : {
                      value: data ? false : true,
                      // value: false,
                      message: "Image is required",
                    },
              })}
              onChange={(e) => handleFileChange(e)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {imagePreview && (
              <Image className="my-2" height={100} src={imagePreview} alt="Preview Image" />
            )}
            <br />
            {data?.image && <Image className="my-2" height={100} src={data?.image} />}
          </CCol>
        )}
      </CRow>
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="success" className="mt-3">
          {addLoading || updateSubCategoryLoading ? (
            "Loading"
          ) : (
            <>
              <CIcon icon={cilPlus} className="me-2" />
              {id ? "Update" : "Save"}
            </>
          )}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddSubcategoryChildrenForm;

AddSubcategoryChildrenForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
