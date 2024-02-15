import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useGetAllTypesQuery } from "src/redux/flashSaleType/flashSaleTypeApi";
import CancelButton from "src/ui/button/CancelButton";
import { defaultTypesValue } from "src/utils/defaultOfferTypeValue";

const FlashSaleOfferForm = ({
  onSubmit,
  loading,
  data,
  startDate,
  setStartDate,
  endDate,
  color,
  setColor,
  setEndDate,
}) => {
  const { id } = useParams();
  const { handleSubmit, control, register, errors, setValue } = useForm();
  const { data: allTypes, isLoading: typeLoading, isError: typeError } = useGetAllTypesQuery();

  const typesOptions = allTypes?.data?.map((type) => {
    return { value: type?.name, label: type?.name };
  });

  useEffect(() => {
    if (data) {
      for (const key in data) {
        setValue(key, data[key]);
      }
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    }
  }, [data, setValue]);


  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };
  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CCol xs={12}>
        <label className="w-100">Offer name</label>
        <CFormInput
          type="text"
          id="titleInputField"
          placeholder="Enter types name"
          aria-describedby="titleInputField"
          {...register("name", { required: true })}
        />

        {errors?.name?.type === "required" && <p className="text-danger">{"Name is required"}</p>}
      </CCol>

      <CCol xs={12}>
        <label className="mb-0">Select types for make offer</label>
        <Controller
          control={control}
          name={"offerType"}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              className="mt-2"
              defaultValue={defaultTypesValue(data?.offerType)}
              inputRef={ref}
              options={typesOptions}
              value={typesOptions?.find((option) => option?.value === value)}
              onChange={(val) => onChange(val?.map((opt) => opt?.value))}
              isMulti
            />
          )}
        />

        {errors?.offerType?.type === "required" && (
          <p className="text-danger">{"OfferType is required"}</p>
        )}
      </CCol>
      <CRow>
        <CCol xs={6}>
          <label className="text-primary">Start Date</label>
          {data && (
            <label htmlFor="" className=" d-flex justify-content-between mb-1">
              <span>{new Date(startDate).toLocaleDateString()}</span>
              <span>{new Date(startDate).toLocaleTimeString()}</span>
            </label>
          )}

          <CFormInput
            placeholder="Enter Start Date"
            aria-describedby="startDate"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required={data ? false : true}
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
          />
          {errors?.startDate?.type === "required" && (
            <p className="text-danger">{"Start date is required"}</p>
          )}
        </CCol>

        <CCol xs={6}>
          <label className="text-primary">End Date</label>
          {data && (
            <label htmlFor="" className=" d-flex justify-content-between mb-1">
              <span>{new Date(endDate).toLocaleDateString()}</span>
              <span>{new Date(endDate).toLocaleTimeString()}</span>
            </label>
          )}

          <CFormInput
            placeholder="Enter End Date"
            aria-describedby="endDate"
            defaultValue={endDate}
            required={data ? false : true}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
          />
          {errors?.endDate?.type === "required" && (
            <p className="text-danger">{"End date is required"}</p>
          )}
        </CCol>
        <CCol className="mt-2" xs={12}>
          <label className="mb-2">
            Background Color <span className="text-danger">*</span>
          </label>
          <SketchPicker
            width="350px"
            color={color}
            onChangeComplete={handleChangeComplete}

          />
          <p className="mt-2" style={{ color: `${color}` }}>
            Selected color: {color}
          </p>
        </CCol>

      </CRow>

      <div className="text-end  ">
        <CancelButton />
        <CButton type="submit" color="success" className="mt-3 text-white">
          <CIcon icon={cilSave} className="me-2" />
          {loading ? "Loading..." : id ? "Update" : "Save"}
        </CButton>
      </div>
    </CForm>
  );
};

export default FlashSaleOfferForm;
