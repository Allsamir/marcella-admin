import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddManufacturerForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  return (
    <CForm onSubmit={handleSubmit(props.onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="manufacturerNameInputField"
            label="Name"
            placeholder="Enter Manufacturer Name"
            defaultValue={props?.data?.name}
            aria-describedby="manufacturerNameInputField"
            {...register("name", { required: props?.data ? false : true })}
          />
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="manufacturerDescriptionTextareaField"
            label="Description"
            placeholder="Enter Description"
            defaultValue={props?.data?.description}
            aria-describedby="manufacturerDescriptionTextareaField"
            rows="3"
            text="Manufacturer description must be within 1000 words."
            {...register("description", { required: props?.data ? false : true })}
          ></CFormTextarea>
        </CCol>
      </CRow>
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="primary" className="mt-3">
          <CIcon icon={cilPlus} className="me-2" />
          {props?.isLoading ? "Loading.." : "Save"}
        </CButton>
      </div>
    </CForm>
  );
};

export default AddManufacturerForm;

AddManufacturerForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
