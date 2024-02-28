/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Tab, Tabs } from "react-bootstrap";
import { useGetAllOrdersQuery } from "src/redux/order/orderApi";

import SearchFieldForm from "../../../ui/SearchFieldForm";
import CardHeaderButton from "src/ui/CardHeaderButton";
import { useLocation, useNavigate } from "react-router-dom";
import { setUrlParams } from "src/utils/setUrlParam";
import Loading from "src/ui/Loading";
import SingleTab from "./SingleTab";
import { useState } from "react";
import OrderFilterModal from "src/ui/orderFilterModal/OrderFilterModal";

const ManageOrders = () => {
  const location = useLocation();
  const { data: orders, isLoading, isFetching, isError } = useGetAllOrdersQuery(location?.search);
  const navigate = useNavigate();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const statusGroup = [
    "Pending",
    "Processing",
    "shipped",
    "Delivered",
    "Returned",
    "Cancelled",
    "Expired",
  ];

  let content = null;
  let loadingContent = null;
  if (isLoading) {
    loadingContent = <Loading />;
  }
  if (!isLoading && isError) {
    loadingContent = <p className="text-danger text-center">There was an error</p>;
  }

  if (!isLoading && !isError) {
    content = statusGroup?.map((c, index) => (
      <Tab key={index} eventKey={c} title={c}>
        <SingleTab
          getLoading={isFetching}
          getError={isError}
          allOrders={orders?.data}
          pages={orders?.totalPageNumber}
          c={c}
        />
      </Tab>
    ));
  }

  // Array of all order status props pass for searching table make
  const tableData = [
    { name: "Order Id", register: "orderId", type: "text" },
    { name: "Phone Number", register: "shippingPhone", type: "text" },
    { name: "Customer Name", register: "name", type: "text" },
    { name: "Price", register: "price", type: "text" },
    { name: "Payment Method", register: "method", type: "text" },
    { name: "Date Added", register: "dateAdded", type: "date" },
  ];

  const handleSearch = (data) => {
    let query = "";

    if (data.name) query += `name=${data.name}`;
    if (data.orderId) query += `&orderId=${data.orderId}`;
    if (data.shippingPhone) query += `&shippingPhone=${data.shippingPhone}`;
    if (data.method) query += `&method=${data.method}`;
    if (data.price) query += `&price=${data.price}`;
    if (data.dateAdded) query += `&date=${data.dateAdded}`;

    setFilterQuery(query);
    setShowFilterModal(true);
  };

  const handleTabSelect = (tab) => {
    const url = setUrlParams("?", "page", 1);
    // navigate(setUrlParams(url, "status", tab));
    navigate(`?page=1&status=${tab}`);
  };

  return (
    <>
      <CRow>
        <OrderFilterModal
          query={filterQuery}
          showModal={showFilterModal}
          setShowModal={setShowFilterModal}
        />

        <CCol xs={12}>
          <CCard className="mb-4">
            <CardHeaderButton title={"All Orders"} />

            {/* order search field start */}
            <SearchFieldForm onSubmit={handleSearch} tableData={tableData} isNavigate={false} />
            {/* order search field end */}

            <CCardBody>
              <p className="text-medium-emphasis small">Here is the list of all orders.</p>
              {loadingContent ? (
                loadingContent
              ) : (
                <Tabs
                  defaultActiveKey={statusGroup?.[0]}
                  onSelect={(e) => handleTabSelect(e)}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {/* All orders here on content variable */}

                  {content}
                </Tabs>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ManageOrders;
