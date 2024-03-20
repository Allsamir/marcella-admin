/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
} from "@coreui/react";
import "./imageLibrary.scss";
import { useGetProductImagesQuery } from "src/redux/products/productsApi";
import { Button, Image } from "react-bootstrap";
import { useState } from "react";

const ImageLibraryModal = ({ showModal, setShowModal, handleUpload }) => {
    const [pageNumber, setPageNumber] = useState(1)
    const { data } = useGetProductImagesQuery(`page=${pageNumber}`);
    const [selectedImage, setSelectedImages] = useState([]);
    const handleSelect = (id) => {
        const isExist = selectedImage?.includes(id);
        if (isExist) {
            // If the ID exists, filter it out (remove from the array)
            setSelectedImages(prev => prev.filter(i => i !== id));
        } else {
            // If the ID doesn't exist, add it to the array
            setSelectedImages(prev => [...prev, id]);

        }
    };

    return (
        <CModal
            visible={showModal}
            onClose={() => {
                setShowModal(false);
            }}
            className="image-library"
        >
            <CModalHeader style={{ border: 'none' }} closeButton>Upload from gallery</CModalHeader>
            <CModalBody>
                <div className="library-image-container">
                    {
                        data?.data?.map(d => (
                            d.images.map((url, idx) =>
                                <div key={idx} className="library-image " >
                                    <Image src={url} />
                                    <input
                                        onClick={() => handleSelect(url)}
                                        className={`${selectedImage?.includes(url) ? "image-selected" : ""}`}
                                        type="checkbox"
                                        defaultChecked={selectedImage?.includes(url)}
                                    />
                                </div>)
                        ))
                    }
                </div>
                <div className="text-center mt-3 " >
                    <Button disabled={pageNumber <= 1} className="me-2" onClick={() => setPageNumber(pageNumber - 1)} size="sm">Prev</Button>
                    <Button onClick={() => setPageNumber(pageNumber + 1)} size="sm">Next</Button>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton
                    color="secondary"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    Cancel
                </CButton>
                <CButton
                    color="success"
                    onClick={() => {
                        handleUpload(selectedImage)
                        setShowModal(false);
                    }}
                >
                    Upload
                </CButton>
            </CModalFooter>
        </CModal >
    );
};

export default ImageLibraryModal;
