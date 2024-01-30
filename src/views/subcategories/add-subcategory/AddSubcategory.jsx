import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddSubcategoryForm from "src/components/subcategories/AddSubcategoryForm";
import {
  useAddSubCategoryMutation,
  useGetSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "src/redux/subCategory/subCategoryApi";
import Loading from "src/ui/Loading";
import HeaderBackButton from "src/ui/button/HeaderBackButton";

const AddSubcategory = () => {
  const [haveId, setHaveId] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [
    addSubcategory,
    {
      isLoading: addSubCategoryLoading,
      isSuccess: addSubcategorySuccess,
      isError: addSubcategoryError,
    },
  ] = useAddSubCategoryMutation();
  const { data: subcategory, isLoading: getLoading } = useGetSingleSubCategoryQuery(id, {
    skip: haveId,
  });
  const [
    updateSubCategory,
    {
      isLoading: updateSubCategoryLoading,
      isSuccess: updateSubCategorySuccess,
      isError: updateSubCategoryError,
    },
  ] = useUpdateSubCategoryMutation();

  const handleCreateSubcategory = (data) => {
    if (id) {
      updateSubCategory({ id, data });
    } else {
      addSubcategory(data);
    }
  };

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  useEffect(() => {
    toast.dismiss();
    addSubcategoryError && toast.warning("Subcategory added failed!", { id: "aError" });
    updateSubCategoryError && toast.warning("Subcategory updated failed!", { id: "uError" });
  }, [addSubcategoryError, updateSubCategoryError]);

  useEffect(() => {
    addSubcategorySuccess && navigate(-1);
    updateSubCategorySuccess && navigate(-1);
  }, [updateSubCategorySuccess, addSubcategorySuccess]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <HeaderBackButton title={id ? "Update sub category" : "Add sub category"} />

            <CCardBody>
              {
                getLoading ? <Loading /> : <AddSubcategoryForm
                  addSubCategoryLoading={addSubCategoryLoading}
                  updateSubCategoryLoading={updateSubCategoryLoading}
                  data={subcategory?.result}
                  onSubmit={handleCreateSubcategory}
                />
              }

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddSubcategory;
