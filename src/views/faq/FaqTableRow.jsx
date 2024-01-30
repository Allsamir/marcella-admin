/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleFaqMutation } from "src/redux/faq/faqApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const FaqTableRow = ({ index, blog }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleFaq,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleFaqMutation();

  // delete blog
  const handleDeleteBlog = () => {
    deleteSingleFaq(blog?._id);
  };

  useEffect(() => {
    toast.dismiss();
    isSuccess && toast.success("Delete blog successfully", { id: "dSuccess" });
    deleteError && toast.error("Delete blog failed", { id: "dFailed" });
  }, [isSuccess, deleteError]);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableHeaderCell scope="row">
        <p>{new Date(blog?.createdAt).toDateString()}</p>
      </CTableHeaderCell>
      <CTableDataCell>
        {<div dangerouslySetInnerHTML={{ __html: blog.title }} />}
        {<div dangerouslySetInnerHTML={{ __html: blog.description }} />}
      </CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/pages/faq/edit/${blog?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteBlog}
        showModal={showModal}
        setShowModal={setShowModal}
        id={blog._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default FaqTableRow;
