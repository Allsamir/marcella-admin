import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useDeleteSingleNewsLetterMutation } from "src/redux/all-newsletter/newsLetterApi";
import { useDeleteSingleReviewMutation } from "src/redux/reviews/reviewsApi";
import DeleteModal from "src/ui/DeleteModal";

const NewsLetterTableRow = ({ review, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSingleNewsLetter, { isLoading, isError, isSuccess }] =
    useDeleteSingleNewsLetterMutation();

  useEffect(() => {
    isSuccess && toast.success("Delete  Success");
    isError && toast.error("Delete  Failed");
  }, [isSuccess, isError]);

  return (
    <CTableRow key={review?._id}>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>

      <CTableDataCell>{review?.email}</CTableDataCell>

      <CTableDataCell>{new Date(review?.createdAt).toLocaleDateString()}</CTableDataCell>

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
        deleteThis={deleteSingleNewsLetter}
        showModal={showModal}
        setShowModal={setShowModal}
        id={review?._id}
        deleteLoading={isLoading}
      />
    </CTableRow>
  );
};

export default NewsLetterTableRow;
