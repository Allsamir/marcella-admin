import { CCol, CFormInput, CRow } from "@coreui/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import { TagsInput } from "react-tag-input-component";
import { spaceToDash } from "src/utils/spaceToDash";

const GeneralTabl = ({
  description,
  setDescription,
  shortDescription,
  setShortDescription,
  specification,
  setSpecification,
  register,
  modules,
  errors,
  productTags,
  setProductTags,
  setActiveTab,
  slugValue,
  setSlugValue,
}) => {
  const [defaultSlug, setDefaultSlug] = useState(slugValue);

  const handleActiveTab = () => {
    setActiveTab(1);
  };

  return (
    <CRow className="g-3">
      <CCol xs={12}>
        <label className="mb-2">
          Name <span className="text-danger">*</span>
        </label>
        <CFormInput
          type="text"
          id="nameInputField"
          placeholder="Enter Name"
          aria-describedby="nameInputField"
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
          onFocus={(e) => setDefaultSlug(e.target.value)}
          onChange={(e) => setDefaultSlug(e.target.value)}
        />
        {errors.name?.type === "required" && <p className="text-danger">{errors.name.message}</p>}
      </CCol>
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
        {errors.name?.type === "required" && <p className="text-danger">{errors.name.message}</p>}
      </CCol>
      <CCol style={{ marginTop: "2.8rem" }} md={1}>
        <Button
          className="p-1"
          onClick={() => setSlugValue(spaceToDash(defaultSlug.toLocaleLowerCase()))}
        >
          Generate
        </Button>
      </CCol>
      <CCol xs={12}>
        <label className="w-100">Description</label>
        <ReactQuill
          className="mt-2"
          theme="snow"
          placeholder="Enter description"
          modules={modules}
          value={description}
          onChange={setDescription}
        />
      </CCol>
      <CCol xs={12}>
        <label className="w-100">Short Description</label>
        <ReactQuill
          className="mt-2"
          theme="snow"
          placeholder="Enter short description"
          modules={modules}
          value={shortDescription}
          onChange={setShortDescription}
        />
      </CCol>
      <CCol xs={12}>
        <label className="w-100">Specification</label>
        <ReactQuill
          className="mt-2"
          theme="snow"
          placeholder="Enter specification"
          modules={modules}
          value={specification}
          onChange={setSpecification}
        />
      </CCol>

      {productTags && (
        <CCol xs={12}>
          <label className="mb-2">
            Tags <span className="text-danger">*</span>
          </label>
          <TagsInput required value={productTags} onChange={setProductTags} name="tags" />
          <div className="text-muted">Press enter to add new tag</div>
        </CCol>
      )}

      <div className="d-flex justify-content-end">
        <Button onClick={handleActiveTab}>Next</Button>
      </div>
    </CRow>
  );
};

export default GeneralTabl;
