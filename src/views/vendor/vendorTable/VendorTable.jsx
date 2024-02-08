import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import DeleteModal from 'src/ui/DeleteModal';
import UserInfoModal from 'src/ui/UserInfoModal';
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const VendorTable = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <CTableRow>
            <OrderFilterModal />
            <CTableHeaderCell scope="row">
                {/* {index + 1} */}k
            </CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
                <CFormSelect
                    aria-label="Order Status"
                    // className={`form-control  ${report?.status === "rejected" && "text-danger"} ${report?.status === "accepted" && "text-success"}`}
                    style={{ backgroundColor: "#f9f9f9" }}
                // options={reportOptions}
                // value={selectedValue}
                // onChange={(e) => handleUpdate(e.target.value, report?._id)}
                // {...register("orderStatus", { required: true })}
                />
            </CTableDataCell>
            <CTableDataCell>
                {/* {report?.description} */}
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