import { useState } from 'react';
import { CForm, CFormInput, CFormTextarea, CButton, CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React from 'react';
import CancelButton from 'src/ui/button/CancelButton';

const HeaderCode = () => {
    const [title, setTitle] = useState('');
    const [headerCode, setHeaderCode] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleHeaderCodeChange = (event) => {
        setHeaderCode(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', title, headerCode);
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>{'id' ? "Edit" : "Add"} Header Code</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={handleSubmit}>
                            <CFormInput
                                type="text"
                                id="title"
                                label="Title"
                                placeholder="Google Analytics"
                                aria-describedby="title"
                                style={{ marginBottom: '20px' }}
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <CFormTextarea
                                id="header"
                                label="Header Code"
                                rows={5}
                                value={headerCode}
                                onChange={handleHeaderCodeChange}
                                text="Added <script></script> File"
                            ></CFormTextarea>
                            <CancelButton />
                            <CButton type="submit" color="primary" className="mt-3">
                                Submit
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default HeaderCode;

