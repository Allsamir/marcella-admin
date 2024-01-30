/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCategoryForm from "src/components/categories/AddCategoryForm";
import {
  useAddCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "src/redux/category/categoryApi";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddCategory = () => {
  const { id } = useParams();
  const [haveId, setHveId] = useState(true);
  const navigate = useNavigate();

  // get hooks query
  const {
    data: category,
    isLoading: getCategoryLoading,
    isError: getCategoryError,
  } = useGetSingleCategoryQuery(id, { skip: haveId });

  // add mutation
  const [
    addCategory,
    { isLoading: addCategoryLoading, isSuccess: addCategorySuccess, isError, error },
  ] = useAddCategoryMutation();
  // update mutation
  const [
    updateCategory,
    {
      isLoading: updateCategoryLoading,
      isSuccess: updateCategorySuccess,
      isError: updateCategoryError,
    },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (id) {
      setHveId(false);
    }
  }, [id]);

  const handleCreateCategory = (data) => {
    // const formData = new FormData();
    // const image = data.image[0];
    // // if (image) formData.append("image", image);
    // if (data.title) formData.append("title", data.title);
    // if (data.description) formData.append("description", data.description);
    // if (data.sortOrder) formData.append("sortOrder", data.sortOrder);

    // update
    if (id) {
      updateCategory({ id, data });
    } else {
      // create
      addCategory(data);
    }
  };

  useEffect(() => {
    toast.dismiss();
    // isError && toast.error("Category added failed", { id: "aError" });
    updateCategoryError &&
      toast.error("Category update failed", {
        id: "uError",
      });
  }, [updateCategoryError, updateCategorySuccess, addCategorySuccess, isError]);

  useEffect(() => {
    updateCategorySuccess && navigate("/category");
    addCategorySuccess && navigate("/category");
  }, [updateCategorySuccess, addCategorySuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton title={id ? "Update Category" : "Add Category"} />

            <CCardBody>
              <AddCategoryForm
                addCategoryLoading={addCategoryLoading}
                updateCategoryLoading={updateCategoryLoading}
                data={category?.result}
                onSubmit={handleCreateCategory}
                error={error}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddCategory;
