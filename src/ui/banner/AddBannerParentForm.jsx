/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import { getDefaultData, getModifiedCategories } from "src/components/products/data";
import Select from "react-select";
import { useGetAllCategoryQuery } from "src/redux/category/categoryApi";
import Loading from "../Loading";
import { Button, Form, Image } from "react-bootstrap";
import CancelButton from "../button/CancelButton";
import { useEffect, useState } from "react";
import {
  useGetFilterSubCategoryQuery,
} from "src/redux/subCategory/subCategoryApi";
import {
  useGetFilterSubCategoryChildrenQuery,
} from "src/redux/subCategoryChildren/subCategoryChildrenApi";
import { useGetAllBannerNameQuery } from "src/redux/banner/bannerApi";
import ImageLabel from "../ImageLabel";
import { SketchPicker } from "react-color";
import HeaderBackButton from "../button/HeaderBackButton";
import { spaceToDash } from "src/utils/spaceToDash";

const AddBannerParent = ({
  bannerData,
  addLoading,
  onSubmit,
  title,
  isRelatedBanner,
  selectedOption,
  setSelectedOption,
  bannerSize,
  desktopBanner,
  color,
  setColor,
  slugValue,
  setSlugValue
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [defaultSlug, setDefaultSlug] = useState("");

  const { data: categories, isLoading } = useGetAllCategoryQuery();
  const { data: subcategories } = useGetFilterSubCategoryQuery(selectedCategory);
  const { data: subcategoriesChildren } = useGetFilterSubCategoryChildrenQuery(selectedSubCategory);
  const { data: allBannerName } = useGetAllBannerNameQuery();

  const { handleSubmit, register, control, errors } = useForm();
  const [selectedField, setSelectedFiled] = useState(bannerData?.related || "category");

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bannerData) {
      setSelectedFiled(bannerData.related);
      setColor && setColor(bannerData?.bannerColor);
    }
    if (isRelatedBanner) {
      setSelectedOption(bannerData?.relatedBannerName);
    }
    setDefaultSlug(bannerData?.name)
  }, [bannerData?.related]);

  if (isLoading) {
    return <Loading />;
  }
  const modifiedCategories = getModifiedCategories(categories?.result);
  const modifiedSubCategories = getModifiedCategories(subcategories?.result);
  const modifiedSubCategoryChildren = getModifiedCategories(subcategoriesChildren?.result);

  // banner data
  const relatedOptions = [];
  allBannerName?.data?.forEach((t) => {
    relatedOptions.push({ label: t.name, value: t.name });
  });

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

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategory(selectedOptions);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubCategory(selectedOptions);
  };



  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <HeaderBackButton title={title} />
          <CCardBody>
            <CForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
              <CCol xs={12}>
                <label className="mb-2">
                  Banner Title <span className="text-danger">*</span>
                </label>
                <CFormInput
                  defaultValue={bannerData?.name}
                  placeholder="Enter banner title"
                  type="text"
                  {...register("name", { required: bannerData ? false : true })}
                  onFocus={(e) => setDefaultSlug(e.target.value)}
                  onChange={(e) => setDefaultSlug(e.target.value)}
                />
                {errors?.name && <p className="text-danger">Name is required</p>}
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
              <CRow>
                {isRelatedBanner && (
                  <CCol xs={12}>
                    <label className="mb-2">
                      Select Related Banner <span className="text-danger">*</span>
                    </label>
                    <CFormSelect
                      aria-label="Selection Field"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      required
                      options={relatedOptions}
                    />
                  </CCol>
                )}
                <CCol xs={12}>
                  <label>Banner Image</label>
                  <ImageLabel sizes={bannerSize} />
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
                        value: bannerData ? false : true,
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
                  {bannerData?.image && (
                    <Image fluid className="my-2" height={300} src={bannerData?.image} />
                  )}
                </CCol>

                {/* if need then putting the comment code below */}


              </CRow>
              <div className="text-end">
                <CancelButton />
                <CButton
                  type={error ? "button" : "submit"}
                  color="success"
                  className="mt-3 text-white"
                >
                  {addLoading ? (
                    "Loading"
                  ) : (
                    <>
                      <CIcon icon={cilSave} className="me-2" />
                      Save
                    </>
                  )}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddBannerParent;



















// {desktopBanner && (
//   <CCol className="mt-2" xs={12}>
//     <label className="mb-2">
//       Banner Color <span className="text-danger">*</span>
//     </label>
//     <SketchPicker
//       width="350px"
//       color={color}
//       onChangeComplete={handleChangeComplete}

//     />
//     <p className="mt-2" style={{ color: `${color}` }}>
//       Selected color: {color}
//     </p>
//   </CCol>
// )}
// <CCol className="mb-4" xs={12}>
//   <label className="w-100 mt-2">
//     Select Filed To Make Dynamic Link <span className="text-danger">*</span>
//   </label>
//   <Form.Check
//     inline
//     label="Category"
//     name="group1"
//     value={"category"}
//     type={"radio"}
//     onClick={() => setSelectedFiled("category")}
//     checked={selectedField === "category"}
//     id={`inline-1`}
//     {...register("related", {})}
//   />
//   <Form.Check
//     inline
//     label="Products"
//     name="group1"
//     value={"product"}
//     onClick={() => setSelectedFiled("product")}
//     checked={selectedField === "product"}
//     type={"radio"}
//     id={`inline-2`}
//     {...register("related", {})}
//   />
// </CCol>
// <CCol xs={12}>
//   {selectedField === "category" && (
//     <div>
//       <label>Category </label>
//       <Controller
//         control={control}
//         name={"categories"}
//         rules={{
//           required: bannerData ? false : true,
//         }}
//         render={({ field: { onChange, value, name, ref } }) => (
//           <Select
//             className="mt-2"
//             defaultValue={getDefaultData(bannerData?.categories)}
//             inputRef={ref}
//             options={modifiedCategories}
//             value={modifiedCategories?.find((option) => option.value === value)}
//             onChange={(selectedOptions) => {
//               onChange(selectedOptions);
//               handleCategoryChange(selectedOptions.value._id);
//             }}
//           />
//         )}
//       />
//     </div>
//   )}
//   {selectedField === "category" && (
//     <>
//       <label>Sub Category</label>

//       <Controller
//         control={control}
//         name={"subCategories"}
//         // rules={{
//         //   required: bannerData ? false : true,
//         // }}
//         render={({ field: { onChange, value, name, ref } }) => (
//           <Select
//             className="mt-2"
//             defaultValue={getDefaultData(bannerData?.subCategories)}
//             inputRef={ref}
//             isDisabled={!selectedCategory}
//             options={modifiedSubCategories}
//             value={modifiedSubCategories?.find((option) => option.value === value)}
//             onChange={(selectedOptions) => {
//               onChange(selectedOptions);
//               handleSubCategoryChange(selectedOptions.value._id);
//             }}
//           />
//         )}
//       />
//     </>
//   )}
//   {selectedField === "category" && (
//     <>
//       <label>Sub Category Children</label>

//       <Controller
//         control={control}
//         name={"subCategoryChildren"}
//         // rules={{
//         //   required: bannerData ? false : true,
//         // }}
//         render={({ field: { onChange, value, name, ref } }) => (
//           <Select
//             className="mt-2"
//             defaultValue={getDefaultData(bannerData?.subCategoryChildren)}
//             inputRef={ref}
//             isDisabled={!selectedSubCategory}
//             options={modifiedSubCategoryChildren}
//             value={modifiedSubCategoryChildren?.find(
//               (option) => option.value === value,
//             )}
//             onChange={(selectedOptions) => {
//               onChange(selectedOptions);
//             }}
//           />
//         )}
//       />
//     </>
//   )}
//   {selectedField === "product" && (
//     <>
//       <label className="mb-2">
//         Product URL Slug <span className="text-danger">*</span>
//       </label>
//       <CFormInput
//         placeholder="Enter product url slug"
//         defaultValue={bannerData?.product}
//         type="text"
//         {...register("product", {})}
//       />
//     </>
//   )}
// </CCol>
