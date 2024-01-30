/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSingleProductMutation } from "src/redux/products/productsApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";
const ProductTableRow = ({ product, index }) => {
  const [showModal, setShowModal] = useState(false);

  const [
    deleteSingleProduct,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteSingleProductMutation();

  const handleDeleteProduct = (id) => {
    deleteSingleProduct(id);
  };

  useEffect(() => {
    deleteSuccess && toast.success("Product deleted successfully");
    deleteError && toast.error("Product deleted failed");
  }, [deleteSuccess, deleteError]);

  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>
        <img
          src={product?.images?.[0]}
          alt={product?.model}
          style={{
            height: "2.5rem",
            width: "2.5rem",
            borderRadius: "0.25rem",
            objectFit: "cover",
          }}
          className="border"
        />
      </CTableDataCell>
      <CTableDataCell>{product?.name}</CTableDataCell>
      {/* <CTableDataCell>{product?.model}</CTableDataCell> */}
      <CTableDataCell>{product?.discountPercentage} %</CTableDataCell>
      <CTableDataCell>{product.status}</CTableDataCell>
      <CTableDataCell
        className={`${
          product.quantity <= 15 &&
            "text-danger"
        }`}
      >
        {product.quantity}
      </CTableDataCell>
      <CTableDataCell>৳{product.price}</CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/product/edit/${product?._id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={handleDeleteProduct}
        showModal={showModal}
        setShowModal={setShowModal}
        id={product._id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default ProductTableRow;
