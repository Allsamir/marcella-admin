import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CancelButton from "src/ui/button/CancelButton";

const AddProductTypeForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
console.log(props)
  return (
    <CForm onSubmit={handleSubmit(props.onSubmit)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="manufacturerNameInputField"
            label="Product Type"
            placeholder="Enter Product type"
            defaultValue={props?.data?.title}
            aria-describedby="manufacturerNameInputField"
            {...register("title", { required: props?.data ? false : true })}
          />
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

export default AddProductTypeForm;

AddProductTypeForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
