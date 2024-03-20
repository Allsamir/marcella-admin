/* eslint-disable prettier/prettier */
import { CCol, CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Button, Image, Stack } from 'react-bootstrap';
import { RiDeleteBinLine } from 'react-icons/ri';
import ImageLibraryModal from 'src/ui/ImageLibrary/ImageLibraryModal';

const ProductImage = ({ register, setImages, errors, images, setRemainingImages, remainingImages, data, handleDeletePreview, libraryUrls, setLibraryUrls }) => {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setRemainingImages(data?.images);
    }, [data?.images]);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file.size > 2 * 1024 * 1024) {
            setError("File size should be less than 2MB");
            setImagePreview(null);
        } else {
            setImagePreview(URL.createObjectURL(file));
            setError(null);
        }
    }

    const handleRemoveImage = (url) => {
        remainingImages?.length > 1 && setRemainingImages((prev) => prev.filter((u) => u !== url));
    };

    const handleUpload = (urls) => {
        setLibraryUrls(urls)
    }
    const handleDeleteLibraryUrls = (url) => {
        setLibraryUrls((prev) => prev.filter((u) => u !== url))
    }

    return (
        <>

            <CCol xs={12}>
                <label htmlFor="" className="mb-2">
                    Product Images <small>(1080 x 1080)</small>
                </label>
                <div className="d-flex align-items-end gap-2">
                    <CFormInput
                        type="file"
                        id="file-upload"
                        accept=".jpg, .png, .jpeg, .gif"
                        multiple
                        aria-describedby="file-upload"
                        {...register("images", {
                            // required: {
                            //   value: data ? false : true,
                            //   message: "Image is required",
                            // },
                        })}
                        onChange={(e) => {
                            setImages(e.target.files);
                            handleFileChange(e);
                        }}
                    />
                    <Button type='button' onClick={() => setShowModal(true)} className="p-1 w-50">
                        Upload from Image Library
                    </Button>
                    <ImageLibraryModal handleUpload={handleUpload} setShowModal={setShowModal} showModal={showModal} />
                </div>
            </CCol>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {errors.images && <p className="text-danger">Image is required</p>}
            {!error && images &&
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {[...images]?.map((file, index) => (
                        <div key={index} className="image-container">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Product Imaged Preview ${index + 1}`}
                                className="image-preview"
                            />
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => handleDeletePreview(index)}
                            >
                                <RiDeleteBinLine size={24} color="white" />
                            </button>
                        </div>
                    ))}
                </div>
            }
            {<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {libraryUrls?.map((file, index) => (
                    <div key={index} className="image-container">
                        <img
                            src={file}
                            alt={`Product Imaged Preview ${index + 1}`}
                            className="image-preview"
                        />
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => handleDeleteLibraryUrls(file)}
                        >
                            <RiDeleteBinLine size={24} color="white" />
                        </button>
                    </div>
                ))}
            </div>
            }
            <Stack gap={4} direction="horizontal" className="d-flex flex-wrap mt-4">
                {remainingImages?.map((url, index) => (
                    <CCol md={3} xs={1} key={index}>
                        <div className="border p-2 position-relative" style={{ maxWidth: "200px" }}>
                            <Image src={url} alt={`Product Img`} fluid />
                            <div
                                className=" position-absolute "
                                style={{
                                    top: "-22px",
                                    left: "93%",
                                    width: "100%",
                                }}
                            >
                                <button
                                    type='button'
                                    // disabled={remainingImages?.length === 1}
                                    onClick={() => handleRemoveImage(url)}
                                    className="rounded-circle fs-5 border-0 px-2 d-flex justify-content-center align-items-center "
                                >
                                    x
                                </button>
                            </div>
                        </div>
                    </CCol>
                ))}
            </Stack>
        </>
    );
};

export default ProductImage;