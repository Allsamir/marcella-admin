/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CFormSelect, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAssignUserGroupMutation, useDeleteSingleUserMutation } from "src/redux/users/usersApi";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import EyeButton from "src/ui/button/EyeButton";
import DeleteModal from "src/ui/DeleteModal";
import UserInfoModal from "src/ui/UserInfoModal";
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const TableRowData = ({ customer, index, customersGroup, groupNameValue }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(groupNameValue);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  // assign user to another group hook
  const [assignUserGroup, { isLoading, isError, isSuccess }] = useAssignUserGroupMutation();

  // delete single user hook
  const [
    deleteSingleUser,
    { isLoading: deleteLoading, isSuccess: customerDeleteSuccess, isError: customerDeleteError },
  ] = useDeleteSingleUserMutation();

  // handle delete user function
  const handleDeleteCustomer = (id) => {
    deleteSingleUser(id);
  };

  // customer group options
  const customerGroupOptions = customersGroup?.map((c) => {
    return { value: c.groupName, label: c.groupName };
  });

  // handle update user group options
  const handleUpdate = (e, email) => {
    const data = {
      email: email,
      groupName: e.target.value,
    };

    // assignUserGroup
    assignUserGroup(data);
  };

  // error or success message
  useEffect(() => {
    toast.dismiss();
    customerDeleteSuccess && toast.success("Delete Success", { id: "dSuccess" });
    customerDeleteError && toast.error("Failed to Delete", { id: "dError" });
  }, [customerDeleteSuccess, customerDeleteError]);
  const handleViewDetails = (email) => {
    const query = `email=${email}`;
    setFilterQuery(query);
    setShowFilterModal(true);
  };

  return (
    <>
      <CTableRow>
        {/* filter modal */}
        <OrderFilterModal
          query={filterQuery}
          showModal={showFilterModal}
          setShowModal={setShowFilterModal}
          showUserInfo={true}
        />
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell>
          <Image
            src={customer?.photoUrl}
            roundedCircle
            style={{ width: "35px", height: "100%", objectFit: "cover" }}
          />
        </CTableDataCell>
        <CTableDataCell>
          <span
            onClick={() => setShowUserInfoModal(true)}
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
          >
            {customer?.name}
          </span>
          <br />
          <small className="text-info">
            {customer?.groupName} | Register: {new Date(customer?.createdAt).toLocaleDateString()}
          </small>
        </CTableDataCell>
        <CTableDataCell>{customer?.email}</CTableDataCell>
        <CTableDataCell>{customer?.phone || "Google"}</CTableDataCell>

        <CTableDataCell>
          <CFormSelect
            style={{ width: "150px" }}
            aria-label="Product Select Selection Field"
            options={customerGroupOptions}
            value={selectedStatus}
            onChange={(e) => {
              // setSelectedStatus(e.target.value);
              handleUpdate(e, customer?.email);
              // eslint-disable-next-line prettier/prettier
            }}
          />
        </CTableDataCell>
        <CTableDataCell>
          <div className="">
            <EyeButton handleClick={() => handleViewDetails(customer?.email)} />
            <Link to={`/customer/edit/${customer?._id}`}>
              <EditButton />
            </Link>
            <DeleteButton setShowModal={setShowModal} />
          </div>
        </CTableDataCell>
      </CTableRow>

      {/* delete modal */}
      <DeleteModal
        deleteThis={handleDeleteCustomer}
        showModal={showModal}
        setShowModal={setShowModal}
        id={customer._id}
        deleteLoading={deleteLoading}
      />

      {/* user info modal */}
      <UserInfoModal
        showModal={showUserInfoModal}
        setShowModal={setShowUserInfoModal}
        user={customer}
      />
    </>
  );
};

export default TableRowData;
