/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { cilHistory, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { useUpdateSingleOrderByIdMutation } from "src/redux/order/orderApi";
import CancelButton from "src/ui/button/CancelButton";
import { getModels } from "src/utils/getReactQuilModel";

const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "shipped" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
  { value: "delivered", label: "Delivered" },
  { value: "expired", label: "Expired" },
];

const OrderHistory = ({ orderData }) => {
  const [selectedValue, setSelectedValue] = useState();
  const modules = getModels();
  const [emailBody, setEmailBody] = useState("");

  const [
    updateSingleOrderById,
    { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateSingleOrderByIdMutation();

  useEffect(() => {
    setSelectedValue(orderData?.status);
  }, [orderData]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAddOrderHistory = (data) => {
    // if data.notify true then call a function which are send a mail from backend
    if (data.notify) {
      if (emailBody.length <= 20) {
        toast.warning("Comment box isn't empty or less than 20 character for mail send");
      } else {
        const id = orderData._id;
        const status = {
          status: selectedValue,
          html: emailBody,
          name: orderData.user?.name,
          to: orderData.user?.email,
          notify: true,
        };
        updateSingleOrderById({ id, data: status });
      }
    } else {
      const id = orderData._id;
      const status = { status: selectedValue, notify: false };
      updateSingleOrderById({ id, data: status });
    }
  };

  useEffect(() => {
    updateSuccess && toast.success("Order status updated successfully");
    updateError && toast.error("Order status updated failed");
  }, [updateSuccess, updateError]);
  return (
    <CRow className="my-4">
      <CCol className="p-0" md={12}>
        <CCard>
          <CCardHeader>
            <CIcon icon={cilHistory} className="nav-icon me-2" />
            <strong>Order History</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Date Added</CTableHeaderCell>
                  {/* <CTableHeaderCell>Comment</CTableHeaderCell> */}
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Customer Notified</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>
                    {new Date(orderData?.address?.createdAt).toLocaleDateString()}
                  </CTableDataCell>
                  {/* <CTableDataCell></CTableDataCell> */}
                  <CTableDataCell>{orderData?.status}</CTableDataCell>
                  <CTableDataCell>{orderData?.notify ? "yes" : "No"}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            <div className="mt-5">
              <h2 className="h6 pb-2 border-bottom">
                <strong>Add Order History</strong>
              </h2>

              <CForm onSubmit={handleSubmit(handleAddOrderHistory)}>
                <CRow className="g-3">
                  <CCol md={12}>
                    <CFormSelect
                      label="Order Status"
                      style={{ backgroundColor: "#f9f9f9" }}
                      aria-label="Order Status"
                      className="form-control"
                      options={orderStatusOptions}
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      // {...register("orderStatus", { required: true })}
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
                  <CCol md={12}>
                    <CFormCheck
                      id="flexCheckChecked"
                      label="Notify Customer"
                      {...register("notify")}
                    />
                  </CCol>
                </CRow>

                <div className="text-end">
                  <CancelButton />
                  <CButton
                    type="submit"
                    onSubmit={"handleSaveUpdateOrder"}
                    color="success"
                    className="mt-3 text-white"
                  >
                    <CIcon icon={cilSave} className="me-2" />
                    {updateLoading ? "Loading..." : "Save"}
                  </CButton>
                </div>
              </CForm>
            </div>
          </CCardBody>
        </CCard>{" "}
      </CCol>
    </CRow>
  );
};

export default memo(OrderHistory);
