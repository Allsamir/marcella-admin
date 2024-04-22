import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const InvoiceQrCode = ({ orderData, componentRef }) => {
    const { address, createdAt, orderId } = orderData || {};
    const barcodeRef = useRef()


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
        <div ref={componentRef}>
            <Container className="border border-black w-50 mt-10 bg-white">
                <Row className="grid grid-cols-3">
                    <Col className="p-1" style={{ borderRight: '1px solid #000' }}>
                        <h1 className="uppercase text-primary text-3xl font-semibold text-center w-100">Veendeshi</h1>
                    </Col>
                    <Col className="p-1" style={{ borderRight: '1px solid #000' }}>
                        <p className="text-xs text-center text-black">Order Id</p>
                        <p className="text-center text-xs">{orderId}</p>
                    </Col>
                    <Col className="p-1">
                        <p className="text-xs text-center">Date</p>
                        <p className="text-center text-xs">{new Date(createdAt).toDateString()}</p>
                    </Col>
                </Row>
                <Row className="flex justify-center items-center border-top border-bottom border-black">
                    <svg ref={barcodeRef}></svg>
                </Row>
                <Row className="flex items-center justify-center py-5">
                    <Col className="flex items-center justify-center">
                        <QRCode value={address?.address} />
                    </Col>
                    <Col style={{ borderLeft: '1px solid #000' }}>
                        <div className='border-bottom border-black pl-3 py-3'>
                            <p className="text-black text-xs">Recipient: {address?.shippingName}</p>
                            <p className="text-black text-xs">{address?.address}</p>
                            <p className="text-black text-xs">{address?.shippingPhone}</p>
                        </div>
                        <p className="text-black text-xs pl-3 py-3">Seller: {address?.address}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default InvoiceQrCode;