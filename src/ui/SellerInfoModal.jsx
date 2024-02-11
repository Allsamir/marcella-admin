/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilEnvelopeOpen, cilGroup, cilLocationPin, cilPhone, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
} from "@coreui/react";
import { memo } from "react";

const SellerInfoModal = ({ showModal, setShowModal, vendor }) => {
    const { _id, name, slug, email, status, createdAt } = vendor || {};
    return (
        <CModal
            visible={showModal}
            onClose={() => {
                setShowModal(false);
            }}
        >
            <CModalHeader closeButton>See this seller info</CModalHeader>
            <CModalBody>
                <CCol xs={12}>
                    <CCard className="">
                        <CCardHeader className="d-flex align-items-center justify-content-between">
                            <strong className="d-flex align-items-center gap-2">
                                {" "}
                                <CIcon icon={cilUser} className="nav-icon" />
                                Seller Details
                            </strong>
                        </CCardHeader>
                        <CCardBody className="py-1 px-0">
                            <CListGroup flush>
                                <CListGroupItem className="d-flex align-items-center">
                                    <div
                                        style={{
                                            height: "24px",
                                            width: "24px",
                                            backgroundColor: "#5bc0de",
                                            borderRadius: "2px ",
                                            border: "1px solid  #39b3d7",
                                        }}
                                        className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                    >
                                        <CIcon
                                            icon={cilUser}
                                            className="mx-1 text-white"
                                            style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                                        />
                                    </div>
                                    {name}
                                </CListGroupItem>

                                <CListGroupItem className="d-flex align-items-center">
                                    <div
                                        style={{
                                            height: "24px",
                                            width: "24px",
                                            backgroundColor: "#5bc0de",
                                            borderRadius: "2px ",
                                            border: "1px solid  #39b3d7",
                                        }}
                                        className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                    >
                                        <CIcon
                                            icon={cilEnvelopeOpen}
                                            className="mx-1 text-white"
                                            style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                                        />
                                    </div>

                                    {email}
                                </CListGroupItem>
                                <CListGroupItem className="d-flex align-items-center">
                                    <div
                                        style={{
                                            height: "24px",
                                            width: "24px",
                                            backgroundColor: "#5bc0de",
                                            borderRadius: "2px ",
                                            border: "1px solid  #39b3d7",
                                        }}
                                        className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                    >
                                        <CIcon
                                            icon={cilPhone}
                                            className="mx-1 text-white"
                                            style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                                        />
                                    </div>
                                    {'017000000'}
                                </CListGroupItem>
                                <CListGroupItem className="d-flex align-items-center">
                                    <div
                                        style={{
                                            height: "24px",
                                            width: "24px",
                                            backgroundColor: "#5bc0de",
                                            borderRadius: "2px ",
                                            border: "1px solid  #39b3d7",
                                        }}
                                        className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                    >
                                        <CIcon
                                            icon={cilLocationPin}
                                            className="mx-1 text-white"
                                            style={{ width: "2.28571429em", lineHeight: "1.5rem" }}
                                        />
                                    </div>
                                    {'Adept KR Complex'}
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default memo(SellerInfoModal);
