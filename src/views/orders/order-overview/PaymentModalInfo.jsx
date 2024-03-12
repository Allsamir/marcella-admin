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
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import { memo, useState } from "react";
import { useUpdatePaymentOrderMutation } from "src/redux/order/orderApi";
import { useGetSingleSellerQuery } from "src/redux/vendor/vendorApi";

const PaymentModalInfo = ({ showModal, setShowModal, order, product, sellerId }) => {
    const [confirmModal, setConfirmModal] = useState(false)
    const { status, createdAt } = order || {};
    const { data: sellerInfo } = useGetSingleSellerQuery(sellerId);
    const { email, name } = sellerInfo?.data || {}
    const [transactionNumber, setTransactionNumber] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [updatePaymentOrder, { isLoading, isError, isSuccess }] = useUpdatePaymentOrderMutation()


    const handelPayment = () => {
        const data = {
            transactionNumber,
            transactionType,
            paymentStatus: 'paid'
        }
        updatePaymentOrder({ orderId: order?._id, productId: product?._id, data: data })
        setConfirmModal(false)
    }


    const handleConfirmModalOpen = () => {
        setShowModal(false)
        setConfirmModal(true)
    }

    return (
        <div>
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

                    <CTable align="middle" className="mb-0 border mt-5" bordered hover responsive>
                        <CTableHead color="light">
                            <CTableRow className="text-start">
                                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Order Id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Order Item</CTableHeaderCell>
                                <CTableHeaderCell scope="col"> Seller SKU</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Unit Price</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Operational Status</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                {/* <OrderFilterModal /> */}
                                <CTableDataCell>{new Date(createdAt).toLocaleDateString()}</CTableDataCell>
                                <CTableDataCell>{order?.orderId}</CTableDataCell>
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
                            </CTableRow>
                        </CTableBody>
                    </CTable>

                    <div className="d-flex mt-5 gap-5">
                        <div className="w-50">
                            <label htmlFor="" style={{ display: 'block' }}>Transaction Number</label>
                            <input type="text" onChange={(e) => setTransactionNumber(e.target.value)} className="w-100 mt-2 p-2 border-1 border-dark rounded" placeholder="Transaction Number" style={{ outline: 'none' }} />
                        </div>
                        <div className="w-50">
                            <label htmlFor="" style={{ display: 'block' }}>Transaction Type</label>
                            <input type="text" onChange={(e) => setTransactionType(e.target.value)} className="w-100 mt-2 p-2 border-1 border-dark rounded" placeholder="Transaction Type" style={{ outline: 'none' }} />
                        </div>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </CButton>
                    <CButton onClick={handleConfirmModalOpen} color="primary">
                        Payment
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal
                visible={confirmModal}
                onClose={() => {
                    setConfirmModal(false);
                }}
                className="h-100"
            >
                <CModalBody>
                    <CCol xs={12}>
                        <CCard className="">
                            <CCardHeader className="d-flex align-items-center justify-content-between">
                                <strong className="d-flex align-items-center gap-2">
                                    {" "}
                                    <CIcon icon={cilUser} className="nav-icon" />
                                    Payment Details
                                </strong>
                            </CCardHeader>
                            <CCardBody className="py-1 px-0">
                                <CListGroup flush>
                                    <CListGroupItem className="d-flex align-items-center">
                                        <div

                                            className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                        >
                                            Transaction Number:
                                        </div>
                                        {transactionNumber}
                                    </CListGroupItem>


                                    <CListGroupItem className="d-flex align-items-center">
                                        <div

                                            className=" d-flex justify-content-center align-items-center  me-1 rounded-small"
                                        >
                                            Transaction Type:
                                        </div>
                                        {transactionType}
                                    </CListGroupItem>


                                </CListGroup>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setConfirmModal(false)}>
                        Cancel
                    </CButton>
                    <CButton onClick={handelPayment} color="primary">
                        {
                            isLoading ? 'Loading..' : 'Save Payment'
                        }
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default memo(PaymentModalInfo);
