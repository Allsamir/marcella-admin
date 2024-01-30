/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddBottomBannerMutation,
  useGetSingleBottomBannerQuery,
  useUpdateBottomBannerMutation,
} from "src/redux/banner/bannerApi";
import AddBannerParent from "src/ui/banner/AddBannerParentForm";
import Loading from "src/ui/Loading";

const AddBottomBanner = () => {
  const { id } = useParams();
  const [addBottomBanner, { isLoading, isError, isSuccess }] = useAddBottomBannerMutation();
  const { data, isLoading: getLoading, isError: getError } = useGetSingleBottomBannerQuery(id);
  const navigate = useNavigate();
  const [slugValue, setSlugValue] = useState("");


  const [
    updateBottomBanner,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateBottomBannerMutation();

  const handleAddBottomBanner = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    if (data.categories?.value)
      formData.append("categories", JSON.stringify(data.categories?.value));
    if (data.subCategories?.value)
      formData.append("subCategories", JSON.stringify(data.subCategories?.value));
    if (data.subCategoryChildren?.value)
      formData.append("subCategoryChildren", JSON.stringify(data.subCategoryChildren?.value));

    if (data.name) formData.append("name", data.name);
    if (data.product) formData.append("product", data.product);
    if (data.related) formData.append("related", data.related);
    if (slugValue) formData.append("slug", slugValue);


    if (id) {
      updateBottomBanner({ id: id, formData: formData });
    } else {
      addBottomBanner(formData);
    }
  };

  useEffect(() => {
    isError && toast.error("Bottom banner added failed");
    updateError && toast.error("Bottom banner update failed");
  }, [isError, updateError]);

  useEffect(() => {
    isSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    setSlugValue(data?.data?.slug)
  }, [data]);

  return (
    <>
      {!getLoading ? (
        <AddBannerParent
          onSubmit={handleAddBottomBanner}
          addLoading={isLoading || updateLoading}
          title={"Add bottom banner"}
          bannerData={data?.data}
          bannerSize={"1200 x 120"}
          slugValue={slugValue}
          setSlugValue={setSlugValue}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AddBottomBanner;
