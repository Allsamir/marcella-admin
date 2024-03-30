import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddProductTypeForm from "src/components/products/AddProductTypeForm";
import { useAddProductTypeMutation, useGetSingleProductTypeQuery, useUpdateSingleProductTypeMutation } from "src/redux/productType/productTypeApi";

const AddproductType = () => {
    const { id } = useParams();
    const [haveId, setHaveId] = useState(true);
    const { data } = useGetSingleProductTypeQuery(id, { skip: haveId });
    console.log(data)
    const [
        updateProductType,
        { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError },
    ] = useUpdateSingleProductTypeMutation();
    const [addProductType, { isLoading: addLoading, isSuccess: addSuccess, isError: addError }] =
        useAddProductTypeMutation();

    useEffect(() => {
        if (id) {
            setHaveId(false);
        }
    }, [id]);

    const handleProductType = (data) => {
        if (id) {
            updateProductType({ id, data });
        } else {
            addProductType({ data });
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
            toast.error("Product Type added failed");
        }
        if (updateError) {
            toast.error("Product Type updated");
        }
    }, [addError, updateError]);

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>{id ? "Edit" : "Add"} Product Type</strong>
                        </CCardHeader>
                        <CCardBody>
                            <AddProductTypeForm
                                isLoading={updateLoading || addLoading}
                                data={data?.result}
                                onSubmit={handleProductType}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default AddproductType;
