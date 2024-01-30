/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { toast } from "react-toastify";
import { useDeleteSideBannerMutation, useGetSideAllBannerQuery } from "src/redux/banner/bannerApi";
import BannerRowParent from "src/ui/banner/BannerRowParent";
import ManageBannerParent from "src/ui/banner/ManageBannerParent";

const ManageTopBanner = () => {
  // delete mobile banner hook -> by id
  const [
    deleteTopBanner,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteSideBannerMutation();

  // load all mobile banner data -> hook
  const {
    data: topBannerData,
    isLoading: topBannerLoading,
    isError: topBannerError,
  } = useGetSideAllBannerQuery();
  let content = null;

  // checking loading/error/successfully get data
  if (topBannerLoading) {
    content = <p>Loading...</p>;
  }
  if (!topBannerLoading && topBannerError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!topBannerLoading && !topBannerError && topBannerData?.data?.length === 0) {
    content = <p>There is no banner !!</p>;
  }
  if (topBannerData?.data?.length > 0) {
    content = topBannerData?.data?.map((data, index) => (
      <BannerRowParent
        key={data?._id}
        data={data}
        index={index}
        deleteBannerHook={deleteTopBanner}
        deleteLoading={deleteLoading}
        to={"side-banner"}
      />
    ));
  }

  // is success or error then show message
  {
    deleteSuccess && toast.success("Delete top banner successfully");
  }
  {
    deleteError && toast.error("Delete top banner failed");
  }
  return (
    <div>
      <ManageBannerParent title="All side banner" to="/side-banner/add" content={content} />
    </div>
  );
};
export default ManageTopBanner;
