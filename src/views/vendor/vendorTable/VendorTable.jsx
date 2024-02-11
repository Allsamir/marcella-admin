import { CButton, CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useUpdateVendorStatusMutation } from 'src/redux/vendor/vendorApi';
import SellerInfoModal from 'src/ui/SellerInfoModal';
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const VendorTable = ({ vendor, index }) => {
    const [showModal, setShowModal] = useState(false);
    const [updateVendorStatus] = useUpdateVendorStatusMutation()
    const { _id, name, slug, email, status, createdAt } = vendor || {};


    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "active", label: "Active" }
    ];

    const handleUpdate = (value, id) => {
        const data = { status: value };
        updateVendorStatus({ id, data });
    }
    return (
        <CTableRow>
            <OrderFilterModal />
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{name}</CTableDataCell>
            <CTableDataCell>{email}</CTableDataCell>
            <CTableDataCell>
                <CFormSelect
                    aria-label="Order Status"
                    style={{
                        backgroundColor: status === 'active' ? 'green' : "#f9f9f9",
                        color: status === 'active' ? 'white' : "black"
                    }}
                    options={statusOptions}
                    value={status}
                    onChange={(e) => handleUpdate(e.target.value, _id)}
                />
            </CTableDataCell>
            <CTableDataCell>{new Date(createdAt).toLocaleString()}</CTableDataCell>
            <CTableDataCell>
                <Link
                    to={`https://marcella-ten.vercel.app/shop/${slug}`}
                    target='_blank'
                    style={{
                        textAlign: 'center',
                        display: 'block'
                    }}>View</Link>
            </CTableDataCell>
            <CTableDataCell className="d-flex justify-content-center">
                <CTooltip content="View">
                    <CButton
                        className="mb-1  ms-2"
                        style={{ height: "30px", width: "32px", position: "relative" }}
                        color="info"
                        variant="outline"
                        onClick={() => setShowModal(true)}
                    >
                        <BsEye style={{ position: "absolute", top: "25%", left: "25%" }} />
                    </CButton>
                </CTooltip>
            </CTableDataCell>
            <SellerInfoModal
                showModal={showModal}
                setShowModal={setShowModal}
                vendor={vendor}
            />
        </CTableRow>
    );
};

export default VendorTable;