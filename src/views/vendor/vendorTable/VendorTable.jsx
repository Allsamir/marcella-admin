import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useUpdateVendorStatusMutation } from 'src/redux/vendor/vendorApi';
import DeleteModal from 'src/ui/DeleteModal';
import UserInfoModal from 'src/ui/UserInfoModal';
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
                    // className={`form-control  ${report?.status === "rejected" && "text-danger"} ${report?.status === "accepted" && "text-success"}`}
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
            <CTableDataCell>
                <CTooltip content="View">
                    <CButton
                        // onClick={() => handleViewOrder(report?.orderId)}
                        className="mb-1  ms-2"
                        style={{ height: "30px", width: "32px", position: "relative" }}
                        color="info"
                        variant="outline"
                    >
                        <BsEye style={{ position: "absolute", top: "25%", left: "25%" }} />
                    </CButton>
                </CTooltip>
                <CTooltip content="Delete">
                    <CButton
                        color="danger"
                        variant="outline"
                        style={{ height: "30px", width: "32px", position: "relative" }}
                        className="ms-2"
                        onClick={() => setShowModal(true)}
                    >
                        <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
                    </CButton>
                </CTooltip>
            </CTableDataCell>
            <DeleteModal
                // deleteThis={deleteSingleReport}
                showModal={showModal}
                setShowModal={setShowModal}
            // id={report?._id}
            // deleteLoading={isLoading}
            />
            <UserInfoModal
            // showModal={showUserInfoModal}
            // setShowModal={setShowUsrInfoModal}
            // user={report?.user}
            />
        </CTableRow>
    );
};

export default VendorTable;