/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip } from "@coreui/react";
import { useState, useMemo, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddProductForm from "src/components/products/AddProductForm";
import back from "../../../../assets/brand/back.png";

import { useGetAllTypesQuery } from "src/redux/flashSaleType/flashSaleTypeApi";
import {
  useAddSingleProductMutation,
  useGetSingleProductDetailsQuery,
  useUpdateSingleProductMutation,
} from "src/redux/products/productsApi";

import Loading from "src/ui/Loading";

const AddFlashSaleProducts = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(true);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [productTags, setProductTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [flashSaleType, setFlashSaleType] = useState("");
  const [imgData, setImgData] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [slugValue, setSlugValue] = useState();

  //remaining images
  const [remainingImages, setRemainingImages] = useState([]);

  // rtk hooks
  const [
    updateSingleProduct,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorMsg,
    },
  ] = useUpdateSingleProductMutation();

  const [
    adSingleProduct,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError, error: addErrorMsg },
  ] = useAddSingleProductMutation();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductDetailsQuery(id, { skip: productId });

  const { data: allTypes, isLoading: typeLoading, isError: typeError } = useGetAllTypesQuery();

  //rtk hooks end
  useMemo(() => {
    updateError && toast.error(updateErrorMsg?.data?.message || "Product updated failed");
    addError && toast.error(addErrorMsg?.data?.message || "Product added failed");
  }, [updateError, addError]);

  const navigate = useNavigate();

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, addSuccess]);

  useMemo(() => {
    if (id) {
      setProductId(false);
      setProductTags(product?.result?.tags);
      setDescription(product?.result?.description);
      setShortDescription(product?.result?.shortDescription);
      setFlashSaleType(product?.result?.flashSaleOfferType);
      setManufacturer(product?.result?.manufacturer?._id);
      setSlugValue(product?.result?.slug);
    }
  }, [id, product?.result]);

  // handle add a new product
  const handleCreateProduct = (data) => {
    const formData = new FormData();
    for (const key of Object.keys(imgData)) {
      formData.append("images", data.images[key]);
    }
    // default value for flash Sale product this field is required
    formData.append("flashSale", true);

    if (data.name) formData.append("name", data.name);
    if (data.altTag) formData.append("altTag", data.altTag);
    if (description) formData.append("description", description);
    if (shortDescription) formData.append("shortDescription", shortDescription);
    if (specification) formData.append("specification", specification);
    if (flashSaleType) formData.append("flashSaleOfferType", flashSaleType);
    // formData.append("productType", "flash-sale");

    if (slugValue) formData.append("slug", slugValue);

    if (manufacturer && manufacturer !== "Pick one") formData.append("manufacturer", manufacturer);
    if (data.status) formData.append("status", data.status);
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    if (data.model) formData.append("model", data.model);

    if (data.price) formData.append("price", parseFloat(data.price));
    if (data.offerPrice) formData.append("offerPrice", parseFloat(data.offerPrice));

    if (data.discountPercentage)
      formData.append("discountPercentage", parseFloat(data.discountPercentage) || 0);
    if (data.quantity) formData.append("quantity", parseInt(data.quantity));

    // form data.append JSON.stringify(data)
    if (productTags) formData.append("tags", JSON.stringify(productTags));
    if (data.color) formData.append("color", JSON.stringify(data?.color));
    if (data.size) formData.append("size", JSON.stringify(data?.size));
    if (data.categories?.value)
      formData.append("categories", JSON.stringify(data?.categories.value));
    if (data.subcategories?.value)
      formData.append("subcategories", JSON.stringify(data?.subcategories.value));
    if (data.subcategoryChildren?.value)
      formData.append("subcategoryChildren", JSON.stringify(data?.subcategoryChildren.value));

    // if (data.rewardPoints) formData.append("rewardPoints", parseFloat(data.rewardPoints) || 0);

    if (id) {
      remainingImages.forEach((img) => {
        formData.append("prevImage", img);
      });

      updateSingleProduct({ id, data: formData });
    } else {
      adSingleProduct(formData);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <strong>{id ? "Edit" : "Add"} Product</strong>
              <div className="text-end">
              
                <CButton
                  // onClick={handleSubmit(handleCreateProduct)}
                  disabled={addLoading || updateLoading}
                  type="submit"
                  form="addProductForm1"
                  color="success"
                  className=""
                >
                  <CIcon icon={cilSave} className="me-2" />
                  {addLoading || updateLoading ? "Loading..." : " Save"}
                </CButton>

                <CTooltip content="Back">
                  <CButton onClick={() => navigate(-1)} color="" className="border ms-2">
                    <Image fluid src={back} style={{ width: "20px" }} />
                  </CButton>
                </CTooltip>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            {isLoading ? (
              <Loading />
            ) : !isError ? (
              <AddProductForm
                images={imgData}
                setImages={setImgData}
                data={product?.result}
                description={description}
                setDescription={setDescription}
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                specification={specification}
                setSpecification={setSpecification}
                productTags={productTags}
                setProductTags={setProductTags}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                // loading={addLoading | updateLoading}
                onSubmit={handleCreateProduct}
                remainingImages={remainingImages}
                setRemainingImages={setRemainingImages}
                setFlashSaleType={setFlashSaleType}
                flashSaleType={flashSaleType}
                flashSale={true}
                allTypes={allTypes?.data}
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
                slugValue={slugValue}
                setSlugValue={setSlugValue}
              />
            ) : (
              <p>There was an error</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddFlashSaleProducts;
