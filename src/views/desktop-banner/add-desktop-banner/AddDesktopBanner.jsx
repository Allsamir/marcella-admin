/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddDesktopBannerMutation,
  useGetSingleDesktopBannerQuery,
  useUpdateDesktopBannerMutation,
} from "src/redux/banner/bannerApi";
import AddBannerParent from "src/ui/banner/AddBannerParentForm";
import Loading from "src/ui/Loading";

const AddDesktopBanner = () => {
  // add desktop banner hook
  const { id } = useParams();
  const [addDesktopBanner, { isLoading, isError, error, isSuccess }] = useAddDesktopBannerMutation();
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");
  const [slugValue, setSlugValue] = useState("");

  const {
    data: bannerData,
    isLoading: getLoading,
    isError: getError,
  } = useGetSingleDesktopBannerQuery(id);

  const [
    updateDesktopBanner,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateDesktopBannerMutation();

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
    if (data.product) formData.append("product", data.product);
    if (data.campaignProducts) formData.append("campaignProducts", JSON.stringify(data.campaignProducts));
    if (data.related) formData.append("related", data.related);
    if (color) formData.append("bannerColor", color);
    if (slugValue) formData.append("slug", slugValue);

    if (id) {
      updateDesktopBanner({ id: bannerData?.data?._id, formData: formData });
    } else {
      addDesktopBanner(formData);
    }
  };

  useEffect(() => {
    isError && toast.error(error?.data?.message || "Desktop banner added failed");
    updateError && toast.error("Desktop banner updated failed");
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
          title={"Add Desktop Banner"}
          bannerData={bannerData?.data}
          bannerSize={"1280 x 570"}
          desktopBanner={true}
          color={color}
          setColor={setColor}
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
