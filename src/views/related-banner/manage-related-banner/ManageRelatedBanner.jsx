import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useDeleteRelatedBannerMutation,
  useGetRelatedAllBannerQuery,
} from "src/redux/banner/bannerApi";
import BannerRowParent from "src/ui/banner/BannerRowParent";
import ManageBannerParent from "src/ui/banner/ManageBannerParent";
import Error from "src/ui/error/Error";

const ManageDesktopBanner = () => {
  // delete single banner with id
  const [
    deleteRelatedBanner,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteRelatedBannerMutation();

  // laod all get desktop banner hook
  const {
    data: bannerData,
    isLoading: desktopBannerLoading,
    isError: desktopBannerError,
  } = useGetRelatedAllBannerQuery();

  // checking loading/error/successfully get data
  let content = null;
  if (desktopBannerLoading) {
    content = <p>Loading...</p>;
  }
  if (!desktopBannerLoading && desktopBannerError) {
    content = <Error>There is something wrong</Error>;
  }
  if (!desktopBannerLoading && !desktopBannerError && bannerData?.data?.length === 0) {
    content = <Error>There is no banner !!</Error>;
  }
  if (bannerData) {
    content = bannerData?.data?.map((data, index) => (
      <BannerRowParent
        key={data?._id}
        data={data}
        index={index}
        deleteBannerHook={deleteRelatedBanner}
        deleteLoading={deleteLoading}
        to={"related-banner"}
      />
    ));
  }

  // is success or error then show message
  useEffect(() => {
    deleteSuccess && toast.success("Delete banner successfully");
    deleteError && toast.error("Delete banner failed");
  }, [deleteSuccess, deleteError]);
  return (
    <div>
      <ManageBannerParent title="All related banner" to="/related-banner/add" content={content} />
    </div>
  );
};

export default ManageDesktopBanner;