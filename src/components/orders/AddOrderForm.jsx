import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormSelect, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";

const orderStatusOptions = [
  "Open this select menu",
  { label: "Pending", value: "1" },
  { label: "Processing", value: "2" },
  { label: "shipped", value: "3" },
  { label: "Delivered", value: "4" },
  { label: "Cancelled", value: "5" },
  { label: "Returned", value: "6" },
];

const AddOrderForm = (props) => {
  const [isSearchable, setIsSearchable] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  return (
    <CForm onSubmit={handleSubmit(props.onSubmit)}>
      <Tabs defaultActiveKey="customer-details" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="customer-details" title="Customer Details">
          <CRow className="g-3">
            <label htmlFor="">First Name</label>
            <CCol xs={12}>
              <CFormInput {...register("firstName", { required: true })} />
            </CCol>

            <label htmlFor="">Last Name</label>
            <CCol xs={12}>
              <CFormInput {...register("lastName", { required: true })} />
            </CCol>

            <label htmlFor="">Email</label>
            <CCol xs={12}>
              <CFormInput {...register("email", { required: true })} />
            </CCol>

            <label htmlFor="">Phone</label>
            <CCol xs={12}>
              <CFormInput {...register("mobile", { required: true })} />
            </CCol>
          </CRow>
        </Tab>
        <Tab eventKey="products" title="Products">
          <CRow className="g-3">
            <label htmlFor="">Products</label>
            <CCol xs={12}>
              <CFormSelect
                aria-label="Default select example"
                options={orderStatusOptions}
                {...register("orderStatus", { required: true })}
              />
            </CCol>

            <label htmlFor="">Price</label>
            <CCol xs={12}>
              <CFormInput {...register("price", { required: true })} />
            </CCol>

            <label htmlFor="">Shipping Charge</label>
            <CCol xs={12}>
              <CFormInput {...register("shipping", { required: true })} />
            </CCol>
            <CCol xs={12}>
              <label htmlFor="">Shipping Method</label>
              <CFormSelect
                options={[
                  { label: "COD", value: "Cash-On-Delivery" },
                  { label: "SSLCOMMERZ", value: "SSLCOMMERZ" },
                ]}
                {...register("paymentMethod", { required: true })}
              />
            </CCol>
          </CRow>
        </Tab>
        <Tab eventKey="shipping" title="Shipping Details">
          <CRow className="g-3">
            <label htmlFor="">Country</label>
            <CCol xs={12}>
              <CFormInput
                defaultValue={"Bangladesh"}
                disabled
                {...register("country", { required: true })}
              />
            </CCol>

            <label htmlFor="">Address</label>
            <CCol xs={12}>
              <CFormInput {...register("address", { required: true })} />
            </CCol>

            <label htmlFor="">District</label>
            <CCol xs={12}>
              <CFormInput {...register("district", { required: true })} />
            </CCol>

            <label htmlFor="">City</label>
            <CCol xs={12}>
              <CFormInput {...register("city", { required: true })} />
            </CCol>

            <label htmlFor="">Post Code</label>
            <CCol xs={12}>
              <CFormInput {...register("postcode", { required: true })} />
            </CCol>
          </CRow>
        </Tab>
      </Tabs>
      <div className="text-end">
        <CButton type="submit" color="primary" className="mt-3">
          <CIcon icon={cilPlus} className="me-2" />
          Save
        </CButton>
      </div>
    </CForm>
  );
};

export default AddOrderForm;

AddOrderForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
