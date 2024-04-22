import { CFormSelect, CTableDataCell } from '@coreui/react';
import React from 'react';

const PrintMethod = ({ selectedValue, setSelectedValue }) => {
    
    const reportOptions = [
        { value: "", label: "Select One" },
        { value: "qr", label: "Print QR Code" },
        { value: "invoice", label: "Print Invoice" },
    ];


    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        console.log("Selected Value:", value);
    };

    return (
        <div>
            <CTableDataCell>
                <CFormSelect
                    aria-label="Order Status"
                    className={`form-control  `}
                    style={{ backgroundColor: "#f9f9f9" }}
                    options={reportOptions}
                    value={selectedValue}
                    onChange={handleSelectChange}
                />
            </CTableDataCell>
        </div>
    );
};

export default PrintMethod;
