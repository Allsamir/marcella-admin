/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { cilSend } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { getModels } from "src/utils/getReactQuilModel";
import { useGetAllCustomerGroupQuery } from "src/redux/customerGroup/customerGroupApi";
import { useSendMailMutation } from "src/redux/mail/mailApi";
import { toast } from "react-toastify";

const Mail = () => {
  const [emailBody, setEmailBody] = useState("");
  const {
    data: allGroups,
    isLoading: groupLoading,
    isError: groupError,
  } = useGetAllCustomerGroupQuery();
  const [sendMail, { isLoading: mailLoading, isError: mailError, error, isSuccess: mailSuccess }] =
    useSendMailMutation();

  const toOptions = [
    {
      value: "all",
      label: "All-Customers",
    },
  ];
  allGroups?.forEach((group) => {
    const option = { value: group.groupName, label: group.groupName };
    return toOptions.push(option);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const mailData = { ...data, emailBody };

    sendMail(mailData);
  };

  const modules = getModels();

  useEffect(() => {
    toast.dismiss();
    if (mailError) {
      toast.error(error.data.message, { id: "error" });
    }
    if (mailSuccess) {
      toast.success("Mail send successfully", { id: "success" });
    }
  }, [mailError, mailSuccess]);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mail</strong>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CRow className="g-3">
                <CCol xs={12}>
                  <CFormInput
                    type="email"
                    id="emailInputField"
                    label="From"
                    placeholder="Email "
                    aria-describedby="emailInputField"
                    {...register("from", { required: true })}
                  />
                </CCol>
                <CCol xs={12}>
                  <CFormSelect
                    label="Customer types"
                    aria-label="Product Select Selection Field"
                    options={toOptions}
                    {...register("to", {
                      required: {
                        value: true,
                        message: "To is required",
                      },
                    })}
                  />
                </CCol>
                <CCol xs={12}>
                  <CFormInput
                    type="text"
                    id="textInputField"
                    label="Subject"
                    placeholder="Enter subject"
                    aria-describedby="textInputField"
                    {...register("subject", { required: true })}
                  />
                </CCol>
                <CCol xs={12}>
                  <label className="w-100">Body</label>
                  <ReactQuill
                    className="mt-2"
                    theme="snow"
                    placeholder="Enter your text here..."
                    modules={modules}
                    value={emailBody}
                    onChange={setEmailBody}
                  />
                </CCol>
              </CRow>
              <div className="text-end">
                <CButton
                  disabled={mailLoading}
                  type="submit"
                  color="info"
                  className="text-white mt-3"
                >
                  <CIcon icon={cilSend} className="me-2" />
                  {mailLoading ? "Loading..." : "Send Message"}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Mail;
