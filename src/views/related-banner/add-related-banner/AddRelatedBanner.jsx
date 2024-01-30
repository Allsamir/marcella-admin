/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddRelatedBannerMutation,
  useGetRelatedBannerQuery,
  useUpdateRelatedBannerMutation,
} from "src/redux/banner/bannerApi";
import AddBannerParent from "src/ui/banner/AddBannerParentForm";
import Loading from "src/ui/Loading";

const AddDesktopBanner = () => {
  // add desktop banner hook
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [slugValue, setSlugValue] = useState("");


  const [addRelatedBanner, { isLoading, isError, isSuccess }] = useAddRelatedBannerMutation();
  const {
    data: bannerData,
    isLoading: getLoading,
    isError: getError,
  } = useGetRelatedBannerQuery(id);
  const [
    updateRelatedBanner,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateRelatedBannerMutation();

  // hande add desktop banner
  const handleAddDesktopBanner = (data) => {
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
    if (selectedOption) formData.append("relatedBannerName", selectedOption);
    if (data.product) formData.append("product", data.product);
    if (data.related) formData.append("related", data.related);
    if (slugValue) formData.append("slug", slugValue);


    if (id) {
      updateRelatedBanner({ id: id, formData: formData });
    } else {
      addRelatedBanner(formData);
    }
  };

  useEffect(() => {
    isError && toast.error("Banner added failed");
    updateError && toast.error("Banner updated failed");
  }, [isError, updateError]);

  useEffect(() => {
    isSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    setSlugValue(bannerData?.data?.slug)
  }, [bannerData]);
  return (
    <>
      {!getLoading ? (
        <AddBannerParent
          onSubmit={handleAddDesktopBanner}
          addLoading={isLoading || updateLoading}
          title={"Add related Banner"}
          bannerData={bannerData?.data}
          isRelatedBanner={true}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          bannerSize={"1280 x 570"}
          slugValue={slugValue}
          setSlugValue={setSlugValue}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AddDesktopBanner;
