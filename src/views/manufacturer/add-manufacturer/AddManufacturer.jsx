import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddManufacturerForm from "src/components/manufacturers/AddManufacturerForm";
import {
  useAddManufactureMutation,
  useGetSingleManufactureQuery,
  useUpdateManufactureMutation,
} from "src/redux/manufacture/manufactureApi";

const AddManufacturer = () => {
  const { id } = useParams();
  const [haveId, setHaveId] = useState(true);
  const { data } = useGetSingleManufactureQuery(id, { skip: haveId });
  const [
    updateManufacture,
    { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError },
  ] = useUpdateManufactureMutation();
  const [addManufacturer, { isLoading: addLoading, isSuccess: addSuccess, isError: addError }] =
    useAddManufactureMutation();

  useEffect(() => {
    if (id) {
      setHaveId(false);
    }
  }, [id]);

  const handleCreateManufacturer = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);

    if (id) {
      updateManufacture({ id, data: formData });
    } else {
      addManufacturer(formData);
    }
  
  };

  const navigate = useNavigate();
  useEffect(() => {
    addSuccess && navigate(-1);
    updateSuccess && navigate(-1);
  }, [updateSuccess, addSuccess]);

  useEffect(() => {
    toast.dismiss();
    if (addError) {
      toast.error("Manufacturer added failed");
    }
    if (updateError) {
      toast.error("Manufacturer updated");
    }
  }, [addError, updateError]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{id ? "Edit" : "Add"} Brand</strong>
            </CCardHeader>
            <CCardBody>
              <AddManufacturerForm
                isLoading={updateLoading || addLoading}
                data={data?.result[0]}
                onSubmit={handleCreateManufacturer}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddManufacturer;
