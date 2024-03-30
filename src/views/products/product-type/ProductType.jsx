/* eslint-disable prettier/prettier */
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import { useGetAllproductTypeQuery } from "src/redux/productType/productTypeApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import SubcategoryTableRow from "src/views/subcategories/manage-subcategories/SubcategoryTableRow";
import ProductTypeTable from "./ProductTypeTable";

const ProductType = () => {
    const {
        data: productType,
        isLoading: productLoading,
        isError: productError,
    } = useGetAllproductTypeQuery();

    let content = null;
    if (productLoading) {
        content = <p className="px-2 my-2 fs-5 text-primary">Loading..</p>;
    }
    if (!productLoading && productError) {
        content = <p className="text-danger">There was an error</p>;
    }
    if (!productLoading && !productError && productType?.result?.length === 0) {
        content = <p>There is no category</p>;
    }
    //
    if (!productLoading && !productError && productType?.result?.length > 0) {
        content = productType?.result?.map((proType, index) => (
            <ProductTypeTable key={proType?._id} proType={proType} index={index} />
        ));
    }
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CardHeaderButton title={"All ProductType"} to={"/product-type/add"} />
                        <CCardBody>
                            <p className="text-medium-emphasis small">Here is the list of all Product type.</p>

                            <CTable align="middle" className="mb-0 border" bordered hover responsive>
                                <CTableHead color="light">
                                    <CTableRow className="text-start">
                                        <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                                            Sl. No.
                                            {/* <Form.Check inline type="checkbox" /> */}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                                        <CTableHeaderCell
                                            scope="col"
                                            style={{
                                                width: "100px",
                                                minWidth: "100px",
                                            }}
                                        >
                                            Actions
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>{content}</CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default ProductType;
