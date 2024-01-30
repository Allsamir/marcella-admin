import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddSubcategoryChildrenForm from "src/components/subCategoryChildren/AddSubCategoryChildrenForm";

import {
  useAddSubCategoryChildrenMutation,
  useGetSingleSubCategoryChildrenQuery,
  useUpdateSubCategoryChildrenMutation,
} from "src/redux/subCategoryChildren/subCategoryChildrenApi";
import Loading from "src/ui/Loading";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddSubcategoryChildren = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: subcategory, getLoading } = useGetSingleSubCategoryChildrenQuery(id);

  const [
    addSubcategoryChildren,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useAddSubCategoryChildrenMutation();
  const [
    updateSubCategoryChildren,
    { isLoading: updateSubCategoryLoading, isSuccess: updateSuccess, isError: updateError },
  ] = useUpdateSubCategoryChildrenMutation();

  const handleCreateSubcategory = (data) => {
    const formData = new FormData();
    let image = null;
    if (data.image) image = data.image[0];
    if (image) formData.append("image", image);
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.nicheCategory) formData.append("nicheCategory", data.nicheCategory);
    if (data.subcategory) formData.append("subcategory", data.subcategory);
    if (data.nicheTitle) formData.append("nicheTitle", data.nicheTitle);

    if (id) {
      updateSubCategoryChildren({ id, data: formData });
    } else {
      addSubcategoryChildren(formData);
    }
  };

  useEffect(() => {
    if (addError) {
      toast.error("Failed To Updated");
    }
    if (updateError) {
      toast.error("Failed To Updated");
    }
  }, [addError, updateError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, addSuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton
              title={id ? "Update subcategory children" : "Add subcategory children"}
            />

            <CCardBody>
              {!getLoading ? (
                <AddSubcategoryChildrenForm
                  addLoading={addLoading}
                  updateSubCategoryLoading={updateSubCategoryLoading}
                  data={subcategory?.result}
                  onSubmit={handleCreateSubcategory}
                />
              ) : (
                <Loading />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddSubcategoryChildren;
