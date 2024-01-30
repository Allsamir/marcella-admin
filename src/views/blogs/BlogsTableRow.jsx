/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleBlogMutation } from "src/redux/blog/blogsApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const BlogsTableRow = ({ index, blog }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    deleteSingleBlog,
    { isLoading: deleteLoading, isError: deleteError, error: errorMsg, isSuccess },
  ] = useDeleteSingleBlogMutation();

  // delete blog
  const handleDeleteBlog = () => {
    deleteSingleBlog(blog?._id);
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
        {<div dangerouslySetInnerHTML={{ __html: blog.blogTitle }} />}
        {<div dangerouslySetInnerHTML={{ __html: blog.description }} />}
      </CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/pages/blog/edit/${blog?._id}`}>
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

export default BlogsTableRow;
