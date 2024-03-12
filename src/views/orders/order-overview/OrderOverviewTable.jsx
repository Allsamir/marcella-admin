import { CButton, CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useState } from 'react';
import { MdPayment } from 'react-icons/md';
import { useUpdateVendorStatusMutation } from 'src/redux/vendor/vendorApi';
import SellerInfoModal from 'src/ui/SellerInfoModal';
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const OrderOverviewTable = ({ order, index }) => {
    const [showModal, setShowModal] = useState(false);
    const [updateVendorStatus] = useUpdateVendorStatusMutation()
    const { _id, orderId, status, createdAt } = order || {};

    // const handleUpdate = (value, id) => {
    //     const data = { status: value };
    //     updateVendorStatus({ id, data });
    // }
    return (

        <>
            {
                order?.products?.map((product, idx) => product?.product?.sellerId &&
                    <CTableRow key={idx}>
                        <OrderFilterModal />
                        <CTableDataCell>{new Date(createdAt).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell>{orderId}</CTableDataCell>
                        <CTableDataCell>{product?.product?.name}</CTableDataCell>
                        <CTableDataCell>{product?.product?.sellerId}</CTableDataCell>
                        <CTableDataCell>{product?.offerPrice}</CTableDataCell>
                        <CTableDataCell>{status}</CTableDataCell>
                        <CTableDataCell
                            style={{
                                backgroundColor: product?.paymentStatus === 'unpaid' ? '#E55353' : "green",
                                color: "white"
                            }}
                        >{product?.paymentStatus}</CTableDataCell>

                        <CTableDataCell className="d-flex justify-content-center">
                            <CTooltip content="Pay Now">
                                <CButton
                                    className="mb-1  ms-2"
                                    style={{ height: "30px", width: "32px", position: "relative" }}
                                    color="info"
                                    variant="outline"
                                    onClick={() => setShowModal(true)}
                                >
                                    <MdPayment style={{ position: "absolute", top: "25%", left: "25%" }} />
                                </CButton>
                            </CTooltip>
                        </CTableDataCell>
                        <SellerInfoModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            product={product}
                            order={order}
                        />
                    </CTableRow>
                )
            }
        </>

    );
};

export default OrderOverviewTable;