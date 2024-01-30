/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { toast } from "react-toastify";
import {
  useDeleteBottomBannerMutation,
  useGetBottomAllBannerQuery,
} from "src/redux/banner/bannerApi";
import BannerRowParent from "src/ui/banner/BannerRowParent";
import ManageBannerParent from "src/ui/banner/ManageBannerParent";

const ManageBottomBanner = () => {
  // delete mobile banner hook -> by id
  const [
    deleteTopBanner,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteBottomBannerMutation();

  // load all mobile banner data -> hook
  const {
    data: bottomBannerData,
    isLoading: bottomBannerLoading,
    isError: bottomBannerError,
  } = useGetBottomAllBannerQuery();
  let content = null;

  // checking loading/error/successfully get data
  if (bottomBannerLoading) {
    content = <p>Loading...</p>;
  }
  if (!bottomBannerLoading && bottomBannerError) {
    content = <p className="text-danger">There is something wrong</p>;
  }
  if (!bottomBannerLoading && !bottomBannerError && bottomBannerData?.data?.length === 0) {
    content = <p>There is no banner !!</p>;
  }
  if (bottomBannerData?.data?.length > 0) {
    content = bottomBannerData?.data?.map((data, index) => (
      <BannerRowParent
        key={data?._id}
        data={data}
        index={index}
        deleteBannerHook={deleteTopBanner}
        deleteLoading={deleteLoading}
        to={"bottom-banner"}
      />
    ));
  }

  // is success or error then show message
  {
    deleteSuccess && toast.success("Delete bottom banner successfully");
  }
  {
    deleteError && toast.error("Delete bottom banner failed");
  }
  return (
    <div>
      <ManageBannerParent title="All bottom banner" to="/bottom-banner/add" content={content} />
    </div>
  );
};
export default ManageBottomBanner;
