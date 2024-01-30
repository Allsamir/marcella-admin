import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useDeleteDesktopBannerMutation,
  useGetDesktopAllBannerQuery,
} from "src/redux/banner/bannerApi";
import BannerRowParent from "src/ui/banner/BannerRowParent";
import ManageBannerParent from "src/ui/banner/ManageBannerParent";
import Error from "src/ui/error/Error";

const ManageDesktopBanner = () => {
  // delete single banner with id
  const [
    deleteDesktopBanner,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteDesktopBannerMutation();

  // laod all get desktop banner hook
  const {
    data: desktopBannerData,
    isLoading: desktopBannerLoading,
    isError: desktopBannerError,
  } = useGetDesktopAllBannerQuery();

  // checking loading/error/successfully get data
  let content = null;
  if (desktopBannerLoading) {
    content = <p>Loading...</p>;
  }
  if (!desktopBannerLoading && desktopBannerError) {
    content = <Error>There is something wrong</Error>;
  }
  if (!desktopBannerLoading && !desktopBannerError && desktopBannerData?.data?.length === 0) {
    content = <Error>There is no banner !!</Error>;
  }
  if (desktopBannerData) {
    content = desktopBannerData?.data?.map((data, index) => (
      <BannerRowParent
        key={data?._id}
        data={data}
        index={index}
        deleteBannerHook={deleteDesktopBanner}
        deleteLoading={deleteLoading}
        to={"desktop-banner"}
      />
    ));
  }

  // is success or error then show message
  useEffect(() => {
    deleteSuccess && toast.success("Delete Desktop banner successfully");
    deleteError && toast.error("Delete Desktop banner failed");
  }, [deleteSuccess, deleteError]);
  return (
    <div>
      <ManageBannerParent title="All desktop banner" to="/desktop-banner/add" content={content} />
    </div>
  );
};

export default ManageDesktopBanner;
