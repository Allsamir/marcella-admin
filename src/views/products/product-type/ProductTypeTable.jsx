/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleProductTypeMutation } from "src/redux/productType/productTypeApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const ProductTypeTable = ({ proType, index }) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteProductType, { isLoading, isSuccess, isError }] = useDeleteSingleProductTypeMutation();
    const handelProductTypeDelete = (id) => {
        deleteProductType(id);
    };

    useEffect(() => {
        toast.dismiss();
        isError && toast.error("Delete failed", { id: "dError" });
        isSuccess && toast.success("Delete successfully", { id: "dSuccess" });
    }, [isError, isSuccess]);
    return (
        <CTableRow>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{proType?.title}</CTableDataCell>
            <CTableDataCell>
                <div className="">
                    <Link to={`/product-type/edit/${proType?._id}`}>
                        <EditButton />
                    </Link>
                    <DeleteButton setShowModal={setShowModal} />
                </div>
            </CTableDataCell>
            <DeleteModal
                deleteThis={handelProductTypeDelete}
                showModal={showModal}
                setShowModal={setShowModal}
                id={proType._id}
                deleteLoading={isLoading}
            />
        </CTableRow>
    );
};

export default ProductTypeTable;
