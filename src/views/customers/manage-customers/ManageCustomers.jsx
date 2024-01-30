/* eslint-disable prettier/prettier */
import { cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCustomerGroupQuery } from "src/redux/customerGroup/customerGroupApi";
import { useGetAllUsersQuery } from "src/redux/users/usersApi";
import CardHeaderButton from "src/ui/CardHeaderButton";
import Loading from "src/ui/Loading";
import PaginationButton from "src/ui/pagination/Pagination";
import SearchFieldForm from "src/ui/SearchFieldForm";
import { setUrlParams } from "src/utils/setUrlParam";
import ManageCustomerTableRowData from "./TableRowData";

const ManageCustomers = () => {
  const location = useLocation();
  const { data: customers, isLoading, isFetching, isError } = useGetAllUsersQuery(location.search);
  const navigate = useNavigate();
  const { data: customersGroup } = useGetAllCustomerGroupQuery();

  let content = null;
  let loadingContent = null;
  if (isLoading) {
    loadingContent = <Loading />;
  }
  if (!isLoading && isError) {
    loadingContent = <p className="text-danger">Something was wrong!</p>;
  }
  if (!isLoading && !isError && customers?.result?.data?.length === 0) {
    content = <p className="text-danger">No user here</p>;
  }
  if (!isLoading && !isError) {
    content = customersGroup?.map((group, index) => (
      <Tab key={index} eventKey={group?.groupName} title={group?.groupName}>
        <CTable align="middle" className="mb-0 border" bordered hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-start">
              <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                Sl. No.
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">User</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer Group</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {customers?.result?.data?.length > 0 ? (
            customers?.result?.data
              ?.filter((ord) => {
                return ord?.groupName?.toLowerCase() === group?.groupName?.toLowerCase();
              })
              ?.map((customer, index) => (
                <CTableBody key={index}>
                  <ManageCustomerTableRowData
                    customersGroup={customersGroup}
                    index={index}
                    groupNameValue={group?.groupName}
                    customer={customer}
                  />
                </CTableBody>
              ))
          ) : (
            <CTableDataCell className="text-center py-4 fw-bold text-warning" colSpan={"100%"}>
              No data found
            </CTableDataCell>
          )}
        </CTable>
        <PaginationButton
          searchUrl={location.search}
          totalPageNumber={customers?.result?.totalPageNumber}
        />
      </Tab>
    ));
  }
  const tableData = [
    { name: "Customer Name", register: "name", type: "text" },
    { name: "Email", register: "email", type: "email" },
    { name: "Date added", register: "dateAdded", type: "date" },
    { name: "Customer Group", register: "group", type: "text" },
    { name: "Customer Phone", register: "phone", type: "number" },
  ];

  const handleSearch = (data) => {
    let query = "";
    if (data.name) query += `name=${data.name}`;
    if (data.group) query += `&group=${data.group}`;
    if (data.email) query += `&email=${data.email}`;
    if (data.dateAdded) query += `&date=${data.dateAdded}`;
    if (data.phone) query += `&phone=${data.phone}`;

    if (location.search.includes("status")) {
      query = location.search + `&${query}`;
    } else {
      query = `?${query}`;
    }

    navigate(query);
  };

  const handleTabSelect = (tabName) => {
    const url = setUrlParams("?", "page", 1);
    navigate(setUrlParams(url, "status", tabName));
  };
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* Header start*/}
            <CardHeaderButton title={"All Customers"} />
            {/* Header start*/}

            {/* search field start*/}
            <SearchFieldForm onSubmit={handleSearch} tableData={tableData} isNavigate={true} />
            {/* search field end*/}

            {/* Card main body*/}
            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all customers.</p>
              {loadingContent ? (
                loadingContent
              ) : (
                <Tabs
                  defaultActiveKey={customersGroup?.[0]?.groupName}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={(e) => handleTabSelect(e)}
                >
                  {content}
                </Tabs>
              )}
            </CCardBody>
            {/* Card main end*/}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ManageCustomers;
