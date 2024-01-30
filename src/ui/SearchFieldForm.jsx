/* eslint-disable react/prop-types */
import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../src/scss/style.scss";

// eslint-disable-next-line prettier/prettier, react/prop-types
const SearchFieldForm = ({ onSubmit, tableData, isNavigate }) => {
  const navigate = useNavigate();
  const copiedTableData = [...tableData];
  const { register, handleSubmit, reset } = useForm();

  const handleClear = () => {
    isNavigate && navigate(".");
    reset();
  };
  return (
    <div className="mx-3 px-3 mt-3 pb-3 border rounded" style={{ backgroundColor: "#f5f5f5" }}>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CRow>
          {copiedTableData.map((data, index) => (
            <CCol xs={4} key={index} className="mt-3">
              <CFormInput
                type={data.type}
                id="exampleFormControlInput1"
                label={data.name}
                placeholder={data.name}
                disabled={data.disabled}
                aria-describedby="exampleFormControlInputHelpInline"
                {...register(data.register)}
              />
            </CCol>
          ))}
        </CRow>
        <div className="d-flex align-items-center justify-content-end mt-3 ">
          <CButton className="me-2 text-white" color="info" onClick={() => handleClear()}>
            Clear
          </CButton>
          <CButton color="info" className=" text-white me-2" type="submit">
            <CIcon icon={cilSearch} style={{ width: "12px", height: "12px" }} /> Filter
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default SearchFieldForm;
