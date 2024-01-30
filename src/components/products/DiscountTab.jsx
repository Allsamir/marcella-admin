import { CCol, CFormInput, CRow } from "@coreui/react";
import { Button } from "react-bootstrap";

const DiscountTab = ({ register, errors, setActiveTab }) => {
  const handlePrev = () => {
    setActiveTab(1);
  };
  const handleNext = () => {
    setActiveTab(3);
  };
  return (
    <CRow className="g-3">
      <CCol xs={12}>
        <label className="mb-2">
          Price <span className="text-danger">*</span>
        </label>
        <CFormInput
          type="Number"
          id="priceInputField"
          placeholder="Enter Price"
          aria-describedby="priceInputField"
          min={"0"}
          {...register("price", {
            required: { value: true, message: "Price  is required" },
          })}
        />
        {errors.price?.type === "required" && <p className="text-danger">{errors.price.message}</p>}
      </CCol>
      <CCol xs={12}>
        <label className="mb-2">Offer Price</label>
        <CFormInput
          type="Number"
          id="priceInputField"
          placeholder="Enter Price"
          aria-describedby="priceInputField"
          min={"0"}
          {...register("offerPrice", {})}
        />
        {errors.price?.type === "required" && <p className="text-danger">{errors.price.message}</p>}
      </CCol>
      <CCol xs={12}>
        <label className="mb-2">
          Quantity <span className="text-danger">*</span>
        </label>
        <CFormInput
          type="number"
          id="quantityInputField"
          placeholder="Enter quantity"
          aria-describedby="quantityInputField"
          min={"1"}
          {...register("quantity", {
            required: { value: true, message: "Quantity is required" },
            min: { value: 1, message: "Quantity must be greater than 1" },
          })}
        />
        {errors.quantity?.type === "required" && (
          <p className="text-danger">{errors.quantity.message}</p>
        )}
        {errors.quantity?.type === "min" && (
          <p className="text-danger">{errors.quantity.message}</p>
        )}
      </CCol>

      {/* <CCol xs={12}>
        <CFormInput
          type="Number"
          id="discountInputField"
          label="Discount by Percentage (if offer price not provided)"
          placeholder="Enter Discount"
          aria-describedby="discountInputField"
          min={"0"}
          max={"100"}
          {...register("discountPercentage")}
        />
      </CCol> */}

      <div className="d-flex justify-content-end gap-2">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </CRow>
  );
};

export default DiscountTab;
