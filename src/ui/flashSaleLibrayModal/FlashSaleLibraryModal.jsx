/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {
    CButton,
    CCol,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
} from "@coreui/react";
import "../ImageLibrary/imageLibrary.scss";
import Select from "react-select";
import { Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGetAllProductQuery, useUpdateSingleProductMutation } from "src/redux/products/productsApi";
import { useLocation } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useGetAllTypesQuery } from "src/redux/flashSaleType/flashSaleTypeApi";

const FlashSaleLibraryModal = ({ showModal, setShowModal, handleUpload }) => {
    const location = useLocation();
    const [pageNumber, setPageNumber] = useState(1)
    const [search, setSearch] = useState('');
    const [updateProduct] = useUpdateSingleProductMutation()
    const { data: allTypes, isLoading: typeLoading, isError: typeError } = useGetAllTypesQuery();
    const { data } = useGetAllProductQuery(`?&page=${pageNumber}&search=${search}`)
    const [selectedImage, setSelectedImages] = useState([]);
    const [offerType, setOfferType] = useState(null)

    const handleSelect = (d) => {
        const isExist = selectedImage?.includes(d?._id);
        if (isExist) {
            // If the ID exists, filter it out (remove from the array)
            setSelectedImages(prev => prev.filter(i => i !== d?._id));
        } else {
            // If the ID doesn't exist, add it to the array
            setSelectedImages(prev => [...prev, d?._id]);

        }

        const formData = new FormData();

        formData.append("flashSale", true);
        if (offerType) formData.append("flashSaleOfferType", offerType);
        if (d?._id) d?.images.forEach((img) => {
            formData.append("prevImage", img);
        });

        updateProduct({ id: d?._id, data: formData })

    };

    let typesOptions = [];
    typesOptions.push(<option value="">Select one</option>)
    allTypes?.data?.map((op, index) => {
        typesOptions.push(<option key={index} value={op?.name} >{op?.name}</option>)
    })


    return (
        <CModal
            visible={showModal}
            onClose={() => {
                setShowModal(false);
            }}
            className="image-library"
        >
            <CModalHeader style={{ border: 'none' }} closeButton>Add Flash Sale Product</CModalHeader>
            <CRow className="mx-4 mb-2">
                <CCol xs={6} className="mt-3">
                    <CFormInput
                        onChange={(e) => setSearch(e.target.value)}
                        id="exampleFormControlInput1"
                        label='Search Product'
                        placeholder='Search Product'
                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                </CCol>
                <CCol xs={6} className="mt-3">
                    <label className="w-100">Flash Sale Offer Type</label>

                    <select onChange={(e) => setOfferType(e.target.value)} className="w-100 py-1 mt-2 rounded block border-black-50">
                        {typesOptions}
                    </select>

                </CCol>
            </CRow>
            <CModalBody>
                <div className="flash-product-image-gallery">
                    {
                        data?.result?.data?.map(d =>
                            <div key={d?._id} className="library-image" >
                                <Image src={d?.images[0]} style={{ height: '120px' }} />
                                <p className="text-center">{d?.name}</p>
                                <input
                                    disabled={!offerType}
                                    onClick={() => handleSelect(d)}
                                    className={`${d?.productType === 'flash-sale' ? "image-selected" : ""}`}
                                    type="checkbox"
                                    defaultChecked={d?.productType === 'flash-sale'}
                                />
                            </div>
                        )
                    }
                </div>
                <div className="text-center mt-3 " >
                    <Button disabled={pageNumber <= 1} className="me-2" onClick={() => setPageNumber(pageNumber - 1)} size="sm">Prev</Button>
                    <Button onClick={() => setPageNumber(pageNumber + 1)} size="sm">Next</Button>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton
                    color="danger"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal >
    );
};

export default FlashSaleLibraryModal;
