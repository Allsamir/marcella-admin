import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

import ImageLabel from "src/ui/ImageLabel";
import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import { getModels } from "src/utils/getReactQuilModel";
import { spaceToDash } from "src/utils/spaceToDash";

const AddBlogForm = ({
  onSubmit,
  loading,
  blogDescription,
  setBlogDescription,
  blogData,
  slugValue,
  setSlugValue,
  blogTags,
  setBlogTags,
}) => {
  const modules = getModels();
  const { id } = useParams();
  const { handleSubmit, register, errors } = useForm();
  const [defaultSlug, setDefaultSlug] = useState("");


  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useMemo(() => {
    if (id) {
      setBlogDescription(blogData?.description);
      setBlogTags(blogData?.tags);
    }
    setDefaultSlug(blogData?.blogTitle)

  }, [id, blogData]);

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
      <CCard>
        <HeaderBackButton title={id ? "Update blog" : "Add blog"} />

        <CCardBody>
          <CCol xs={12}>
            <label className="mb-2">
              Author <span className="text-danger">*</span>
            </label>
            <CFormInput
              type="text"
              id="nameInputField"
              placeholder="Enter author name"
              defaultValue={blogData?.author}
              aria-describedby="nameInputField"
              {...register("author", {
                required: { value: blogData ? false : true, message: "Author is required" },
              })}

            />
            {errors?.author?.type === "required" && (
              <p className="text-danger">{errors.author.message}</p>
            )}
          </CCol>

          <CCol xs={12} className="my-2">
            <label className="w-100">
              Blog Title <span className="text-danger">*</span>
            </label>

            <CFormInput
              type="text"
              id="nameInputField"
              placeholder="Enter blog title"
              defaultValue={blogData?.blogTitle}
              aria-describedby="nameInputField"
              {...register("blogTitle", {
                required: { value: blogData ? false : true, message: "Blog title is required" },
              })}
              onFocus={(e) => setDefaultSlug(e.target.value)}
              onChange={(e) => setDefaultSlug(e.target.value)}
            />
            {errors?.blogTitle?.type === "required" && (
              <p className="text-danger">{errors.blogTitle.message}</p>
            )}
          </CCol>
          <CRow className="mt-2">
            <CCol md={11}>
              <label className="mb-2">
                URL Slug <span className="text-danger">*</span>
              </label>
              <CFormInput
                type="text"
                id="nameInputField"
                placeholder="Enter Url slug"
                aria-describedby="nameInputField"
                required
                value={slugValue}
                onChange={(e) => setSlugValue(e.target.value)}
              />
            </CCol>
            <CCol style={{ marginTop: "1.8rem" }} md={1}>
              <Button
                className="p-1"
                onClick={() => setSlugValue(spaceToDash(defaultSlug.toLocaleLowerCase()))}
              >
                Generate
              </Button>
            </CCol>
          </CRow>
          <CCol xs={12}>
            <label>
              Blog image <span className="text-danger">*</span>
            </label>
            <ImageLabel sizes={"1280 x 570"} />
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
                  value: blogData ? false : true,
                  message: "Image is required",
                },
              })}
              onChange={(e) => handleFileChange(e)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {imagePreview && (
              <Image className="my-2" fluid src={imagePreview} alt="Preview Image" />
            )}
            <br />
            {blogData?.image && <Image className="my-2" fluid src={blogData?.image} />}
          </CCol>
          <CCol xs={12}>
            <label className="w-100">
              Blog Description <span className="text-danger">*</span>
            </label>
            <ReactQuill
              className="mt-2"
              theme="snow"
              placeholder="Enter blog descriptions here"
              modules={modules}
              value={blogDescription}
              onChange={setBlogDescription}
            />
          </CCol>
          <CCol className="mt-2">
            <label className="mb-2">
              Tags <span className="text-danger">*</span>
            </label>
            <TagsInput
              required
              value={blogTags}
              onChange={setBlogTags}
              name="tags"
              style={{ width: "100%" }}
            />
            <div className="text-muted">Press enter to add new tag</div>
          </CCol>
          <div className="text-end  ">
            <CancelButton />
            <CButton type="submit" color="success" className="mt-3 text-white">
              <CIcon icon={cilSave} className="me-2" />
              {loading || loading ? "Loading..." : id ? "Update" : "Save"}
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CForm>
  );
};

export default AddBlogForm;
