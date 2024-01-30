import { CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getDefaultData, getModifiedCategories } from "./data";
import { useGetAllColorQuery, useGetAllSizeQuery } from "src/redux/variants/variantsApi";
import { Button } from "react-bootstrap";

const DataTab = ({ register, errors, control, color, size, setActiveTab }) => {
  const { data: allColors } = useGetAllColorQuery();
  const { data: allSizes } = useGetAllSizeQuery();

  // color options
  const colorOptions = getModifiedCategories(allColors?.data);
  // size options
  const sizeOptions = getModifiedCategories(allSizes?.data);

  const handlePrev = () => {
    setActiveTab(0);
  };
  const handleNext = () => {
    setActiveTab(2);
  };
  return (
    <CRow className="g-3">
      <CCol xs={12}>
        <label className="mb-2">Model</label>
        <CFormInput
          type="text"
          id="modelInputField"
          placeholder="Enter Model"
          cd
          aria-describedby="modelInputField"
          {...register("model")}
        />
        {/* {errors.model?.type === "required" && <p className="text-danger">{"Model is required"}</p>} */}
      </CCol>

      <CCol xs={12}>
        <CFormLabel>Expire Date</CFormLabel>
        <CFormInput
          type="text"
          id="expireDate"
          placeholder="Enter Expire Date"
          aria-describedby="expireDate"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          // defaultValue={data ? new Date(data?.expireDate).toISOString().split("T")[0] : null}
          {...register("expireDate")}
        />
      </CCol>
      <CCol xs={12}>
        <label className="w-100">Size</label>
        <Controller
          control={control}
          name={"size"}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              className="mt-2"
              defaultValue={getDefaultData(size)}
              inputRef={ref}
              options={sizeOptions}
              value={sizeOptions?.find((option) => option.value === value)}
              onChange={(val) => onChange(val?.map((opt) => opt.value))}
              isMulti
            />
          )}
        />
      </CCol>
      <CCol xs={12}>
        <label className="w-100">Color</label>
        <Controller
          control={control}
          name={"color"}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              className="mt-2"
              defaultValue={getDefaultData(color)}
              inputRef={ref}
              options={colorOptions}
              value={colorOptions?.find((option) => option.value === value)}
              onChange={(val) => onChange(val?.map((opt) => opt.value))}
              isMulti
            />
          )}
        />
      </CCol>

      <div className="d-flex justify-content-end gap-2">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </CRow>
  );
};

export default DataTab;
