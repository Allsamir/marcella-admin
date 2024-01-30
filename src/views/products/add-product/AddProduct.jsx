/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip } from "@coreui/react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddProductForm from "src/components/products/AddProductForm";
import {
  useAddSingleProductMutation,
  useGetSingleProductDetailsQuery,
  useUpdateSingleProductMutation,
} from "src/redux/products/productsApi";
import Loading from "src/ui/Loading";
import back from "../../../assets/brand/back.png";

const AddProduct = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(true);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [specification, setSpecification] = useState("");

  const [productTags, setProductTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
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

  //rtk hooks end
  useMemo(() => {
    updateError && toast.error(updateErrorMsg?.data?.message);
    addError && toast.error(addErrorMsg?.data?.message);
  }, [updateError, addError]);

  const navigate = useNavigate();

  useEffect(() => {
    updateSuccess && navigate("/product");
    addSuccess && navigate("/product");
  }, [updateSuccess, addSuccess]);

  useMemo(() => {
    if (id) {
      setProductId(false);
      setProductTags(product?.result?.tags);
      setDescription(product?.result?.description);
      setShortDescription(product?.result?.shortDescription);
      setSpecification(product?.result?.specification);
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
    formData.append("flashSale", false);

    if (data.name) formData.append("name", data.name);
    if (data.altTag) formData.append("altTag", data.altTag);
    if (description) formData.append("description", description);
    if (shortDescription) formData.append("shortDescription", shortDescription);
    if (specification) formData.append("specification", specification);
    if (slugValue) formData.append("slug", slugValue);

    if (manufacturer && manufacturer !== "Pick one") formData.append("manufacturer", manufacturer);
    if (data.status) formData.append("status", data.status);
    if (data.productType) formData.append("productType", data.productType);
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    formData.append("model", data.model);

    if (data.price) formData.append("price", parseFloat(data.price));
    if (data.offerPrice) formData.append("offerPrice", parseFloat(data.offerPrice));
    if (data.discountPercentage)
      formData.append("discountPercentage", parseFloat(data.discountPercentage) || 0);
    if (data.quantity) formData.append("quantity", parseInt(data.quantity));

    // form data.append JSON.stringify(data)
    if (productTags) formData.append("tags", JSON.stringify(productTags));
    if (data.color?.length > 0) formData.append("color", JSON.stringify(data?.color));
    if (data.size?.length > 0) formData.append("size", JSON.stringify(data?.size));
    if (data.categories?.value)
      formData.append("categories", JSON.stringify(data?.categories.value));
    if (data.subcategories?.value)
      formData.append("subcategories", JSON.stringify(data?.subcategories.value));
    if (data.subcategoryChildren?.value)
      formData.append("subcategoryChildren", JSON.stringify(data?.subcategoryChildren.value));

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
              <div className="">
                <CButton
                  disabled={addLoading || updateLoading}
                  type="submit"
                  form="addProductForm1"
                  color="success"
                  className=""
                >
                  <CIcon icon={cilSave} className="me-2" />
                  {addLoading || updateLoading ? "Loading..." : id ? "Update" : " Save"}
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
                loading={addLoading | updateLoading}
                onSubmit={handleCreateProduct}
                remainingImages={remainingImages}
                setRemainingImages={setRemainingImages}
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

export default AddProduct;
