/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddSideBannerMutation,
  useGetSideBannerQuery,
  useUpdateSideBannerMutation,
} from "src/redux/banner/bannerApi";

import AddBannerParent from "src/ui/banner/AddBannerParentForm";
import Loading from "src/ui/Loading";

const AddSideBanner = () => {
  const { id } = useParams();
  const [AddSideBanner, { isLoading, isError, isSuccess }] = useAddSideBannerMutation();
  const navigate = useNavigate();
  const [slugValue, setSlugValue] = useState("");


  const [
    updateTopBanner,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateSideBannerMutation();

  const { data, isLoading: getLoading } = useGetSideBannerQuery(id);

  const handleAddSideBanner = (data) => {
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
      updateTopBanner({ id: id, formData: formData });
    } else {
      AddSideBanner(formData);
    }
  };

  useEffect(() => {
    isError && toast.error("Banner added failed");
    updateError && toast.error("Banner update failed");
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
          onSubmit={handleAddSideBanner}
          addLoading={isLoading || updateLoading}
          title={"Add side banner"}
          bannerData={data?.data}
          bannerSize={"300 x free"}
          slugValue={slugValue}
          setSlugValue={setSlugValue}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AddSideBanner;
