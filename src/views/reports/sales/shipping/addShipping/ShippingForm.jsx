import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  useAddSingleShippingMutation,
  useUpdateSingleShippingMutation,
} from "src/redux/shipping/shippingApi";
import CancelButton from "src/ui/button/CancelButton";
const upazilla = [
  {
    name: "Inside Dhaka City",
    id: 6,
  },
  {
    name: "Outside Dhaka",
    id: 7,
  },
  {
    name: "Free Shipping",
    id: 22,
  },
  {
    name: "Gazipur",
    id: 8,
  },
  {
    name: "Narayanganj",
    id: 9,
  },
  {
    name: "Dhamrai",
    id: 1,
  },
  {
    name: "Dohar",
    id: 2,
  },
  {
    name: "Keraniganj",
    id: 3,
  },
  {
    name: "Nawabganj",
    id: 4,
  },
  {
    name: "Savar",
    id: 5,
  },
  {
    name: "Gazipur Sadar-Joydebpur",
    id: 10,
  },
  {
    name: "Kaliakior",
    id: 11,
  },
  {
    name: "Kapasia",
    id: 12,
  },
  {
    name: "Sripur",
    id: 13,
  },
  {
    name: "Kaliganj",
    id: 14,
  },
  {
    name: "Tongi",
    id: 15,
  },
  {
    name: "Araihazar",
    id: 16,
  },
  {
    name: "Sonargaon",
    id: 17,
  },
  {
    name: "Bandar",
    id: 18,
  },
  {
    name: "Narayanganj Sadar",
    id: 19,
  },
  {
    name: "Rupganj",
    id: 20,
  },
  {
    name: "Siddirgonj",
    id: 21,
  },
];

const ShippingForm = ({ shippingData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [defaultData, setDefaultData] = useState();

  useEffect(() => {
    if (shippingData) {
      setDefaultData(
        shippingData?.upazila?.map((up) => {
          return {
            value: up,
            label: up,
          };
        })
      );
    }
  }, [shippingData]);

  const [updateSingleShipping, { isLoading, isError, isSuccess: udpateSuccess, error }] =
    useUpdateSingleShippingMutation();

  const [
    addSingleShipping,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError, error: addErrorMsg },
  ] = useAddSingleShippingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleUpdate = (data) => {
    if (id) {
      updateSingleShipping({ id, data });
    } else {
      if (data.price >= 0) {
        addSingleShipping(data);
      }
    }
  };

  const upazilaOptions = upazilla.map((up) => {
    return {
      value: up.name,
      label: up.name,
    };
  });

  useEffect(() => {
    toast.dismiss();
    isError && toast.error(error?.data?.message || "Failed updated shipping", { id: "uError" });
    addError &&
      toast.error(addErrorMsg?.data?.message || "Failed updated shipping", { id: "uError" });
  }, [addError, isError]);

  useEffect(() => {
    addSuccess && navigate(-1);
    udpateSuccess && navigate(-1);
  }, [addSuccess, udpateSuccess]);

  return (
    <CForm onSubmit={handleSubmit(handleUpdate)}>
      <CRow className="g-3">
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="titleInputField"
            label="Shipping Name"
            defaultValue={shippingData?.name}
            aria-describedby="titleInputField"
            placeholder="Name must be unique"
            {...register("name", {
              required: { value: id ? false : true, message: "Name is required" },
            })}
          />
          {errors?.name?.type === "required" && (
            <p className="text-danger">{errors.name.message}</p>
          )}
        </CCol>

        {id && defaultData && (
          <CCol xs={12}>
            <label className="w-100">Select area</label>
            <Controller
              control={control}
              name={"upazila"}
              rules={{
                required: id ? false : true,
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  className="mt-2"
                  defaultValue={defaultData}
                  inputRef={ref}
                  options={upazilaOptions}
                  value={upazilaOptions?.find((option) => option.value === value)}
                  onChange={(val) => onChange(val?.map((opt) => opt.value))}
                  isMulti
                />
              )}
            />
          </CCol>
        )}
        {!id && (
          <CCol xs={12}>
            <label className="w-100">Select area</label>
            <Controller
              control={control}
              name={"upazila"}
              rules={{
                required: id ? false : true,
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  className="mt-2"
                  defaultValue={defaultData}
                  inputRef={ref}
                  options={upazilaOptions}
                  value={upazilaOptions?.find((option) => option.value === value)}
                  onChange={(val) => onChange(val?.map((opt) => opt.value))}
                  isMulti
                />
              )}
            />
          </CCol>
        )}
        <CCol xs={12}>
          <CFormInput
            type="text"
            id="titleInputField"
            label="Enter price"
            defaultValue={shippingData?.price}
            aria-describedby="titleInputField"
            placeholder="Enter price must be positive"
            {...register("price", {
              required: { value: id ? false : true, message: "Price is required" },
              min: { value: 0 },
            })}
          />
          {errors.price?.type === "required" && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </CCol>
      </CRow>
      {addErrorMsg && (
        <p className="text-white bg-danger text-center mt-2 p-2 rounded">
          {addErrorMsg?.data?.message}
        </p>
      )}
      <div className="text-end">
        <CancelButton />
        <CButton type="submit" color="success" className="mt-3 text-white">
          {isLoading || addLoading ? (
            "Loading"
          ) : (
            <>
              <CIcon icon={cilSave} className="me-2" />
              {id ? "Update" : "Save"}
            </>
          )}
        </CButton>
      </div>
    </CForm>
  );
};

export default ShippingForm;
