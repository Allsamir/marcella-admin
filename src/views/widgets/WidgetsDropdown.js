import { cilArrowBottom, cilOptions } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CWidgetStatsA,
} from "@coreui/react";
import { useGetTotalOrdersQuery, useGetTotalSalesQuery } from "src/redux/order/orderApi";
import {
  useGetTotalReviewsByMonthQuery,
  useGetTotalReviewsQuery,
} from "src/redux/reviews/reviewsApi";
import { useGetTotalCustomersQuery, useGetTotalUsersByMonthQuery } from "src/redux/users/usersApi";
import { moneyConvert } from "src/utils/moneyFormat";
import { Link } from "react-router-dom";
import ChartLine from "src/ui/chartLine/ChartLine";
import { findMonthsData, monthsLabel } from "src/utils/chartDataGenerator";

const WidgetsDropdown = ({ monthSalesData, monthOrdersData }) => {
  const { data: totalSale } = useGetTotalSalesQuery();
  const { data: totalOrder } = useGetTotalOrdersQuery();
  const { data: totalUser } = useGetTotalCustomersQuery();
  const { data: totalReview } = useGetTotalReviewsQuery();
  const { data: totalUserByMonth } = useGetTotalUsersByMonthQuery();
  const { data: totalReviewByMonth } = useGetTotalReviewsByMonthQuery();
  const totalUserByMonthData = findMonthsData(monthsLabel, totalUserByMonth);
  const totalReviewByMonthData = findMonthsData(monthsLabel, totalReviewByMonth);

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          style={{ height: "150px" }}
          value={
            <>
              {moneyConvert(totalOrder?.totalOrders)}
              {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Total Orders"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu className="p-0 overflow-hidden">
                <Link to="/order" className="text-decoration-none d-block ">
                  <CDropdownItem style={{ cursor: "pointer" }}>See Details</CDropdownItem>
                </Link>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={<ChartLine data={monthOrdersData} title={"order"} color={"primary"} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          style={{ height: "150px" }}
          value={<>৳{moneyConvert(totalSale?.totalSales)} </>}
          title="Total Sales"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu className="p-0 overflow-hidden">
                <Link to="/order" className="text-decoration-none ">
                  <CDropdownItem style={{ cursor: "pointer" }}> See Details</CDropdownItem>
                </Link>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={<ChartLine data={monthSalesData} title={"Sales"} color={"info"} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          style={{ height: "150px" }}
          className="mb-4"
          color="warning"
          value={
            <>
              {moneyConvert(totalUser?.totalUsers)}
              {/* <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Total Customers"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <Link to="/customer" className="text-decoration-none ">
                <CDropdownMenu className="p-0 overflow-hidden">
                  <CDropdownItem style={{ cursor: "pointer" }}> See Details</CDropdownItem>
                </CDropdownMenu>
              </Link>
            </CDropdown>
          }
          chart={<ChartLine data={totalUserByMonthData} title={"Customers"} color={"warning"} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          style={{ height: "150px" }}
          className="mb-4"
          color="danger"
          value={
            <>
              {moneyConvert(totalReview?.totalReviews)}
              {/* <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Total Reviews"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu className="p-0 overflow-hidden">
                <Link to="/all-reviews" className="text-decoration-none ">
                  <CDropdownItem style={{ cursor: "pointer" }}> See Details</CDropdownItem>
                </Link>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={<ChartLine data={totalReviewByMonthData} title={"Reviews"} color={"danger"} />}
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
