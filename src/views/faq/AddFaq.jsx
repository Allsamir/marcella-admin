/* eslint-disable prettier/prettier */
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CRow } from "@coreui/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewBlogMutation,
  useGetSingleBlogsQuery,
  useUpdateSingleBlogMutation,
} from "src/redux/blog/blogsApi";
import {
  useAddNewFaqMutation,
  useGetSingleFaqQuery,
  useUpdateSingleFaqMutation,
} from "src/redux/faq/faqApi";
import CancelButton from "src/ui/button/CancelButton";
import HeaderBackButton from "src/ui/button/HeaderBackButton";
import { getModels } from "src/utils/getReactQuilModel";

const AddFaq = () => {
  const modules = getModels();
  const navigate = useNavigate();
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const { handleSubmit, setValue } = useForm();
  const [faqDescription, setFaqDescription] = useState();
  const [faqTitle, setFaqTitle] = useState();

  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogError,
    error: blogErrorMsg,
  } = useGetSingleFaqQuery(id, { skip: haveId });

  const [
    addNewBlog,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess, error: addMsg },
  ] = useAddNewFaqMutation();

  const [
    updateSingleBlog,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateMsg },
  ] = useUpdateSingleFaqMutation();

  const onSubmit = () => {
    if (id) {
      const data = {
        description: faqDescription,
        title: faqTitle,
      };
      updateSingleBlog({ id, data });
    } else {
      addNewBlog({ description: faqDescription, title: faqTitle });
    }
  };

  useMemo(() => {
    if (id) {
      setFaqDescription(blogData?.data?.description);
      setFaqTitle(blogData?.data?.title);
    }
  }, [id, blogData?.data]);

  useEffect(() => {
    addError && toast.error(addError?.data?.message);
    updateError && toast.error(updateError?.data?.message);
  }, [addError, updateError]);

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [addSuccess, updateSuccess]);

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <HeaderBackButton title={id ? "Update faq" : "Add faq"} />

        {blogLoading ? (
          <p>Loading..</p>
        ) : (
          <CCardBody>
            <CCol xs={12}>
              <label className="w-100">Faq Title</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter blog title here"
                modules={modules}
                value={faqTitle}
                onChange={setFaqTitle}
              />
            </CCol>
            <CCol xs={12}>
              <label className="w-100">Faq Description</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                placeholder="Enter blog descriptions here"
                modules={modules}
                value={faqDescription}
                onChange={setFaqDescription}
              />
            </CCol>
            <div className="text-end  ">
              <CancelButton />
              <CButton type="submit" color="success" className="mt-3 text-white">
                <CIcon icon={cilSave} className="me-2" />
                {updateLoading || addLoading ? "Loading..." : id ? "Update" : "Save"}
              </CButton>
            </div>
          </CCardBody>
        )}
      </CCard>
    </CForm>
  );
};

export default AddFaq;
