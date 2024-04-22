import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef } from 'react';
import { useGetSingleSellerByIdQuery } from 'src/redux/seller/sellerApi';
import './OrderDetails.scss'

const InvoiceQrCode = ({ orderData, componentRef }) => {
    const { address, createdAt, orderId } = orderData || {};
    const barcodeRef = useRef()

    const sellerId = orderData?.products?.map(item => item?.product?.sellerId)
    const { data: sellerAddress } = useGetSingleSellerByIdQuery(...sellerId)


    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, orderId, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 12,
                width: 3,
                height: 120
            });
        }
    }, [orderId]);


    return (
        <div ref={componentRef} className="container border border-black w-50 mt-10 bg-white">
            <div className="qr-header">
                <div className="" style={{ borderRight: '1px solid #000' }}>
                    <h1 className="uppercase text-primary text-3xl font-semibold text-center w-100">Veendeshi</h1>
                </div>
                <div className="qr-header-text" style={{ borderRight: '1px solid #000' }}>
                    <p>Order Id</p>
                    <p>{orderId}</p>
                </div>
                <div className='qr-header-text'>
                    <p>Date</p>
                    <p>{new Date(createdAt).toDateString()}</p>
                </div>
            </div>
            <div className="row flex justify-center items-center border-top border-bottom border-black">
                <svg ref={barcodeRef}></svg>
            </div>
            <div className="qr-container">
                <div className="qr-code">
                    <QRCode value={sellerAddress ? sellerAddress?.data?.address : 'Baridhara DOHS, Dhaka. Dhaka-1206, Bangladesh.'} />
                </div>
                <div className="qr-add-cont">
                    <div className='qr-add'>
                        <p>Recipient: {address?.shippingName}</p>
                        <p>{address?.address}</p>
                        <p>{address?.shippingPhone}</p>
                    </div>
                    {
                        sellerAddress ?
                            <div className='qr-add'>
                                <p>Seller: {sellerAddress?.data?.name}</p>
                                <p>{sellerAddress?.data?.address}</p>
                            </div>
                            :
                            <div className='qr-add'>
                                <p>Veendeshi</p>
                                <p>Baridhara DOHS, Dhaka. Dhaka-1206, Bangladesh.</p>
                                <p>Phone: +88 01894-961361</p>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default InvoiceQrCode;