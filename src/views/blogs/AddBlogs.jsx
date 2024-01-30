/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewBlogMutation,
  useGetSingleBlogsQuery,
  useUpdateSingleBlogMutation,
} from "src/redux/blog/blogsApi";
import AddBlogForm from "./AddBlogForm";
import Loading from "src/ui/Loading";

const AddBlogs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogDescription, setBlogDescription] = useState();
  const [blogTags, setBlogTags] = useState([]);

  const {
    data: blogData,
    isLoading: blogLoading,
  } = useGetSingleBlogsQuery(id);

  const [
    addNewBlog,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewBlogMutation();

  const [
    updateSingleBlog,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleBlogMutation();

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (data.author) formData.append("author", data.author);
    if (data.blogTitle) formData.append("blogTitle", data.blogTitle);
    if (slugValue) formData.append("slug", slugValue);
    if (blogDescription) formData.append("description", blogDescription);
    if (blogTags) formData.append("tags", JSON.stringify(blogTags));

    if (id) {
      updateSingleBlog({ id, formData });
    } else {
      addNewBlog(formData);
    }
  };

  useEffect(() => {
    addMsg && toast.error(addMsg?.data?.message || "Add failed");
    updateMsg && toast.error(updateMsg?.data?.message || "Update failed");
  }, [addMsg, updateMsg]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, navigate, updateSuccess]);

  const [slugValue, setSlugValue] = useState("");

  useEffect(() => {
    setSlugValue(blogData?.data?.slug)
  }, [blogData]);

  return (
    <>
      {blogLoading ? (
        <Loading />
      ) : (
        <AddBlogForm
          blogDescription={blogDescription}
          setBlogDescription={setBlogDescription}
          blogData={blogData?.data}
          loading={addLoading || updateLoading}
          onSubmit={onSubmit}
          blogTags={blogTags}
          setBlogTags={setBlogTags}
          slugValue={slugValue}
          setSlugValue={setSlugValue}
        />
      )}
    </>
  );
};

export default AddBlogs;
