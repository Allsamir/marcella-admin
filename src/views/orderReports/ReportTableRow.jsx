import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormSelect,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteSingleReportMutation,
  useUpdateSingleReportMutation,
} from "src/redux/report/orderReportApi";
import DeleteModal from "src/ui/DeleteModal";
import UserInfoModal from "src/ui/UserInfoModal";
import EyeButton from "src/ui/button/EyeButton";
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const reportOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const ReportTableRow = ({ report, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [showUserInfoModal, setShowUsrInfoModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const [deleteSingleReport, { isLoading, isError, isSuccess }] = useDeleteSingleReportMutation();
  const [updateSingleReport, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateSingleReportMutation();

  useEffect(() => {
    isSuccess && toast.success("Delete report Success");
    isError && toast.error("Delete report Failed");
    updateSuccess && toast.success("Report Updated Success");
  }, [isSuccess, isError, updateSuccess]);

  useEffect(() => {
    setSelectedValue(report?.status);
  }, [report]);

  const handleUpdate = (value, id) => {
    setSelectedValue(value);
    const data = { status: value };

    updateSingleReport({ id, data });
  };
  const handleViewOrder = (orderId) => {
    setShowFilterModal(true);
    setFilterQuery(`orderId=${orderId}`);
  };
  return (
    <CTableRow key={report?._id}>
      <OrderFilterModal
        query={filterQuery}
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
      />
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{report?.orderId}</CTableDataCell>
      <CTableDataCell>{report?.reason}</CTableDataCell>
      <CTableDataCell>Order {report?.requestedFor}</CTableDataCell>
      <CTableDataCell>
        <CFormSelect
          aria-label="Order Status"
          className={`form-control  ${report?.status === "rejected" && "text-danger"} ${
            report?.status === "accepted" && "text-success"
          }`}
          style={{ backgroundColor: "#f9f9f9" }}
          options={reportOptions}
          value={selectedValue}
          onChange={(e) => handleUpdate(e.target.value, report?._id)}
          // {...register("orderStatus", { required: true })}
        />
      </CTableDataCell>
      <CTableDataCell>{new Date(report?.createdAt).toLocaleDateString()}</CTableDataCell>
      <CTableDataCell>{report?.description}</CTableDataCell>
      <CTableDataCell>
        <CTooltip content="View">
          <CButton
            onClick={() => handleViewOrder(report?.orderId)}
            className="mb-1  ms-2"
            style={{ height: "30px", width: "32px", position: "relative" }}
            color="info"
            variant="outline"
          >
            <BsEye style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </CTooltip>
        <CTooltip content="Delete">
          <CButton
            color="danger"
            variant="outline"
            style={{ height: "30px", width: "32px", position: "relative" }}
            className="ms-2"
            onClick={() => setShowModal(true)}
          >
            <CIcon icon={cilTrash} style={{ position: "absolute", top: "25%", left: "25%" }} />
          </CButton>
        </CTooltip>
      </CTableDataCell>
      <DeleteModal
        deleteThis={deleteSingleReport}
        showModal={showModal}
        setShowModal={setShowModal}
        id={report?._id}
        deleteLoading={isLoading}
      />
      <UserInfoModal
        showModal={showUserInfoModal}
        setShowModal={setShowUsrInfoModal}
        user={report?.user}
      />
    </CTableRow>
  );
};

export default ReportTableRow;
