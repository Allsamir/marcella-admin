import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleReviewMutation } from "src/redux/reviews/reviewsApi";
import DeleteModal from "src/ui/DeleteModal";
import UserInfoModal from "src/ui/UserInfoModal";

const ReviewTableRow = ({ review, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSingleReview, { isLoading, isError, isSuccess }] = useDeleteSingleReviewMutation();
  const [showUserInfoModal, setShowUsrInfoModal] = useState(false);

  {
    isSuccess && toast.success("Delete Review Success");
  }
  {
    isError && toast.error("Delete Review Failed");
  }
  return (
    <CTableRow key={review?._id}>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>
        <Image src={review?.product?.images?.[0]} alt="product_image" height={50} />
      </CTableDataCell>
      <CTableDataCell>{review?.description}</CTableDataCell>
      <CTableDataCell>
        <CTooltip content="See user">
          <Link to="" onClick={() => setShowUsrInfoModal(true)} style={{ textDecoration: "none" }}>
            {review?.user?.name}
          </Link>
        </CTooltip>
      </CTableDataCell>
      <CTableDataCell>{new Date(review?.createdAt).toLocaleDateString()}</CTableDataCell>
      <CTableDataCell>{review?.rating}</CTableDataCell>
      <CTableDataCell>
        <CTooltip content="Delete">
          <CButton
            color="danger"
            variant="outline"
            style={{ height: "30px", width: "32px", position: "relative" }}
            className="ms-2"
            onClick={() => setShowModal(true)}
          >
            <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </CTooltip>
      </CTableDataCell>
      <DeleteModal
        deleteThis={deleteSingleReview}
        showModal={showModal}
        setShowModal={setShowModal}
        id={review?._id}
        deleteLoading={isLoading}
      />
      <UserInfoModal
        showModal={showUserInfoModal}
        setShowModal={setShowUsrInfoModal}
        user={review?.user}
      />
    </CTableRow>
  );
};

export default ReviewTableRow;
