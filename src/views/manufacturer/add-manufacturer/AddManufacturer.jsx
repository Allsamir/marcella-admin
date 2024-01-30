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
    const modifyData = {};
    if (data.name) modifyData.name = data.name;
    if (data.description) modifyData.description = data.description;
    if (id) {
      updateManufacture({ id, data: modifyData });
    } else {
      addManufacturer(modifyData);
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
