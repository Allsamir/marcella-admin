// import { CCol, CFormInput, CRow } from "@coreui/react";
// import { useEffect, useState } from "react";
// import { Button, Image, Stack } from "react-bootstrap";
// import ImageLabel from "src/ui/ImageLabel";

// const ImageTab = ({
//   errors,
//   register,
//   data,
//   images,
//   setImages,
//   remainingImages,
//   setRemainingImages,
//   setActiveTab,
// }) => {
//   const [error, setError] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   // set remaining images
//   useEffect(() => {
//     setRemainingImages(data?.images);
//   }, [data?.images]);

//   // handle remove images
//   const handleRemoveImage = (url) => {
//     remainingImages?.length > 1 && setRemainingImages((prev) => prev.filter((u) => u !== url));
//   };

//   // pev button
//   const handlePrev = () => {
//     setActiveTab(3);
//   };

//   function handleFileChange(event) {
//     const file = event.target.files[0];
//     if (file.size > 2 * 1024 * 1024) {
//       setError("File size should be less than 2MB");
//       setImagePreview(null);
//     } else {
//       setImagePreview(URL.createObjectURL(file));
//       setError(null);
//     }
//   }

//   return (
//     <>
//       <CRow className="g-3 product_image_row">
//         <CCol xs={12}>
//           <label className="mb-2">Alt tag</label>
//           <CFormInput
//             type="text"
//             id="altInputField"
//             placeholder="Enter alt tag"
//             aria-describedby="altInputField"
//             {...register("altTag")}
//           />
//         </CCol>
//         <ImageLabel sizes={"1080 x 1080"} />
//         <CCol xs={12}>
//           <CFormInput
//             type="file"
//             id="file-upload"
//             accept=".jpg, .png, .jpeg, .gif, "
//             multiple
//             aria-describedby="file-upload"
//             style={{
//               border: "none",
//               outline: "none",
//               backgroundColor: "transparent",
//               color: "transparent",
//               width: "0.1px",
//               height: "0.1px",
//               overflow: "hidden",
//               position: "absolute",
//               zIndex: "-1",
//             }}
//             {...register("images", {
//               required: {
//                 value: data ? false : true,
//                 message: "Image is required",
//               },
//             })}
//             onChange={(e) => {
//               setImages(e.target.files);
//               handleFileChange(e);
//             }}
//           />
//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {errors.images && <p className="text-danger">Image is required</p>}
//         </CCol>
//         {!error &&
//           images &&
//           [...images]?.map((file, index) => (
//             <CCol md={3} xs={1} key={index}>
//               <Image src={URL.createObjectURL(file)} alt={`Product Img ${index}`} fluid />
//             </CCol>
//           ))}
//         <Stack gap={4} direction="horizontal" className="d-flex flex-wrap mt-4">
//           {remainingImages?.map((url, index) => (
//             <CCol md={3} xs={1} key={index}>
//               <div className="border p-2 position-relative" style={{ maxWidth: "200px" }}>
//                 <Image src={url} alt={`Product Img`} fluid />
//                 <div
//                   className=" position-absolute "
//                   style={{
//                     top: "-22px",
//                     left: "93%",
//                     width: "100%",
//                   }}
//                 >
//                   <button
//                     disabled={remainingImages?.length === 1}
//                     onClick={() => handleRemoveImage(url)}
//                     className="rounded-circle fs-5 border-0 px-2 d-flex justify-content-center align-items-center "
//                   >
//                     x
//                   </button>
//                 </div>
//               </div>
//             </CCol>
//           ))}
//         </Stack>
//       </CRow>
//       <CRow md={{ cols: 4 }} xs={{ cols: 1 }}></CRow>
//       <div className="d-flex justify-content-end gap-2">
//         <Button onClick={handlePrev}>Prev</Button>
//       </div>
//     </>
//   );
// };

// export default ImageTab;

/* eslint-disable jsx-a11y/img-redundant-alt */
import { CCol, CFormInput, CRow } from "@coreui/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./image.css";
import ProductImage from "./ProductImage";

const ImageTab = ({
  errors,
  register,
  data,
  images,
  setImages,
  remainingImages,
  setRemainingImages,
  setActiveTab,
  libraryUrls, setLibraryUrls
}) => {

  const handlePrev = () => {
    setActiveTab(3);
  };
  const [variationIcon, setVariationIcon] = useState(null);

  function handleDeletePreview(index, isVariation) {
    const deletedImages = isVariation ? variationIcon : images;
    const updatedIcons = [...deletedImages];
    updatedIcons.splice(index, 1);
    if (isVariation) {
      setVariationIcon(updatedIcons);
    } else {
      setImages(updatedIcons)
    }
  }
  return (
    <>
      <CRow className="g-3 product_image_row">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="altTag"
            label="Images alt tag "
            placeholder="Images alt tag"
            aria-describedby="altTag"
            {...register("altTag")}
          />
        </CCol>

        <ProductImage data={data} errors={errors} images={images} register={register} remainingImages={remainingImages} setImages={setImages} setRemainingImages={setRemainingImages} handleDeletePreview={handleDeletePreview}
          libraryUrls={libraryUrls}
          setLibraryUrls={setLibraryUrls}
        />
      </CRow>

      <div className="d-flex justify-content-end gap-2">
        <Button onClick={handlePrev}>Prev</Button>
      </div>
    </>
  );
};

export default ImageTab;
